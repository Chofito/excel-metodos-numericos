import type { IterationRow, MethodResult, Status } from "../types";

export const methodResult = (
	status: Status,
	summary: string,
	columns: string[],
	iterations: IterationRow[],
	notes: string[],
	approximation?: number,
): MethodResult => ({
	status,
	summary,
	columns,
	iterations,
	notes,
	approximation,
});

export const failedResult = (
	summary: string,
	columns: string[] = [],
	notes: string[] = [],
): MethodResult => methodResult("failed", summary, columns, [], notes);
