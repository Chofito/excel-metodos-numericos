import type { MethodResult, NumericInput } from '../../types'
import { solveGaussSeidel } from '../../solvers/systems'

export const solveModernGaussSeidel = (input: NumericInput): MethodResult => solveGaussSeidel(input)

