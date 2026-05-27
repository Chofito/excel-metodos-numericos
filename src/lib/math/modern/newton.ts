import type { MethodResult, NumericInput } from '../../types'
import { solveNewton } from '../../solvers/roots'

export const solveModernNewton = (input: NumericInput): MethodResult => solveNewton(input, true)

