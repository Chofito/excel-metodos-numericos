import { solveBisection } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelBisection = (input: NumericInput): MethodResult =>
	solveBisection(input, false);
