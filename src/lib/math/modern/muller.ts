import { solveMuller } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernMuller = (input: NumericInput): MethodResult =>
	solveMuller(input, true);
