import { solveLagrange } from "../../solvers/interpolation";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernLagrange = (input: NumericInput): MethodResult =>
	solveLagrange(input, true);
