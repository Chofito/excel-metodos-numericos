import { describe, expect, test } from "bun:test";
import { defaultInput } from "../../../defaultInput";
import { solveExcelDividedDifferences } from "../index";

describe("diferencias divididas Excel 1:1", () => {
	test("case-1: 3 puntos (0,1)(1,4)(2,9), targetX=1.5 — valor regresivo = progresivo (bug VBA)", async () => {
		const f = await Bun.file(
			`${import.meta.dir}/fixtures/dividedDifferences-1.json`,
		).json();
		if (!f.rows.length) return;
		const result = solveExcelDividedDifferences({
			...defaultInput,
			...f.input,
		});
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
