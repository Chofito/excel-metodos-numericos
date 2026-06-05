import { solveDividedDifferences } from "../../solvers/interpolation";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelDividedDifferences = (
	input: NumericInput,
): MethodResult => solveDividedDifferences(input, false);
