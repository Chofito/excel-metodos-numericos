import { solveSteffensen } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernSteffensen = (input: NumericInput): MethodResult =>
	solveSteffensen(input, true);
