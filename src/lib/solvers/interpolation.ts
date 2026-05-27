import { isFiniteNumber } from '../shared/evaluate'
import type { MethodResult, NumericInput, Point } from '../types'
import { methodResult } from './result'

const activePoints = (input: NumericInput) =>
  input.points
    .slice(0, input.pointCount)
    .filter((point) => isFiniteNumber(point.x) && isFiniteNumber(point.y))

export function solveLagrange(input: NumericInput, modern = false): MethodResult {
  const points = activePoints(input)
  const columns = ['x_i', 'y_i', 'L_i(x)', 'termino']
  const rows = []
  let sum = 0

  for (let i = 0; i < points.length; i += 1) {
    let basis = 1
    for (let j = 0; j < points.length; j += 1) {
      if (i !== j) basis *= (input.targetX - points[j].x) / (points[i].x - points[j].x)
    }
    const term = points[i].y * basis
    rows.push({ iteration: i, values: { x_i: points[i].x, y_i: points[i].y, 'L_i(x)': basis, termino: term } })
    sum += term
  }

  return methodResult('converged', `P(${input.targetX}) = ${sum}`, columns, rows, [modern ? 'Forma directa de Lagrange.' : 'Replica la evaluacion directa del modulo lagrange_AR.'], sum)
}

const dividedTable = (points: Point[]) => {
  const n = points.length
  const table = Array.from({ length: n }, () => Array(n).fill(0))
  for (let i = 0; i < n; i += 1) table[i][0] = points[i].y
  for (let j = 1; j < n; j += 1) {
    for (let i = j; i < n; i += 1) {
      table[i][j] = (table[i][j - 1] - table[i - 1][j - 1]) / (points[i].x - points[i - j].x)
    }
  }
  return table
}

export function solveDividedDifferences(input: NumericInput, modern = false): MethodResult {
  const points = activePoints(input).slice(0, 5)
  const table = dividedTable(points)
  const columns = ['x', 'f[x]', 'orden 1', 'orden 2', 'orden 3', 'orden 4']
  const rows = points.map((point, i) => ({
    iteration: i,
    values: {
      x: point.x,
      'f[x]': table[i][0],
      'orden 1': table[i][1] ?? '',
      'orden 2': table[i][2] ?? '',
      'orden 3': table[i][3] ?? '',
      'orden 4': table[i][4] ?? '',
    },
  }))

  let forward = table[0][0]
  let product = 1
  for (let j = 1; j < points.length; j += 1) {
    product *= input.targetX - points[j - 1].x
    forward += table[j][j] * product
  }

  let backward = forward
  if (modern) {
    backward = table[points.length - 1][0]
    let backwardProduct = 1
    for (let j = 1; j < points.length; j += 1) {
      backwardProduct *= input.targetX - points[points.length - j].x
      backward += table[points.length - 1][j] * backwardProduct
    }
  }

  const approximation = modern ? backward : forward
  return methodResult('converged', `P(${input.targetX}) = ${approximation}`, columns, rows, [modern ? 'Evalua forma regresiva.' : 'Replica el valor escrito por el VBA, que evalua la forma progresiva.'], approximation)
}
