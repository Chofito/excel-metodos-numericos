import type { MethodResult, NumericInput } from '../../types'
import { solveMuller } from '../../solvers/roots'

export const solveExcelMuller = (input: NumericInput): MethodResult => solveMuller(input, false)

