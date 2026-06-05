import { solveSteffensen } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelSteffensen = (input: NumericInput): MethodResult =>
	solveSteffensen(input, false);
