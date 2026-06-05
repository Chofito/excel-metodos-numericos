import type { MethodKind } from "../../lib/methods";
import type { MethodId, NumericInput } from "../../lib/numerics";
import { NumberField } from "../fields/NumberField";
import { TextField } from "../fields/TextField";

type MethodFormProps = {
	kind: MethodKind;
	method: MethodId;
	input: NumericInput;
	update: (patch: Partial<NumericInput>) => void;
};

export function MethodForm({ kind, method, input, update }: MethodFormProps) {
	const updatePoint = (index: number, key: "x" | "y", value: number) => {
		const points = input.points.map((point, pointIndex) =>
			pointIndex === index ? { ...point, [key]: value } : point,
		);
		update({ points });
	};

	const updateMatrix = (rowIndex: number, colIndex: number, value: number) => {
		const matrix = input.matrix.map((row, r) =>
			row.map((cell, c) => (r === rowIndex && c === colIndex ? value : cell)),
		);
		update({ matrix });
	};

	const updateVector = (
		key: "vector" | "initialVector",
		index: number,
		value: number,
	) => {
		const next = input[key].map((cell, cellIndex) =>
			cellIndex === index ? value : cell,
		);
		if (key === "vector") update({ vector: next });
		else update({ initialVector: next });
	};

	if (kind === "interpolation") {
		return (
			<div className="grid gap-4">
				<div className="grid grid-cols-2 gap-3">
					<NumberField
						label="Evaluar en x"
						value={input.targetX}
						onChange={(targetX) => update({ targetX })}
					/>
					<NumberField
						label="Cantidad de puntos"
						value={input.pointCount}
						step="1"
						onChange={(pointCount) =>
							update({
								pointCount: Math.min(5, Math.max(2, Math.round(pointCount))),
							})
						}
					/>
				</div>
				<div className="overflow-hidden rounded-md border border-zinc-800">
					<div className="grid grid-cols-[80px_1fr_1fr] bg-black px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
						<span>i</span>
						<span>x_i</span>
						<span>f(x_i)</span>
					</div>
					{input.points.map((point, index) => (
						<div
							key={index}
							className="grid grid-cols-[80px_1fr_1fr] gap-2 border-t border-zinc-800 px-3 py-2"
						>
							<span className="self-center text-sm text-zinc-500">{index}</span>
							<input
								className="h-9 rounded border border-zinc-800 bg-black px-2 text-sm text-zinc-100"
								type="number"
								value={point.x}
								onChange={(event) =>
									updatePoint(index, "x", Number(event.target.value))
								}
							/>
							<input
								className="h-9 rounded border border-zinc-800 bg-black px-2 text-sm text-zinc-100"
								type="number"
								value={point.y}
								onChange={(event) =>
									updatePoint(index, "y", Number(event.target.value))
								}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (kind === "system") {
		const n = input.dimension;
		return (
			<div className="grid gap-4">
				<NumberField
					label="Dimension (3 a 6)"
					value={n}
					step="1"
					onChange={(dimension) =>
						update({
							dimension: Math.min(6, Math.max(3, Math.round(dimension))),
						})
					}
				/>
				<div className="overflow-auto rounded-md border border-zinc-800 p-3">
					<div
						className="grid gap-2"
						style={{
							gridTemplateColumns: `repeat(${n + 2}, minmax(72px, 1fr))`,
						}}
					>
						{Array.from({ length: n }).map((_, row) => (
							<div key={`row-${row}`} className="contents">
								{Array.from({ length: n }).map((__, col) => (
									<input
										key={`a-${row}-${col}`}
										className="h-9 rounded border border-zinc-800 bg-black px-2 text-sm text-zinc-100"
										type="number"
										value={input.matrix[row][col]}
										onChange={(event) =>
											updateMatrix(row, col, Number(event.target.value))
										}
									/>
								))}
								<input
									className="h-9 rounded border border-cyan-500/30 bg-cyan-400/10 px-2 text-sm text-cyan-100"
									type="number"
									value={input.vector[row]}
									onChange={(event) =>
										updateVector("vector", row, Number(event.target.value))
									}
								/>
								<input
									className="h-9 rounded border border-zinc-800 bg-black px-2 text-sm text-zinc-100"
									type="number"
									value={input.initialVector[row]}
									onChange={(event) =>
										updateVector(
											"initialVector",
											row,
											Number(event.target.value),
										)
									}
								/>
							</div>
						))}
					</div>
					<div className="mt-2 text-xs text-zinc-500">
						Columnas: coeficientes A, termino independiente b, vector inicial.
					</div>
				</div>
			</div>
		);
	}

	if (kind === "nonlinear") {
		return (
			<div className="grid gap-4">
				<TextField
					label="g1(x1,x2,x3)"
					value={input.equations[0]}
					onChange={(value) =>
						update({
							equations: [value, input.equations[1], input.equations[2]],
						})
					}
				/>
				<TextField
					label="g2(x1,x2,x3)"
					value={input.equations[1]}
					onChange={(value) =>
						update({
							equations: [input.equations[0], value, input.equations[2]],
						})
					}
				/>
				<TextField
					label="g3 opcional"
					value={input.equations[2]}
					onChange={(value) =>
						update({
							equations: [input.equations[0], input.equations[1], value],
						})
					}
				/>
				<div className="grid grid-cols-3 gap-3">
					{[0, 1, 2].map((index) => (
						<NumberField
							key={index}
							label={`x${index + 1} inicial`}
							value={input.initialVector[index]}
							onChange={(value) => updateVector("initialVector", index, value)}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="grid gap-4">
			{kind === "fixed" ? (
				<>
					<TextField
						label="g(x)"
						value={input.transformFormula}
						onChange={(transformFormula) => update({ transformFormula })}
					/>
					<TextField
						label="f(x) para residuo moderno"
						value={input.formula}
						onChange={(formula) => update({ formula })}
					/>
				</>
			) : (
				<TextField
					label="f(x)"
					value={input.formula}
					onChange={(formula) => update({ formula })}
				/>
			)}
			<div className="grid grid-cols-2 gap-3">
				{method === "bisection" && (
					<>
						<NumberField
							label="a"
							value={input.a}
							onChange={(a) => update({ a })}
						/>
						<NumberField
							label="b"
							value={input.b}
							onChange={(b) => update({ b })}
						/>
					</>
				)}
				{["fixedPoint", "steffensen", "newton"].includes(method) && (
					<NumberField
						label="x0 / p0"
						value={input.x0}
						onChange={(x0) => update({ x0 })}
					/>
				)}
				{["secant", "falsePosition"].includes(method) && (
					<>
						<NumberField
							label="x anterior"
							value={input.x0}
							onChange={(x0) => update({ x0 })}
						/>
						<NumberField
							label="x actual"
							value={input.x1}
							onChange={(x1) => update({ x1 })}
						/>
					</>
				)}
				{method === "muller" && (
					<>
						<NumberField
							label="x0"
							value={input.x0}
							onChange={(x0) => update({ x0 })}
						/>
						<NumberField
							label="x1"
							value={input.x1}
							onChange={(x1) => update({ x1 })}
						/>
						<NumberField
							label="x2"
							value={input.x2}
							onChange={(x2) => update({ x2 })}
						/>
					</>
				)}
			</div>
		</div>
	);
}
