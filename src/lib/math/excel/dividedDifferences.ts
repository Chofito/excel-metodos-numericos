import type { MethodResult, NumericInput } from '../../types'
import { solveDividedDifferences } from '../../solvers/interpolation'

export const solveExcelDividedDifferences = (input: NumericInput): MethodResult => solveDividedDifferences(input, false)

