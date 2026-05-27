import type { MethodResult, NumericInput } from '../../types'
import { solveSecant } from '../../solvers/roots'

export const solveExcelSecant = (input: NumericInput): MethodResult => solveSecant(input, false)

