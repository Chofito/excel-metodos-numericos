import { solveDividedDifferences } from "../../solvers/interpolation";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernDividedDifferences = (
	input: NumericInput,
): MethodResult => solveDividedDifferences(input, true);
