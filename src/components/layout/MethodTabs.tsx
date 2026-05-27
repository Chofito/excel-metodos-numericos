import { methods } from '../../lib/methods'
import type { MethodId } from '../../lib/numerics'

type MethodTabsProps = {
  selectedMethod: MethodId
  onSelectMethod: (method: MethodId) => void
}

export function MethodTabs({ selectedMethod, onSelectMethod }: MethodTabsProps) {
  return (
    <nav className="min-w-0 rounded-md border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20">
      <div className="max-w-full overflow-x-auto">
        <div className="flex w-max min-w-full items-end gap-1 px-3 pt-2">
          {methods.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-t-md border px-3 py-2 text-sm font-semibold transition ${
                item.id === selectedMethod
                  ? 'border-cyan-300/50 border-b-zinc-950 bg-black text-cyan-200'
                  : 'border-transparent text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              onClick={() => onSelectMethod(item.id)}
            >
              {item.shortName}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
