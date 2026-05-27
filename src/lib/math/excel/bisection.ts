import type { MethodResult, NumericInput } from '../../types'
import { solveBisection } from '../../solvers/roots'

export const solveExcelBisection = (input: NumericInput): MethodResult => solveBisection(input, false)

