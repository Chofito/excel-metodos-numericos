type NumberFieldProps = {
	label: string;
	value: number;
	onChange: (value: number) => void;
	step?: string;
};

export function NumberField({
	label,
	value,
	onChange,
	step = "any",
}: NumberFieldProps) {
	return (
		<label className="grid gap-1.5 text-sm font-medium text-zinc-300">
			<span>{label}</span>
			<input
				className="h-10 rounded border border-zinc-800 bg-black px-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/15"
				type="number"
				step={step}
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
			/>
		</label>
	);
}
