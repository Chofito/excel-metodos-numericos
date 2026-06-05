import type { MethodResult } from "../../lib/numerics";
import { formatNumber, statusClass, statusLabel } from "../../ui/copy";

type ResultTableProps = {
	title: string;
	result: MethodResult;
};

export function ResultTable({ title, result }: ResultTableProps) {
	return (
		<section className="min-w-0 rounded-md border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20">
			<header className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3">
				<div>
					<h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
					<p className="text-xs text-zinc-500">{result.summary}</p>
				</div>
				<span
					className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass[result.status]}`}
				>
					{statusLabel[result.status]}
				</span>
			</header>
			<div className="max-h-[calc(100vh-420px)] overflow-auto">
				<table className="w-full min-w-[760px] border-collapse text-left text-sm">
					<thead className="sticky top-0 z-10 bg-black text-xs uppercase tracking-wide text-zinc-500">
						<tr>
							<th className="w-24 border-b border-zinc-800 px-3 py-2">
								Iteracion
							</th>
							{result.columns.map((column) => (
								<th key={column} className="border-b border-zinc-800 px-3 py-2">
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{result.iterations.map((row) => (
							<tr
								key={row.iteration}
								className="border-b border-zinc-900 odd:bg-zinc-950 even:bg-black"
							>
								<td className="px-3 py-2 font-mono text-zinc-500">
									{row.iteration}
								</td>
								{result.columns.map((column) => (
									<td
										key={column}
										className="px-3 py-2 font-mono text-zinc-200"
									>
										{formatNumber(row.values[column])}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				{result.iterations.length === 0 && (
					<div className="px-4 py-8 text-sm text-zinc-500">
						Sin iteraciones para mostrar.
					</div>
				)}
			</div>
		</section>
	);
}
