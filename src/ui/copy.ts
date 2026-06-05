import type { MethodKind } from "../lib/methods";
import type { Mode, Status } from "../lib/numerics";

export const modeCopy: Record<Mode, { label: string; description: string }> = {
	excel: {
		label: "Excel 1:1",
		description:
			"Replica orden, tolerancias y peculiaridades del VBA extraido.",
	},
	modern: {
		label: "Moderno",
		description:
			"Usa evaluacion por variables y criterios numericos mas robustos.",
	},
	compare: {
		label: "Comparacion",
		description: "Contrasta iteracion por iteracion ambos motores.",
	},
};

export const kindLabel: Record<MethodKind, string> = {
	root: "Raices",
	fixed: "Punto fijo",
	interpolation: "Interpolacion",
	system: "Sistemas",
	nonlinear: "No lineal",
};

export const statusLabel: Record<Status, string> = {
	converged: "Convergio",
	failed: "Fallo",
	running: "Calculando",
};

export const statusClass: Record<Status, string> = {
	converged: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
	failed: "border-rose-400/25 bg-rose-400/10 text-rose-200",
	running: "border-slate-400/25 bg-slate-400/10 text-slate-200",
};

export const formatNumber = (value: number | string | undefined) => {
	if (value === undefined) return "";
	if (typeof value === "string") return value;
	if (!Number.isFinite(value)) return "NaN";
	if (
		Math.abs(value) >= 100000 ||
		(Math.abs(value) > 0 && Math.abs(value) < 0.0001)
	) {
		return value.toExponential(6);
	}
	return value.toLocaleString("en-US", { maximumFractionDigits: 10 });
};
