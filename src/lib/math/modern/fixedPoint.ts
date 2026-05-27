import type { MethodResult, NumericInput } from '../../types'
import { solveFixedPoint } from '../../solvers/roots'

export const solveModernFixedPoint = (input: NumericInput): MethodResult => solveFixedPoint(input, true)

