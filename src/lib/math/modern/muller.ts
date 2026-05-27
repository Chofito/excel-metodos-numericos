import type { MethodResult, NumericInput } from '../../types'
import { solveMuller } from '../../solvers/roots'

export const solveModernMuller = (input: NumericInput): MethodResult => solveMuller(input, true)

