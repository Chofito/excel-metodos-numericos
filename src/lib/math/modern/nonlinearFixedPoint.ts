import { solveNonlinearFixedPoint } from "../../solvers/systems";
import type { MethodResult, NumericInput } from "../../types";

export const solveModernNonlinearFixedPoint = (
	input: NumericInput,
): MethodResult => solveNonlinearFixedPoint(input, true);
