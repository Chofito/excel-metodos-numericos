import type { MethodResult, NumericInput } from '../../types'
import { solveSteffensen } from '../../solvers/roots'

export const solveExcelSteffensen = (input: NumericInput): MethodResult => solveSteffensen(input, false)

