import { solveSecant } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelSecant = (input: NumericInput): MethodResult =>
	solveSecant(input, false);
