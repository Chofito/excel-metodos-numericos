import { FunctionSquare, Gauge, Table2 } from "lucide-react";
import type { ReactNode } from "react";
import type { MethodResult } from "../../lib/numerics";
import { formatNumber } from "../../ui/copy";

type SummaryCardsProps = {
	excelResult: MethodResult;
	modernResult: MethodResult;
	visibleResult: MethodResult;
};

export function SummaryCards({
	excelResult,
	modernResult,
	visibleResult,
}: SummaryCardsProps) {
	return (
		<section className="grid grid-cols-3 gap-3">
			<SummaryCard
				icon={<FunctionSquare className="h-3.5 w-3.5" />}
				label="Resultado Excel"
				value={formatNumber(excelResult.approximation)}
				detail={excelResult.summary}
			/>
			<SummaryCard
				icon={<Gauge className="h-3.5 w-3.5" />}
				label="Resultado moderno"
				value={formatNumber(modernResult.approximation)}
				detail={modernResult.summary}
			/>
			<SummaryCard
				icon={<Table2 className="h-3.5 w-3.5" />}
				label="Iteraciones"
				value={String(visibleResult.iterations.length)}
				detail="Filas renderizadas para el modo activo."
			/>
		</section>
	);
}

function SummaryCard({
	icon,
	label,
	value,
	detail,
}: {
	icon: ReactNode;
	label: string;
	value: string;
	detail: string;
}) {
	return (
		<div className="rounded-md border border-zinc-800 bg-zinc-950 p-4 shadow-xl shadow-black/10">
			<div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
				{icon}
				{label}
			</div>
			<p className="text-lg font-semibold text-zinc-100">{value}</p>
			<p className="mt-1 text-xs text-zinc-500">{detail}</p>
		</div>
	);
}
