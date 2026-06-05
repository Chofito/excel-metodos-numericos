import type { MethodId } from "./types";

export type MethodKind =
	| "root"
	| "fixed"
	| "interpolation"
	| "system"
	| "nonlinear";

export type MethodMeta = {
	id: MethodId;
	name: string;
	shortName: string;
	kind: MethodKind;
	source: string;
	description: string;
};

export const methods: MethodMeta[] = [
	{
		id: "bisection",
		name: "Biseccion",
		shortName: "Biseccion",
		kind: "root",
		source: "biseccion_AR.bas",
		description: "Intervalo con cambio de signo y error por semiancho.",
	},
	{
		id: "fixedPoint",
		name: "Punto fijo",
		shortName: "Punto fijo",
		kind: "fixed",
		source: "puntofijo_AR.bas",
		description: "Itera p = g(p) hasta tolerancia.",
	},
	{
		id: "secant",
		name: "Secante",
		shortName: "Secante",
		kind: "root",
		source: "secante_AR.bas",
		description: "Dos puntos iniciales y avance por cuerda secante.",
	},
	{
		id: "falsePosition",
		name: "Posicion falsa",
		shortName: "Pos. falsa",
		kind: "root",
		source: "posicionfalsa_AR.bas",
		description: "El modo Excel replica la variante secante usada en VBA.",
	},
	{
		id: "steffensen",
		name: "Steffenssen",
		shortName: "Steffenssen",
		kind: "fixed",
		source: "steffenssen_AR.bas",
		description: "Aceleracion de punto fijo por Aitken.",
	},
	{
		id: "newton",
		name: "Newton",
		shortName: "Newton",
		kind: "root",
		source: "newton_AR.bas",
		description: "Excel usa derivada progresiva de cinco puntos con h=0.1.",
	},
	{
		id: "muller",
		name: "Muller",
		shortName: "Muller",
		kind: "root",
		source: "muller_AR.bas",
		description: "Interpolacion cuadratica con tres puntos iniciales.",
	},
	{
		id: "lagrange",
		name: "Lagrange",
		shortName: "Lagrange",
		kind: "interpolation",
		source: "lagrange_AR.bas",
		description: "Interpolacion directa por bases de Lagrange.",
	},
	{
		id: "dividedDifferences",
		name: "Regresivas",
		shortName: "Regresivas",
		kind: "interpolation",
		source: "diferencias_AR.bas",
		description: "Diferencias divididas progresivas/regresivas.",
	},
	{
		id: "jacobi",
		name: "Jacobi",
		shortName: "Jacobi",
		kind: "system",
		source: "Hoja14.cls",
		description: "Sistemas lineales de 3 a 6 incognitas.",
	},
	{
		id: "gaussSeidel",
		name: "Gauss Seidel",
		shortName: "G. Seidel",
		kind: "system",
		source: "Hoja15.cls",
		description:
			"Sistemas lineales usando valores nuevos en la misma iteracion.",
	},
	{
		id: "nonlinearFixedPoint",
		name: "Punto Fijo NL",
		shortName: "PF NL",
		kind: "nonlinear",
		source: "Hoja16.cls",
		description: "Sistema no lineal de 2 o 3 ecuaciones g_i(x).",
	},
];

export const methodById = Object.fromEntries(
	methods.map((method) => [method.id, method]),
) as Record<MethodId, MethodMeta>;
