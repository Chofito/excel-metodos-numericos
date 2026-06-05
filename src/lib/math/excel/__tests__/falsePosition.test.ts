import { describe, expect, test } from "bun:test";
import { defaultInput } from "../../../defaultInput";
import { solveExcelFalsePosition } from "../index";

describe("posicionfalsa Excel 1:1", () => {
	test("case-1: f(x)=x^3-x-2, x0=1, x1=2, tol=0.001 — variante secante VBA", async () => {
		const f = await Bun.file(
			`${import.meta.dir}/fixtures/falsePosition-1.json`,
		).json();
		if (!f.rows.length) return;
		const result = solveExcelFalsePosition({ ...defaultInput, ...f.input });
		expect(result.status).toBe(f.status);
		expect(result.iterations.length).toBe(f.rows.length);
		for (let i = 0; i < f.rows.length; i++) {
			for (const [col, val] of Object.entries(
				f.rows[i] as Record<string, number>,
			)) {
				expect(result.iterations[i].values[col]).toBeCloseTo(val, 6);
			}
		}
		if (f.approximation !== null)
			expect(result.approximation).toBeCloseTo(f.approximation, 4);
	});
});
