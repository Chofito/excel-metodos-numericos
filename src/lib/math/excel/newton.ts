import { solveNewton } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelNewton = (input: NumericInput): MethodResult =>
	solveNewton(input, false);
