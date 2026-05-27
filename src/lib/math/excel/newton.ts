import type { MethodResult, NumericInput } from '../../types'
import { solveNewton } from '../../solvers/roots'

export const solveExcelNewton = (input: NumericInput): MethodResult => solveNewton(input, false)

