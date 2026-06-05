import { solveFixedPoint } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernFixedPoint = (input: NumericInput): MethodResult =>
	solveFixedPoint(input, true);
