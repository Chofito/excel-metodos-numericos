import { describe, expect, test } from "bun:test";
import { defaultInput } from "../../../defaultInput";
import { solveExcelNonlinearFixedPoint } from "../index";

describe("punto fijo NL Excel 1:1", () => {
	test("case-1: 2D g1=cos(x2), g2=sin(x1), x1=0, x2=0, tol=0.001 — fila inicial 0", async () => {
		const f = await Bun.file(
			`${import.meta.dir}/fixtures/nonlinearFixedPoint-1.json`,
		).json();
		if (!f.rows.length) return;
		const result = solveExcelNonlinearFixedPoint({
			...defaultInput,
			...f.input,
		});
		expect(result.status).toBe(f.status);
		expect(result.iterations.length).toBe(f.rows.length);
		for (let i = 0; i < f.rows.length; i++) {
			for (const [col, val] of Object.entries(
				f.rows[i] as Record<string, number | string>,
			)) {
				if (typeof val === "number") {
					expect(result.iterations[i].values[col]).toBeCloseTo(val, 6);
				} else {
					expect(String(result.iterations[i].values[col])).toBe(String(val));
				}
			}
		}
		if (f.approximation !== null)
			expect(result.approximation).toBeCloseTo(f.approximation, 4);
	});
});
