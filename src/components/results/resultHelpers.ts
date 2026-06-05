import type { IterationRow } from "../../lib/numerics";

export function numberFromRow(row?: IterationRow) {
	if (!row) return undefined;
	for (const key of [
		"p",
		"P1",
		"xSiguiente",
		"x1",
		"termino",
		"Error",
		"Abs(h)",
		"ba",
	]) {
		const value = row.values[key];
		if (typeof value === "number") return value;
	}
	return undefined;
}
