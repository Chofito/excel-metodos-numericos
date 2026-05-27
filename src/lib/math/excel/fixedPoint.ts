import type { MethodResult, NumericInput } from '../../types'
import { solveFixedPoint } from '../../solvers/roots'

export const solveExcelFixedPoint = (input: NumericInput): MethodResult => solveFixedPoint(input, false)

