import type { MethodResult, NumericInput } from '../../types'
import { solveNonlinearFixedPoint } from '../../solvers/systems'

export const solveModernNonlinearFixedPoint = (input: NumericInput): MethodResult => solveNonlinearFixedPoint(input, true)

