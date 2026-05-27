import type { MethodResult, NumericInput } from '../../types'
import { solveFalsePosition } from '../../solvers/roots'

export const solveModernFalsePosition = (input: NumericInput): MethodResult => solveFalsePosition(input, true)

