import type { MethodResult, NumericInput } from '../../types'
import { solveFalsePosition } from '../../solvers/roots'

export const solveExcelFalsePosition = (input: NumericInput): MethodResult => solveFalsePosition(input, false)

