import type { MethodResult, NumericInput } from '../../types'
import { solveNonlinearFixedPoint } from '../../solvers/systems'

export const solveExcelNonlinearFixedPoint = (input: NumericInput): MethodResult => solveNonlinearFixedPoint(input, false)

