import type { MethodResult, NumericInput } from '../../types'
import { solveJacobi } from '../../solvers/systems'

export const solveModernJacobi = (input: NumericInput): MethodResult => solveJacobi(input)

