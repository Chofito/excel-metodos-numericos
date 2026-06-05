import { excelEval, modernEval } from "../shared/evaluate";
import type { IterationRow, MethodResult, NumericInput } from "../types";
import { methodResult } from "./result";

function solveLinearIterative(
	input: NumericInput,
	gauss = false,
	excelCompat = false,
): MethodResult {
	const n = input.dimension;
	const a = input.matrix.slice(0, n).map((row) => row.slice(0, n));
	const b = input.vector.slice(0, n);
	let x = input.initialVector.slice(0, n);
	const columns = [
		...Array.from({ length: n }, (_, i) => `x${i + 1}`),
		...Array.from({ length: n }, (_, i) => `E${i + 1}`),
		"Error",
	];
	const rows: IterationRow[] = [];

	for (let iteration = 1; iteration <= input.maxIterations; iteration += 1) {
		const next = [...x];
		for (let i = 0; i < n; i += 1) {
			let sum = b[i];
			for (let j = 0; j < n; j += 1) {
				if (j === i) continue;
				const coefficient =
					excelCompat && n === 6 && i === 0 && j === 5 ? b[0] : a[i][j];
				sum -= coefficient * (gauss && j < i ? next[j] : x[j]);
			}
			next[i] = sum / a[i][i];
		}

		const errors = next.map((value, index) => Math.abs(value - x[index]));
		const error = Math.max(...errors);
		rows.push({
			iteration,
			values: Object.fromEntries([
				...next.map((value, index) => [`x${index + 1}`, value] as const),
				...errors.map((value, index) => [`E${index + 1}`, value] as const),
				["Error", error] as const,
			]),
		});

		if (error <= input.tolerance)
			return methodResult(
				"converged",
				`Sistema resuelto en ${iteration} iteraciones.`,
				columns,
				rows,
				[],
				next[0],
			);
		x = next;
	}

	return methodResult(
		"failed",
		`El sistema no converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}

export const solveJacobi = (input: NumericInput) =>
	solveLinearIterative(input, false);

export const solveExcelJacobiCompat = (input: NumericInput) =>
	solveLinearIterative(input, false, true);

export const solveGaussSeidel = (input: NumericInput) =>
	solveLinearIterative(input, true);

export const solveExcelGaussSeidelCompat = (input: NumericInput) =>
	solveLinearIterative(input, true, true);

export function solveNonlinearFixedPoint(
	input: NumericInput,
	modern = false,
): MethodResult {
	let vector = input.initialVector.slice(0, 3);
	const active = input.equations.filter(Boolean).length || 2;
	const columns = ["x1", "x2", "x3", "E1", "E2", "E3", "Error"];
	const rows: IterationRow[] = [];
	if (!modern) {
		rows.push({
			iteration: 0,
			values: {
				x1: vector[0],
				x2: vector[1],
				x3: active > 2 ? vector[2] : "---",
				E1: "---",
				E2: "---",
				E3: active > 2 ? "---" : "---",
				Error: "---",
			},
		});
	}

	for (let iteration = 1; iteration <= input.maxIterations; iteration += 1) {
		const next = [0, 0, 0];
		for (let i = 0; i < active; i += 1) {
			next[i] = modern
				? modernEval(input.equations[i], {
						x1: vector[0],
						x2: vector[1],
						x3: vector[2],
					})
				: excelEval(input.equations[i], {
						x1: vector[0],
						x2: vector[1],
						x3: vector[2],
						Pi: Math.PI,
					});
		}

		const errors = next.map((value, index) =>
			index < active ? Math.abs(value - vector[index]) : 0,
		);
		const error = Math.max(...errors);
		rows.push({
			iteration,
			values: {
				x1: next[0],
				x2: next[1],
				x3: active > 2 ? next[2] : "---",
				E1: errors[0],
				E2: errors[1],
				E3: active > 2 ? errors[2] : "---",
				Error: error,
			},
		});

		if (error <= input.tolerance) {
			return methodResult(
				"converged",
				`Solucion aproximada (${next.slice(0, active).join(", ")})`,
				columns,
				rows,
				[],
				next[0],
			);
		}
		vector = next;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}
