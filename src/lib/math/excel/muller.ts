import { solveMuller } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelMuller = (input: NumericInput): MethodResult =>
	solveMuller(input, false);
