import { solveNewton } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernNewton = (input: NumericInput): MethodResult =>
	solveNewton(input, true);
