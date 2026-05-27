import { GitCompare } from 'lucide-react'
import type { IterationRow, MethodResult } from '../../lib/numerics'
import { formatNumber } from '../../ui/copy'

type CompareTableProps = {
  excelResult: MethodResult
  modernResult: MethodResult
}

const uniqueColumns = (excelColumns: string[], modernColumns: string[]) =>
  [...excelColumns, ...modernColumns.filter((column) => !excelColumns.includes(column))]

const rowByIndex = (rows: IterationRow[], index: number) => rows[index]

const numericDelta = (excelValue: number | string | undefined, modernValue: number | string | undefined) =>
  typeof excelValue === 'number' && typeof modernValue === 'number' ? Math.abs(excelValue - modernValue) : undefined

const deltaTone = (delta?: number) => {
  if (delta === undefined) return 'text-slate-600'
  if (delta === 0) return 'text-emerald-300'
  if (delta < 1e-8) return 'text-cyan-300'
  if (delta < 1e-4) return 'text-amber-300'
  return 'text-rose-300'
}

export function CompareTable({ excelResult, modernResult }: CompareTableProps) {
  const columns = uniqueColumns(excelResult.columns, modernResult.columns)
  const rowCount = Math.max(excelResult.iterations.length, modernResult.iterations.length)
  const rows = Array.from({ length: rowCount }, (_, index) => ({
    index,
    excelRow: rowByIndex(excelResult.iterations, index),
    modernRow: rowByIndex(modernResult.iterations, index),
  }))

  return (
    <section className="min-w-0 max-w-full rounded-md border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20">
      <header className="flex items-center justify-between gap-4 border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-cyan-300" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Comparacion por celda</h3>
            <p className="text-xs text-zinc-500">Cada columna muestra el valor Excel y el moderno apilados para la misma iteracion.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-400"><span className="h-2 w-2 rounded-full bg-emerald-400" />Excel 1:1</span>
          <span className="flex items-center gap-1.5 text-zinc-400"><span className="h-2 w-2 rounded-full bg-violet-400" />Moderno</span>
          <span className="flex items-center gap-1.5 text-zinc-400"><span className="h-2 w-2 rounded-full bg-cyan-300" />Diferencia</span>
        </div>
      </header>
      <div className="max-h-[calc(100vh-420px)] max-w-full overflow-auto overscroll-contain">
        <table className="w-max min-w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-black text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="w-28 border-b border-zinc-800 px-3 py-2">Iteracion</th>
              {columns.map((column) => (
                <th key={column} className="min-w-44 border-b border-zinc-800 px-3 py-2">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.index} className="border-b border-zinc-900 odd:bg-zinc-950 even:bg-black">
                <td className="px-3 py-3 align-top font-mono text-zinc-500">
                  <div>{row.index + 1}</div>
                  {(row.excelRow?.iteration !== row.modernRow?.iteration) && (
                    <div className="mt-1 text-[11px] text-zinc-600">
                      E:{row.excelRow?.iteration ?? '-'} / M:{row.modernRow?.iteration ?? '-'}
                    </div>
                  )}
                </td>
                {columns.map((column) => {
                  const excelValue = row.excelRow?.values[column]
                  const modernValue = row.modernRow?.values[column]
                  const delta = numericDelta(excelValue, modernValue)

                  return (
                    <td key={column} className="px-3 py-3 align-top">
                      <div className="space-y-1 rounded border border-zinc-800 bg-black px-2.5 py-2 font-mono">
                        <ValueLine value={excelValue} className="text-emerald-300" />
                        <ValueLine value={modernValue} className="text-violet-300" />
                        <div className={`border-t border-zinc-800 pt-1 text-[11px] ${deltaTone(delta)}`}>
                          {formatNumber(delta) || '-'}
                        </div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="px-4 py-8 text-sm text-zinc-500">Sin iteraciones para comparar.</div>}
      </div>
    </section>
  )
}

function ValueLine({ value, className }: { value: number | string | undefined; className: string }) {
  return <div className={`min-w-0 break-words text-xs ${className}`}>{formatNumber(value) || '-'}</div>
}
