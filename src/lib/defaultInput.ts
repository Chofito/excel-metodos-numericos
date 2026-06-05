import type { NumericInput } from "./types";

export const defaultInput: NumericInput = {
	formula: "x^3 - x - 2",
	transformFormula: "cos(x)",
	equations: ["cos(x2)", "sin(x1)", ""],
	a: 1,
	b: 2,
	x0: 1,
	x1: 2,
	x2: 3,
	tolerance: 0.0001,
	maxIterations: 20,
	targetX: 2.5,
	pointCount: 5,
	points: [
		{ x: 1, y: 1 },
		{ x: 2, y: 4 },
		{ x: 3, y: 9 },
		{ x: 4, y: 16 },
		{ x: 5, y: 25 },
	],
	dimension: 3,
	matrix: [
		[10, -1, 2, 0, 0, 0],
		[-1, 11, -1, 3, 0, 0],
		[2, -1, 10, -1, 0, 0],
		[0, 3, -1, 8, 0, 0],
		[0, 0, 0, 0, 9, 1],
		[0, 0, 0, 0, 1, 7],
	],
	vector: [6, 25, -11, 15, 10, 8],
	initialVector: [0, 0, 0, 0, 0, 0],
};
