import type { MethodResult, NumericInput } from '../../types'
import { solveExcelJacobiCompat } from '../../solvers/systems'

export const solveExcelJacobi = (input: NumericInput): MethodResult => solveExcelJacobiCompat(input)
