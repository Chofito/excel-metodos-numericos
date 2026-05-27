import type { MethodResult, NumericInput } from '../../types'
import { solveBisection } from '../../solvers/roots'

export const solveModernBisection = (input: NumericInput): MethodResult => solveBisection(input, true)

