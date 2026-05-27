import type { MethodResult, NumericInput } from '../../types'
import { solveSteffensen } from '../../solvers/roots'

export const solveModernSteffensen = (input: NumericInput): MethodResult => solveSteffensen(input, true)

