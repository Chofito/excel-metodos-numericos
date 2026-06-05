import { solveBisection } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernBisection = (input: NumericInput): MethodResult =>
	solveBisection(input, true);
