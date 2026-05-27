import { Sigma } from 'lucide-react'
import type { MethodMeta } from '../../lib/methods'
import type { Mode } from '../../lib/numerics'
import { modeCopy } from '../../ui/copy'

type AppHeaderProps = {
  method: MethodMeta
  mode: Mode
  onModeChange: (mode: Mode) => void
}

export function AppHeader({ method, mode, onModeChange }: AppHeaderProps) {
  return (
    <header className="mb-4 rounded-md border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20">
      <div className="flex min-w-0 items-center justify-between gap-5 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-cyan-300 text-zinc-950">
            <Sigma className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-normal text-zinc-100">Metodos numericos</h1>
            <p className="truncate text-xs text-zinc-500">{method.name}: {method.description}</p>
          </div>
        </div>

        <div className="flex shrink-0 rounded-md border border-zinc-800 bg-black p-1">
          {(['excel', 'modern', 'compare'] as Mode[]).map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded px-3 py-2 text-sm font-semibold transition ${mode === item ? 'bg-cyan-300 text-zinc-950' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100'}`}
              onClick={() => onModeChange(item)}
            >
              {modeCopy[item].label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
