import { solveGaussSeidel } from "../../solvers/systems";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernGaussSeidel = (input: NumericInput): MethodResult =>
	solveGaussSeidel(input);
