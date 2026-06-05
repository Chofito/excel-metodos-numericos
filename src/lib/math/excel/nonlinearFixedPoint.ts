import { solveNonlinearFixedPoint } from "../../solvers/systems";
import type { MethodResult, NumericInput } from "../../types";

export const solveExcelNonlinearFixedPoint = (
	input: NumericInput,
): MethodResult => solveNonlinearFixedPoint(input, false);
