import { solveLagrange } from "../../solvers/interpolation";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelLagrange = (input: NumericInput): MethodResult =>
	solveLagrange(input, false);
