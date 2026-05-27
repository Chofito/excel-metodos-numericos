import type { MethodResult, NumericInput } from '../../types'
import { solveExcelGaussSeidelCompat } from '../../solvers/systems'

export const solveExcelGaussSeidel = (input: NumericInput): MethodResult => solveExcelGaussSeidelCompat(input)
