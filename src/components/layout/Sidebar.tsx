import { Sigma } from 'lucide-react'
import type { MethodId } from '../../lib/numerics'
import { methods } from '../../lib/methods'

type SidebarProps = {
  selectedMethod: MethodId
  onSelectMethod: (method: MethodId) => void
}

export function Sidebar({ selectedMethod, onSelectMethod }: SidebarProps) {
  return (
    <aside className="border-r border-slate-800 bg-slate-950 p-5">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400 text-slate-950">
          <Sigma className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-normal text-slate-100">Metodos numericos</h1>
          <p className="text-xs text-slate-500">VBA auditado a TypeScript</p>
        </div>
      </div>
      <nav className="grid gap-1">
        {methods.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
              item.id === selectedMethod ? 'bg-cyan-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
            }`}
            onClick={() => onSelectMethod(item.id)}
          >
            <span>{item.shortName}</span>
            <span className={item.id === selectedMethod ? 'text-slate-700' : 'text-slate-600'}>{item.source.replace(/\..+$/, '')}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

