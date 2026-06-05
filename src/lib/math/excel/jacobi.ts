import { solveExcelJacobiCompat } from "../../solvers/systems";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelJacobi = (input: NumericInput): MethodResult =>
	solveExcelJacobiCompat(input);
