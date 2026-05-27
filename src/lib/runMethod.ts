import type { MethodId, MethodResult, NumericInput } from './types'
import {
  solveExcelBisection,
  solveExcelDividedDifferences,
  solveExcelFalsePosition,
  solveExcelFixedPoint,
  solveExcelGaussSeidel,
  solveExcelJacobi,
  solveExcelLagrange,
  solveExcelMuller,
  solveExcelNewton,
  solveExcelNonlinearFixedPoint,
  solveExcelSecant,
  solveExcelSteffensen,
} from './math/excel'
import {
  solveModernBisection,
  solveModernDividedDifferences,
  solveModernFalsePosition,
  solveModernFixedPoint,
  solveModernGaussSeidel,
  solveModernJacobi,
  solveModernLagrange,
  solveModernMuller,
  solveModernNewton,
  solveModernNonlinearFixedPoint,
  solveModernSecant,
  solveModernSteffensen,
} from './math/modern'
import { failedResult } from './solvers/result'

export function runMethod(method: MethodId, input: NumericInput, modern = false): MethodResult {
  const solvers: Record<MethodId, (input: NumericInput) => MethodResult> = modern
    ? {
        bisection: solveModernBisection,
        fixedPoint: solveModernFixedPoint,
        secant: solveModernSecant,
        falsePosition: solveModernFalsePosition,
        steffensen: solveModernSteffensen,
        newton: solveModernNewton,
        muller: solveModernMuller,
        lagrange: solveModernLagrange,
        dividedDifferences: solveModernDividedDifferences,
        jacobi: solveModernJacobi,
        gaussSeidel: solveModernGaussSeidel,
        nonlinearFixedPoint: solveModernNonlinearFixedPoint,
      }
    : {
        bisection: solveExcelBisection,
        fixedPoint: solveExcelFixedPoint,
        secant: solveExcelSecant,
        falsePosition: solveExcelFalsePosition,
        steffensen: solveExcelSteffensen,
        newton: solveExcelNewton,
        muller: solveExcelMuller,
        lagrange: solveExcelLagrange,
        dividedDifferences: solveExcelDividedDifferences,
        jacobi: solveExcelJacobi,
        gaussSeidel: solveExcelGaussSeidel,
        nonlinearFixedPoint: solveExcelNonlinearFixedPoint,
      }

  try {
    return solvers[method](input)
  } catch (error) {
    return failedResult(error instanceof Error ? error.message : 'Error numerico inesperado.')
  }
}
