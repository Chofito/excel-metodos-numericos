import { useMemo, useState } from 'react'
import { defaultInput, runMethod, type MethodId, type Mode, type NumericInput } from './lib/numerics'
import { methodById } from './lib/methods'
import { modeCopy } from './ui/copy'
import { AppHeader } from './components/layout/AppHeader'
import { InputPanel } from './components/layout/InputPanel'
import { MethodTabs } from './components/layout/MethodTabs'
import { CompareTable } from './components/results/CompareTable'
import { ResultTable } from './components/results/ResultTable'
import { SummaryCards } from './components/results/SummaryCards'

function App() {
  const [selectedMethod, setSelectedMethod] = useState<MethodId>('bisection')
  const [mode, setMode] = useState<Mode>('compare')
  const [input, setInput] = useState<NumericInput>(defaultInput)

  const method = methodById[selectedMethod]
  const excelResult = useMemo(() => runMethod(selectedMethod, input, false), [selectedMethod, input])
  const modernResult = useMemo(() => runMethod(selectedMethod, input, true), [selectedMethod, input])
  const visibleResult = mode === 'modern' ? modernResult : excelResult

  const updateInput = (patch: Partial<NumericInput>) => {
    setInput((current) => ({ ...current, ...patch }))
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <section className="min-h-screen min-w-0 bg-black p-5">
        <AppHeader
          method={method}
          mode={mode}
          onModeChange={setMode}
        />

        <div className="grid gap-4">
          <InputPanel
            kind={method.kind}
            method={selectedMethod}
            mode={mode}
            input={input}
            update={updateInput}
            onReset={() => setInput(defaultInput)}
          />

          <div className="grid min-w-0 gap-4">
            <SummaryCards excelResult={excelResult} modernResult={modernResult} visibleResult={visibleResult} />

            {mode === 'compare' ? (
              <>
                <CompareTable excelResult={excelResult} modernResult={modernResult} />
                <div className="grid gap-4">
                  <ResultTable title="Excel 1:1" result={excelResult} />
                  <ResultTable title="Moderno" result={modernResult} />
                </div>
              </>
            ) : (
              <ResultTable title={modeCopy[mode].label} result={visibleResult} />
            )}
          </div>

          <MethodTabs selectedMethod={selectedMethod} onSelectMethod={setSelectedMethod} />
        </div>
      </section>
    </main>
  )
}

export default App
