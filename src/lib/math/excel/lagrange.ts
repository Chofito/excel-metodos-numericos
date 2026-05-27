import type { MethodResult, NumericInput } from '../../types'
import { solveLagrange } from '../../solvers/interpolation'

export const solveExcelLagrange = (input: NumericInput): MethodResult => solveLagrange(input, false)

