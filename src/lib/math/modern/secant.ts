import { solveSecant } from "../../solvers/roots";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernSecant = (input: NumericInput): MethodResult =>
	solveSecant(input, true);
