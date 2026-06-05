import { solveFixedPoint } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelFixedPoint = (input: NumericInput): MethodResult =>
	solveFixedPoint(input, false);
