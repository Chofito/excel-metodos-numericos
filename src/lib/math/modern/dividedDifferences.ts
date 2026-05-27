import type { MethodResult, NumericInput } from '../../types'
import { solveDividedDifferences } from '../../solvers/interpolation'

export const solveModernDividedDifferences = (input: NumericInput): MethodResult => solveDividedDifferences(input, true)

