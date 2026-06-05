import { solveFalsePosition } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernFalsePosition = (input: NumericInput): MethodResult =>
	solveFalsePosition(input, true);
