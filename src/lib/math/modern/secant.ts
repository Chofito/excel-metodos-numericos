import type { MethodResult, NumericInput } from '../../types'
import { solveSecant } from '../../solvers/roots'

export const solveModernSecant = (input: NumericInput): MethodResult => solveSecant(input, true)

