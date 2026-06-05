import { solveExcelGaussSeidelCompat } from "../../solvers/systems";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelGaussSeidel = (input: NumericInput): MethodResult =>
	solveExcelGaussSeidelCompat(input);
