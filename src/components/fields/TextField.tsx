type TextFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export function TextField({ label, value, onChange }: TextFieldProps) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-zinc-300">
      <span>{label}</span>
      <input
        className="h-10 rounded border border-zinc-800 bg-black px-3 font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/15"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
