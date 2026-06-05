import {
	fixedPointFunction,
	isFiniteNumber,
	modernEval,
	scalarFunction,
} from "../shared/evaluate";
import type { IterationRow, MethodResult, NumericInput } from "../types";
import { failedResult, methodResult } from "./result";

export function solveBisection(
	input: NumericInput,
	modern = false,
): MethodResult {
	const f = scalarFunction(input, modern);
	let a = input.a;
	let b = input.b;
	const rows: IterationRow[] = [];
	const columns = ["a", "b", "p", "f(a)", "f(b)", "f(p)", "f(a)f(p)", "ba"];

	const fa0 = f(a);
	const fb0 = f(b);
	const excelHasSignChange = (fa0 < 0 && fb0 > 0) || (fa0 > 0 && fb0 < 0);
	const modernHasValidBracket = fa0 * fb0 <= 0;
	if (
		!isFiniteNumber(fa0) ||
		!isFiniteNumber(fb0) ||
		(modern ? !modernHasValidBracket : !excelHasSignChange)
	) {
		return failedResult(
			"No hay cambio de signo en el intervalo inicial.",
			columns,
		);
	}

	for (let i = 1; i <= input.maxIterations; i += 1) {
		const ba = (b - a) / 2;
		const p = a + ba;
		const fa = f(a);
		const fb = f(b);
		const fp = f(p);
		rows.push({
			iteration: i,
			values: {
				a,
				b,
				p,
				"f(a)": fa,
				"f(b)": fb,
				"f(p)": fp,
				"f(a)f(p)": fa * fp,
				ba,
			},
		});

		const excelStop = ba < input.tolerance || fp === 0;
		const modernStop =
			Math.abs(fp) <= input.tolerance || Math.abs(ba) <= input.tolerance;
		if (modern ? modernStop : excelStop) {
			return methodResult(
				"converged",
				`Raiz aproximada ${p}`,
				columns,
				rows,
				[],
				p,
			);
		}

		if (fa * fp > 0) a = p;
		else b = p;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}

export function solveFixedPoint(
	input: NumericInput,
	modern = false,
): MethodResult {
	const g = fixedPointFunction(input, modern);
	let p0 = input.x0;
	const rows: IterationRow[] = [];
	const columns = ["Po", "P1", "Error"];

	for (let i = 1; i <= input.maxIterations; i += 1) {
		const p1 = g(p0);
		const error = Math.abs(p1 - p0);
		rows.push({ iteration: i, values: { Po: p0, P1: p1, Error: error } });

		if (!isFiniteNumber(p1))
			return methodResult(
				"failed",
				"La funcion produjo un valor no numerico.",
				columns,
				rows,
				[],
			);

		const excelStop = error < input.tolerance;
		const modernStop =
			error <= input.tolerance ||
			Math.abs(modernEval(input.formula, { x: p1 })) <= input.tolerance;
		if (modern ? modernStop : excelStop) {
			return methodResult(
				"converged",
				`Punto fijo aproximado ${p1}`,
				columns,
				rows,
				[],
				p1,
			);
		}

		p0 = p1;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}

export function solveSecant(input: NumericInput, modern = false): MethodResult {
	const f = scalarFunction(input, modern);
	let previous = input.x0;
	let current = input.x1;
	const rows: IterationRow[] = [];
	const columns = ["xAnterior", "xActual", "xSiguiente", "Error"];

	for (let i = 1; i <= input.maxIterations; i += 1) {
		const denominator = f(current) - f(previous);
		if (modern && Math.abs(denominator) < Number.EPSILON) {
			return methodResult(
				"failed",
				"Division por cero en la secante.",
				columns,
				rows,
				[],
			);
		}

		const next = current - (f(current) * (current - previous)) / denominator;
		const error = Math.abs(next - current);
		rows.push({
			iteration: i,
			values: {
				xAnterior: previous,
				xActual: current,
				xSiguiente: next,
				Error: error,
			},
		});

		const excelStop = error <= input.tolerance;
		const modernStop =
			error <= input.tolerance || Math.abs(f(next)) <= input.tolerance;
		if (modern ? modernStop : excelStop) {
			return methodResult(
				"converged",
				`Raiz aproximada ${next}`,
				columns,
				rows,
				[],
				next,
			);
		}

		previous = current;
		current = next;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}

export function solveFalsePosition(
	input: NumericInput,
	modern = false,
): MethodResult {
	const f = scalarFunction(input, modern);
	const columns = ["xAnterior", "xActual", "xSiguiente", "Error"];
	const rows: IterationRow[] = [];

	if (!modern) {
		const current = input.x1;
		let previous = input.x0;
		const first =
			current -
			(f(current) * (current - previous)) / (f(current) - f(previous));
		rows.push({
			iteration: 1,
			values: {
				xAnterior: previous,
				xActual: current,
				xSiguiente: first,
				Error: Math.abs(current - first),
			},
		});
		previous = first;

		for (let n = 1; n <= input.maxIterations; n += 1) {
			const next =
				current -
				(f(current) * (current - previous)) / (f(current) - f(previous));
			const error = Math.abs(previous - next);
			rows.push({
				iteration: n + 1,
				values: {
					xAnterior: previous,
					xActual: current,
					xSiguiente: next,
					Error: error,
				},
			});

			if (error <= input.tolerance) {
				return methodResult(
					"converged",
					`Raiz aproximada ${next}`,
					columns,
					rows,
					["Excel usa una variante secante, no regula falsi clasica."],
					next,
				);
			}
			previous = next;
		}

		return methodResult(
			"failed",
			`No converge en ${input.maxIterations} iteraciones.`,
			columns,
			rows,
			["Excel usa una variante secante, no regula falsi clasica."],
		);
	}

	let a = input.x0;
	let b = input.x1;
	if (f(a) * f(b) > 0)
		return failedResult(
			"No hay cambio de signo para aplicar posicion falsa.",
			columns,
		);

	for (let i = 1; i <= input.maxIterations; i += 1) {
		const next = b - (f(b) * (b - a)) / (f(b) - f(a));
		const error = Math.abs(f(next));
		rows.push({
			iteration: i,
			values: { xAnterior: a, xActual: b, xSiguiente: next, Error: error },
		});

		if (error <= input.tolerance)
			return methodResult(
				"converged",
				`Raiz aproximada ${next}`,
				columns,
				rows,
				[],
				next,
			);
		if (f(a) * f(next) < 0) b = next;
		else a = next;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}

export function solveSteffensen(
	input: NumericInput,
	modern = false,
): MethodResult {
	const g = fixedPointFunction(input, modern);
	let p0 = input.x0;
	const rows: IterationRow[] = [];
	const columns = ["Po", "P1", "P2", "p", "Error"];

	for (let i = 1; i <= input.maxIterations; i += 1) {
		const p1 = g(p0);
		const p2 = g(p1);
		const denominator = p2 - 2 * p1 + p0;
		if (modern && Math.abs(denominator) < Number.EPSILON) {
			return methodResult(
				"failed",
				"Division por cero en aceleracion de Steffensen.",
				columns,
				rows,
				[],
			);
		}

		const p = p0 - (p1 - p0) ** 2 / denominator;
		const error = Math.abs(p - p0);
		rows.push({
			iteration: i,
			values: { Po: p0, P1: p1, P2: p2, p, Error: error },
		});

		if (
			(modern && error <= input.tolerance) ||
			(!modern && error < input.tolerance)
		) {
			return methodResult(
				"converged",
				`Raiz aproximada ${p}`,
				columns,
				rows,
				[],
				p,
			);
		}
		p0 = p;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}

const derivativeExcel = (f: (x: number) => number, x: number) =>
	(1 / (12 * 0.1)) *
	(-25 * f(x) +
		48 * f(x + 0.1) -
		36 * f(x + 0.2) +
		16 * f(x + 0.3) -
		3 * f(x + 0.4));

const derivativeModern = (f: (x: number) => number, x: number) => {
	const h = Math.sqrt(Number.EPSILON) * Math.max(1, Math.abs(x));
	return (f(x + h) - f(x - h)) / (2 * h);
};

export function solveNewton(input: NumericInput, modern = false): MethodResult {
	const f = scalarFunction(input, modern);
	let p0 = input.x0;
	const rows: IterationRow[] = [];
	const columns = ["Po", "P1", "Error"];
	const notes = [
		modern
			? "Derivada central adaptativa."
			: "Derivada progresiva VBA con h=0.1.",
	];

	for (let i = 1; i <= input.maxIterations; i += 1) {
		const derivative = modern
			? derivativeModern(f, p0)
			: derivativeExcel(f, p0);
		if (modern && Math.abs(derivative) < Number.EPSILON)
			return methodResult(
				"failed",
				"Derivada numericamente cero.",
				columns,
				rows,
				notes,
			);

		const p1 = p0 - f(p0) / derivative;
		const error = Math.abs(p1 - p0);
		rows.push({ iteration: i, values: { Po: p0, P1: p1, Error: error } });

		const excelStop = error < input.tolerance;
		const modernStop =
			error <= input.tolerance || Math.abs(f(p1)) <= input.tolerance;
		if (modern ? modernStop : excelStop) {
			return methodResult(
				"converged",
				`Raiz aproximada ${p1}`,
				columns,
				rows,
				notes,
				p1,
			);
		}
		p0 = p1;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		notes,
	);
}

export function solveMuller(input: NumericInput, modern = false): MethodResult {
	const f = scalarFunction(input, modern);
	let x0 = input.x0;
	let x1 = input.x1;
	let x2 = input.x2;
	const rows: IterationRow[] = [];
	const columns = [
		"x0",
		"x1",
		"x2",
		"p",
		"f(x0)",
		"f(x1)",
		"f(x2)",
		"f(p)",
		"Abs(h)",
	];

	for (let i = 1; i <= input.maxIterations; i += 1) {
		const h1 = x1 - x0;
		const h2 = x2 - x1;
		const g1 = (f(x1) - f(x0)) / h1;
		const g2 = (f(x2) - f(x1)) / h2;
		const d = (g2 - g1) / (h1 + h2);
		const b = g2 + h2 * d;
		const discriminant = b ** 2 - 4 * f(x2) * d;
		const radical = discriminant >= 0 ? Math.sqrt(discriminant) : Number.NaN;
		const denominator =
			Math.abs(b - radical) < Math.abs(b + radical) ? b + radical : b - radical;
		const h = (-2 * f(x2)) / denominator;
		const p = x2 + h;

		rows.push({
			iteration: i,
			values: {
				x0,
				x1,
				x2,
				p,
				"f(x0)": f(x0),
				"f(x1)": f(x1),
				"f(x2)": f(x2),
				"f(p)": f(p),
				"Abs(h)": Math.abs(h),
			},
		});

		if (!isFiniteNumber(p))
			return methodResult(
				"failed",
				"Muller produjo valor no real.",
				columns,
				rows,
				[],
			);
		if (Math.abs(h) <= input.tolerance)
			return methodResult(
				"converged",
				`Raiz aproximada ${p}`,
				columns,
				rows,
				[],
				p,
			);

		x0 = x1;
		x1 = x2;
		x2 = p;
	}

	return methodResult(
		"failed",
		`No converge en ${input.maxIterations} iteraciones.`,
		columns,
		rows,
		[],
	);
}
