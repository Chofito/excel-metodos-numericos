import { solveFalsePosition } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelFalsePosition = (input: NumericInput): MethodResult =>
	solveFalsePosition(input, false);
