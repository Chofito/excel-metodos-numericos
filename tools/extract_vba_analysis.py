#!/usr/bin/env python3
"""Extract VBA and workbook macro wiring from the numerical methods XLSM."""

from __future__ import annotations

import argparse
import json
import posixpath
import re
import subprocess
import sys
import zipfile
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

try:
    from oletools.olevba import VBA_Parser
except ImportError as exc:  # pragma: no cover - user-facing setup error
    raise SystemExit(
        "oletools is required. Install it in an isolated environment with:\n"
        "  python -m pip install oletools"
    ) from exc


NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pkgrel": "http://schemas.openxmlformats.org/package/2006/relationships",
    "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
    "x": "urn:schemas-microsoft-com:office:excel",
}

EXPECTED_MODULES = {
    "biseccion_AR",
    "puntofijo_AR",
    "secante_AR",
    "posicionfalsa_AR",
    "steffenssen_AR",
    "newton_AR",
    "muller_AR",
    "lagrange_AR",
    "diferencias_AR",
    "Hoja9",
    "Hoja14",
    "Hoja15",
    "Hoja16",
}


def package_path(base: str, target: str) -> str:
    if target.startswith("/"):
        return posixpath.normpath(target.lstrip("/"))
    return posixpath.normpath(posixpath.join(posixpath.dirname(base), target))


def safe_name(name: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9_.-]+", "_", name).strip("._")
    return cleaned or "module"


def normalize_macro(macro: str) -> dict[str, str]:
    raw = macro.strip()
    cleaned = re.sub(r"^\[[^\]]+\]!", "", raw)
    cleaned = cleaned.strip("'")
    if "!" in cleaned:
        cleaned = cleaned.split("!", 1)[1]
    module = ""
    procedure = cleaned
    if "." in cleaned:
        module, procedure = cleaned.rsplit(".", 1)
    return {
        "raw": raw,
        "qualified": cleaned,
        "module": module,
        "procedure": procedure,
    }


def read_xml(zf: zipfile.ZipFile, name: str) -> ET.Element:
    return ET.fromstring(zf.read(name))


def text_from_shared_strings(zf: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []
    root = read_xml(zf, "xl/sharedStrings.xml")
    values = []
    for item in root.findall("main:si", NS):
        parts = [node.text or "" for node in item.findall(".//main:t", NS)]
        values.append("".join(parts))
    return values


def cell_value(cell: ET.Element, shared_strings: list[str]) -> str | int | float | None:
    value = cell.find("main:v", NS)
    if value is None or value.text is None:
        inline = cell.find("main:is/main:t", NS)
        return inline.text if inline is not None else None
    if cell.attrib.get("t") == "s":
        index = int(value.text)
        return shared_strings[index] if 0 <= index < len(shared_strings) else value.text
    try:
        number = float(value.text)
        return int(number) if number.is_integer() else number
    except ValueError:
        return value.text


def extract_vml_macros(zf: zipfile.ZipFile, vml_path: str) -> list[dict[str, str]]:
    macros = []
    if vml_path not in zf.namelist():
        return macros
    root = read_xml(zf, vml_path)
    for client_data in root.findall(".//x:ClientData", NS):
        object_type = client_data.attrib.get("ObjectType", "")
        formula = client_data.find("x:FmlaMacro", NS)
        if formula is None or not formula.text:
            continue
        item = normalize_macro(formula.text)
        item["objectType"] = object_type
        item["source"] = vml_path
        macros.append(item)
    return macros


def extract_drawing_macros(zf: zipfile.ZipFile, drawing_path: str) -> list[dict[str, str]]:
    macros = []
    if drawing_path not in zf.namelist():
        return macros
    root = read_xml(zf, drawing_path)
    for element in root.iter():
        macro = element.attrib.get("macro")
        if not macro:
            continue
        item = normalize_macro(macro)
        name = ""
        c_nv_pr = element.find(".//xdr:cNvPr", NS)
        if c_nv_pr is not None:
            name = c_nv_pr.attrib.get("name", "")
        item["objectType"] = element.tag.rsplit("}", 1)[-1]
        item["objectName"] = name
        item["source"] = drawing_path
        macros.append(item)
    return macros


def workbook_manifest(xlsm_path: Path) -> dict:
    with zipfile.ZipFile(xlsm_path) as zf:
        shared_strings = text_from_shared_strings(zf)
        workbook = read_xml(zf, "xl/workbook.xml")
        workbook_rels = read_xml(zf, "xl/_rels/workbook.xml.rels")
        rid_to_target = {
            rel.attrib["Id"]: rel.attrib["Target"]
            for rel in workbook_rels.findall("pkgrel:Relationship", NS)
        }

        sheets = []
        for sheet in workbook.findall("main:sheets/main:sheet", NS):
            rid = sheet.attrib[f"{{{NS['rel']}}}id"]
            target = rid_to_target[rid]
            sheet_path = package_path("xl/workbook.xml", target)
            sheet_root = read_xml(zf, sheet_path)
            rels_path = f"{Path(sheet_path).parent}/_rels/{Path(sheet_path).name}.rels"

            dimension = sheet_root.find("main:dimension", NS)
            formulas = sheet_root.findall(".//main:f", NS)
            cells = sheet_root.findall(".//main:c", NS)
            used_values = []
            for cell in cells[:60]:
                value = cell_value(cell, shared_strings)
                if value not in (None, ""):
                    used_values.append({"cell": cell.attrib.get("r", ""), "value": value})

            sheet_macros = []
            if rels_path in zf.namelist():
                rels = read_xml(zf, rels_path)
                for rel in rels.findall("pkgrel:Relationship", NS):
                    rel_type = rel.attrib.get("Type", "")
                    rel_target = package_path(sheet_path, rel.attrib["Target"])
                    if rel_type.endswith("/vmlDrawing"):
                        sheet_macros.extend(extract_vml_macros(zf, rel_target))
                    if rel_type.endswith("/drawing"):
                        sheet_macros.extend(extract_drawing_macros(zf, rel_target))

            sheet_info = {
                "name": sheet.attrib["name"],
                "state": sheet.attrib.get("state", "visible"),
                "sheetId": sheet.attrib.get("sheetId"),
                "path": sheet_path,
                "dimension": dimension.attrib.get("ref") if dimension is not None else "",
                "cellCount": len(cells),
                "formulaCount": len(formulas),
                "sampleValues": used_values,
                "macros": sheet_macros,
            }
            sheets.append(sheet_info)

        manifest = {
            "source": str(xlsm_path),
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "sheetCount": len(sheets),
            "sheets": sheets,
        }
        return manifest


def build_macro_map(manifest: dict, modules: list[dict]) -> dict:
    proc_to_modules = defaultdict(list)
    for module in modules:
        for proc in module["procedures"]:
            proc_to_modules[proc["name"]].append(module["module"])

    grouped = {}
    for sheet in manifest["sheets"]:
        for macro in sheet["macros"]:
            procedure = macro["procedure"]
            entry = grouped.setdefault(
                procedure,
                {
                    "procedure": procedure,
                    "declaredModule": macro.get("module", ""),
                    "implementationModules": sorted(proc_to_modules.get(procedure, [])),
                    "sheets": set(),
                    "references": [],
                },
            )
            entry["sheets"].add(sheet["name"])
            entry["references"].append(
                {
                    "sheet": sheet["name"],
                    "raw": macro["raw"],
                    "qualified": macro["qualified"],
                    "declaredModule": macro.get("module", ""),
                    "objectType": macro.get("objectType", ""),
                    "objectName": macro.get("objectName", ""),
                    "source": macro.get("source", ""),
                }
            )

    macros = []
    for entry in grouped.values():
        entry["sheets"] = sorted(entry["sheets"])
        entry["references"] = sorted(
            entry["references"],
            key=lambda item: (item["sheet"], item["source"], item["raw"]),
        )
        macros.append(entry)

    return {
        "source": manifest["source"],
        "generatedAt": manifest["generatedAt"],
        "macros": sorted(macros, key=lambda item: item["procedure"].lower()),
    }


def extract_vba(xlsm_path: Path, modules_dir: Path) -> tuple[list[dict], list[str]]:
    modules_dir.mkdir(parents=True, exist_ok=True)
    parser = VBA_Parser(str(xlsm_path))
    if not parser.detect_vba_macros():
        parser.close()
        return [], ["olevba did not detect VBA macros."]

    modules = []
    warnings = []
    seen_files: set[str] = set()
    try:
        for _, stream_path, vba_filename, code in parser.extract_macros():
            if isinstance(code, bytes):
                text = code.decode("latin-1", errors="replace")
            else:
                text = code
            module_name = Path(vba_filename or stream_path.rsplit("/", 1)[-1]).stem
            suffix = Path(vba_filename or "").suffix
            if not suffix:
                suffix = ".cls" if module_name.startswith("Hoja") or module_name in {"ThisWorkbook"} else ".bas"
            out_name = safe_name(module_name) + suffix
            counter = 2
            while out_name in seen_files:
                out_name = f"{safe_name(module_name)}_{counter}{suffix}"
                counter += 1
            seen_files.add(out_name)
            out_path = modules_dir / out_name
            out_path.write_text(text, encoding="utf-8", newline="\n")

            procedures = []
            for match in re.finditer(
                r"(?im)^\s*(?:Public\s+|Private\s+|Friend\s+)?(Sub|Function)\s+([A-Za-z_][A-Za-z0-9_]*)\b",
                text,
            ):
                procedures.append({"kind": match.group(1), "name": match.group(2)})

            modules.append(
                {
                    "module": module_name,
                    "filename": out_name,
                    "streamPath": stream_path,
                    "sourceChars": len(text),
                    "procedures": procedures,
                    "hasAttributeName": "Attribute VB_Name" in text,
                    "hasSubOrFunction": bool(procedures),
                    "hasEndStatement": bool(re.search(r"(?im)^\s*End\s+(Sub|Function)\b", text)),
                }
            )
    finally:
        parser.close()

    return sorted(modules, key=lambda item: item["module"].lower()), warnings


def write_index(modules: list[dict], path: Path) -> None:
    lines = ["# VBA Module Index", ""]
    for module in modules:
        lines.append(f"## {module['module']}")
        lines.append(f"- File: `analysis/vba-modules/{module['filename']}`")
        lines.append(f"- Stream: `{module['streamPath']}`")
        if module["procedures"]:
            lines.append("- Procedures:")
            for proc in module["procedures"]:
                lines.append(f"  - `{proc['kind']} {proc['name']}`")
        else:
            lines.append("- Procedures: none detected")
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def write_report(
    report_path: Path,
    xlsm_path: Path,
    modules: list[dict],
    manifest: dict,
    macro_map: dict,
    warnings: list[str],
) -> None:
    module_names = {module["module"] for module in modules}
    missing_modules = sorted(EXPECTED_MODULES - module_names)
    procedures = {
        proc["name"]
        for module in modules
        for proc in module["procedures"]
    }
    referenced = {item["procedure"] for item in macro_map["macros"]}
    missing_references = sorted(referenced - procedures)
    suspicious_modules = [
        module["module"]
        for module in modules
        if not module["hasSubOrFunction"] and module["sourceChars"] > 0
    ]

    lines = [
        "# VBA Extraction Report",
        "",
        f"- Source workbook: `{xlsm_path.name}`",
        f"- Generated at: `{datetime.now(timezone.utc).isoformat()}`",
        f"- Sheets found: `{manifest['sheetCount']}`",
        f"- VBA modules extracted: `{len(modules)}`",
        f"- Button/control macro procedures referenced: `{len(referenced)}`",
        "",
        "## Validation",
        f"- Expected modules missing: `{', '.join(missing_modules) if missing_modules else 'none'}`",
        f"- Referenced macros missing from extracted procedures: `{', '.join(missing_references) if missing_references else 'none'}`",
        f"- Modules without detected Sub/Function: `{', '.join(suspicious_modules) if suspicious_modules else 'none'}`",
        "",
        "## Notes",
        "- `oletools/olevba` was used as the primary VBA extractor.",
        "- Workbook XML/VML inspection was used to map sheets, controls, buttons, and macro assignments.",
        "- Sheet XML inspection found formula counts independently from VBA extraction.",
    ]
    if warnings:
        lines.extend(["", "## Warnings"])
        lines.extend(f"- {warning}" for warning in warnings)
    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_olevba_raw_outputs(xlsm_path: Path, output_dir: Path) -> list[str]:
    warnings = []
    olevba_bin = Path(sys.executable).with_name("olevba")
    if not olevba_bin.exists():
        warnings.append(f"olevba executable was not found next to {sys.executable}; raw CLI outputs skipped.")
        return warnings

    commands = [
        (["--code", "--attr"], output_dir / "olevba-code.txt"),
        (["--json"], output_dir / "olevba-analysis.json"),
    ]
    for args, destination in commands:
        result = subprocess.run(
            [str(olevba_bin), *args, str(xlsm_path)],
            check=False,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )
        destination.write_text(result.stdout, encoding="utf-8")
        if result.returncode != 0:
            warnings.append(
                f"olevba {' '.join(args)} exited with status {result.returncode}; see {destination.name}."
            )
    return warnings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--input",
        default="PLANTILLA DE METODOS NUMERICOS_office 2007.xlsm",
        help="Path to the source XLSM workbook.",
    )
    parser.add_argument(
        "--output",
        default="analysis",
        help="Directory where extracted analysis artifacts will be written.",
    )
    args = parser.parse_args()

    xlsm_path = Path(args.input).resolve()
    output_dir = Path(args.output).resolve()
    modules_dir = output_dir / "vba-modules"

    if not xlsm_path.exists():
        raise SystemExit(f"Input workbook does not exist: {xlsm_path}")

    output_dir.mkdir(parents=True, exist_ok=True)
    modules, warnings = extract_vba(xlsm_path, modules_dir)
    manifest = workbook_manifest(xlsm_path)
    macro_map = build_macro_map(manifest, modules)
    warnings.extend(write_olevba_raw_outputs(xlsm_path, output_dir))

    (output_dir / "vba-modules.json").write_text(
        json.dumps({"source": str(xlsm_path), "modules": modules}, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    (output_dir / "workbook-manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    (output_dir / "macro-map.json").write_text(
        json.dumps(macro_map, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    write_index(modules, output_dir / "vba-index.md")
    write_report(output_dir / "extraction-report.md", xlsm_path, modules, manifest, macro_map, warnings)

    print(f"Extracted {len(modules)} VBA modules into {modules_dir}")
    print(f"Workbook sheets mapped: {manifest['sheetCount']}")
    print(f"Macro procedures referenced by buttons/controls: {len(macro_map['macros'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
