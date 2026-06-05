import { solveJacobi } from "../../solvers/systems";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernJacobi = (input: NumericInput): MethodResult =>
	solveJacobi(input);
