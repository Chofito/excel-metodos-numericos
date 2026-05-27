import type { MethodResult, NumericInput } from '../../types'
import { solveLagrange } from '../../solvers/interpolation'

export const solveModernLagrange = (input: NumericInput): MethodResult => solveLagrange(input, true)

