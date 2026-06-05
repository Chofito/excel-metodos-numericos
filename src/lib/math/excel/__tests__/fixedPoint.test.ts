import { describe, expect, test } from "bun:test";
import { defaultInput } from "../../../defaultInput";
import { solveExcelFixedPoint } from "../index";

describe("puntofijo Excel 1:1", () => {
	test("case-1: g(x)=(x+2)^(1/3), x0=1, tol=0.001", async () => {
		const f = await Bun.file(
			`${import.meta.dir}/fixtures/fixedPoint-1.json`,
		).json();
		if (!f.rows.length) return;
		const result = solveExcelFixedPoint({ ...defaultInput, ...f.input });
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
