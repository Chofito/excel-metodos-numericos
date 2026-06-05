import { evaluate } from "mathjs";
import type { NumericInput } from "../types";

export const isFiniteNumber = (value: number) => Number.isFinite(value);

const cleanExcelSigns = (value: string) =>
	value
		.replaceAll(" ", "")
		.replaceAll("--", "+")
		.replaceAll("+-", "-")
		.replaceAll("-+", "-");

const toNumber = (value: unknown) => {
	if (typeof value === "number") return value;
	if (typeof value === "boolean") return value ? 1 : 0;
	if (value && typeof value === "object" && "re" in value && "im" in value) {
		const complex = value as { re: number; im: number };
		return Math.abs(complex.im) < 1e-12 ? complex.re : Number.NaN;
	}
	const numeric = Number(value);
	return Number.isFinite(numeric) ? numeric : Number.NaN;
};

export const excelEval = (
	expression: string,
	replacements: Record<string, number>,
) => {
	let formula = expression;
	for (const [name, value] of Object.entries(replacements)) {
		formula = formula.replaceAll(name, String(value));
	}
	return toNumber(evaluate(cleanExcelSigns(formula)));
};

export const modernEval = (expression: string, scope: Record<string, number>) =>
	toNumber(
		evaluate(expression, { pi: Math.PI, Pi: Math.PI, e: Math.E, ...scope }),
	);

export const scalarFunction =
	(input: NumericInput, modern: boolean) => (x: number) =>
		modern ? modernEval(input.formula, { x }) : excelEval(input.formula, { x });

export const fixedPointFunction =
	(input: NumericInput, modern: boolean) => (x: number) =>
		modern
			? modernEval(input.transformFormula, { x })
			: excelEval(input.transformFormula, { x });
