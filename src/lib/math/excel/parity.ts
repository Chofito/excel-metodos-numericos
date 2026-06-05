import type { MethodId } from "../../types";

export type ExcelParityNote = {
	sourceModule: string;
	inputs: string[];
	iterationColumns: string[];
	quirks: string[];
};

export const excelParityNotes: Record<MethodId, ExcelParityNote> = {
	bisection: {
		sourceModule: "biseccion_AR.bas",
		inputs: ["f(x)", "a", "b", "Tolerancia", "n"],
		iterationColumns: [
			"nIteracion",
			"a",
			"b",
			"p",
			"f(a)",
			"f(b)",
			"f(p)",
			"f(a)f(p)",
			"ba",
		],
		quirks: [
			"Exige cambio de signo estricto; f(a)=0 o f(b)=0 no pasa Datos_Iniciales.",
			"Error mostrado como ba=(b-a)/2, no Abs(ba).",
		],
	},
	fixedPoint: {
		sourceModule: "puntofijo_AR.bas",
		inputs: ["g(x)", "Po", "Tolerancia", "maxIteracion"],
		iterationColumns: ["nIteracion", "Po", "P1", "Error"],
		quirks: ["Condicion de exito Excel: Error < Tolerancia."],
	},
	secant: {
		sourceModule: "secante_AR.bas",
		inputs: ["f(x)", "xAnterior", "xActual", "Tolerancia", "maxIteracion"],
		iterationColumns: [
			"nIteracion",
			"xAnterior",
			"xActual",
			"xSiguiente",
			"Error",
		],
		quirks: [
			"Actualiza xAnterior=xActual y xActual=xSiguiente despues de escribir la fila.",
		],
	},
	falsePosition: {
		sourceModule: "posicionfalsa_AR.bas",
		inputs: ["f(x)", "xAnterior", "xActual", "Tolerancia", "maxIteracion"],
		iterationColumns: [
			"nIteracion",
			"xAnterior",
			"xActual",
			"xSiguiente",
			"Error",
		],
		quirks: [
			"El VBA no implementa regula falsi clasica; calcula una primera fila tipo secante y luego mantiene xActual fijo.",
			"La fila inicial se escribe antes de reiniciar nIteracion; el mensaje de exito usa nIteracion, no necesariamente el numero visible de fila.",
		],
	},
	steffensen: {
		sourceModule: "steffenssen_AR.bas",
		inputs: ["g(x)", "Po", "Tolerancia", "maxIteracion"],
		iterationColumns: ["nIteracion", "Po", "P1", "P2", "p", "Error"],
		quirks: ["Condicion de exito Excel: Error < Tolerancia."],
	},
	newton: {
		sourceModule: "newton_AR.bas",
		inputs: ["f(x)", "Po", "Tolerancia", "maxIteracion"],
		iterationColumns: ["nIteracion", "Po", "P1", "Error"],
		quirks: [
			"Derivada progresiva fija: (-25f(x)+48f(x+h)-36f(x+2h)+16f(x+3h)-3f(x+4h))/(12h), h=0.1.",
			"El VBA intenta reemplazar e/pi antes de cargar la ecuacion y ese reemplazo se pierde.",
		],
	},
	muller: {
		sourceModule: "muller_AR.bas",
		inputs: ["f(x)", "x0", "x1", "x2", "Tolerancia", "maxIteracion"],
		iterationColumns: [
			"nIteracion",
			"x0",
			"x1",
			"x2",
			"p",
			"f(x0)",
			"f(x1)",
			"f(x2)",
			"f(p)",
			"Abs(h)",
		],
		quirks: [
			"Solo se replica la rama real; si el discriminante da complejo se reporta fallo numerico.",
		],
	},
	lagrange: {
		sourceModule: "lagrange_AR.bas",
		inputs: ["maxN/grado", "Po", "x_0..x_maxN", "f(x_0)..f(x_maxN)"],
		iterationColumns: ["salida", "valor"],
		quirks: [
			"El VBA usa maxN como grado, por lo que consume maxN+1 puntos.",
			"Construye strings de polinomio y luego usa Evaluate; no es una tabla iterativa real.",
			"Ademas escribe una aproximacion directa en C17 para grados 1, 2 y 3.",
		],
	},
	dividedDifferences: {
		sourceModule: "diferencias_AR.bas",
		inputs: ["cantidad de puntos 2..5", "valor a evaluar", "x_i", "f(x_i)"],
		iterationColumns: ["x", "f[x]", "orden 1", "orden 2", "orden 3", "orden 4"],
		quirks: [
			"El VBA escribe tabla triangular y luego evalua la forma progresiva.",
			"Aunque arma texto regresivo, evalua y muestra de nuevo ValorSolucion1 en ambos bloques por un bug.",
		],
	},
	jacobi: {
		sourceModule: "Hoja14.cls",
		inputs: [
			"dimension 3..6",
			"matriz A",
			"vector b",
			"vector inicial",
			"Tolerancia",
			"maxIteracion",
		],
		iterationColumns: ["nIteracion", "x1..xn", "E1..En", "Error"],
		quirks: [
			"Para 6x6 el VBA usa el termino independiente de la primera ecuacion como coeficiente de x6.",
		],
	},
	gaussSeidel: {
		sourceModule: "Hoja15.cls",
		inputs: [
			"dimension 3..6",
			"matriz A",
			"vector b",
			"vector inicial",
			"Tolerancia",
			"maxIteracion",
		],
		iterationColumns: ["nIteracion", "x1..xn", "E1..En", "Error"],
		quirks: [
			"Para 6x6 el VBA usa el termino independiente de la primera ecuacion como coeficiente de x6.",
		],
	},
	nonlinearFixedPoint: {
		sourceModule: "Hoja16.cls",
		inputs: [
			"g1",
			"g2",
			"g3 opcional",
			"x1 inicial",
			"x2 inicial",
			"x3 inicial opcional",
			"Tolerancia",
			"maxIteracion",
		],
		iterationColumns: [
			"nIteracion",
			"x1",
			"x2",
			"x3",
			"E1",
			"E2",
			"E3",
			"Error",
		],
		quirks: [
			"El modo Excel incluye una fila inicial 0 con valores iniciales y --- en errores.",
			"Decide 2D/3D por si la celda del valor inicial x3 esta vacia, no por si existe g3.",
			"Evalua g1, g2 y g3 con los valores anteriores, es decir actualizacion simultanea.",
			"Reemplaza x1, x2, x3 y Pi por texto antes de Evaluate.",
		],
	},
};
