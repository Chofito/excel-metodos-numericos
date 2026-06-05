import { Calculator, RefreshCcw } from "lucide-react";
import type { MethodKind } from "../../lib/methods";
import type { MethodId, Mode, NumericInput } from "../../lib/numerics";
import { modeCopy } from "../../ui/copy";
import { NumberField } from "../fields/NumberField";
import { MethodForm } from "../method-form/MethodForm";

type InputPanelProps = {
	kind: MethodKind;
	method: MethodId;
	mode: Mode;
	input: NumericInput;
	update: (patch: Partial<NumericInput>) => void;
	onReset: () => void;
};

export function InputPanel({
	kind,
	method,
	mode,
	input,
	update,
	onReset,
}: InputPanelProps) {
	return (
		<section className="rounded-md border border-zinc-800 bg-zinc-950 p-4 shadow-xl shadow-black/20">
			<div className="mb-4 flex items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2">
						<Calculator className="h-4 w-4 text-cyan-300" />
						<h3 className="text-sm font-semibold text-zinc-100">Entradas</h3>
					</div>
					<p className="mt-1 text-xs text-zinc-500">
						{modeCopy[mode].description}
					</p>
				</div>
				<button
					type="button"
					className="inline-flex items-center gap-1 rounded border border-zinc-800 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-900"
					onClick={onReset}
				>
					<RefreshCcw className="h-3.5 w-3.5" />
					Restablecer
				</button>
			</div>
			<MethodForm kind={kind} method={method} input={input} update={update} />
			<div className="mt-4 grid grid-cols-2 gap-3">
				<NumberField
					label="Tolerancia"
					value={input.tolerance}
					onChange={(tolerance) => update({ tolerance })}
				/>
				<NumberField
					label="Max iteraciones"
					step="1"
					value={input.maxIterations}
					onChange={(maxIterations) =>
						update({ maxIterations: Math.max(1, Math.round(maxIterations)) })
					}
				/>
			</div>
		</section>
	);
}
