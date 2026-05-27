export type Mode = 'excel' | 'modern' | 'compare'

export type MethodId =
  | 'bisection'
  | 'fixedPoint'
  | 'secant'
  | 'falsePosition'
  | 'steffensen'
  | 'newton'
  | 'muller'
  | 'lagrange'
  | 'dividedDifferences'
  | 'jacobi'
  | 'gaussSeidel'
  | 'nonlinearFixedPoint'

export type Status = 'converged' | 'failed' | 'running'

export type IterationRow = {
  iteration: number
  values: Record<string, number | string>
}

export type MethodResult = {
  status: Status
  summary: string
  approximation?: number
  iterations: IterationRow[]
  columns: string[]
  notes: string[]
}

export type Point = {
  x: number
  y: number
}

export type NumericInput = {
  formula: string
  transformFormula: string
  equations: string[]
  a: number
  b: number
  x0: number
  x1: number
  x2: number
  tolerance: number
  maxIterations: number
  targetX: number
  pointCount: number
  points: Point[]
  dimension: number
  matrix: number[][]
  vector: number[]
  initialVector: number[]
}
