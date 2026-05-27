# Plan de prueba Excel real vs TypeScript

Objetivo: manana correr el `.xlsm` real y comparar cada metodo contra el modo `Excel 1:1` de la app.

Regla de oro: primero se compara fila por fila contra el Excel. Despues se compara contra modo moderno.

## Datos que debemos capturar por corrida

Para cada metodo:

- Inputs exactos usados en el Excel.
- Tabla generada por el Excel, sin redondear manualmente.
- Mensaje final o celda de resultado final.
- Si hubo error de Excel/VBA, capturar que error fue.
- Misma corrida en la app TS modo `Excel 1:1`.
- Diferencias por columna:
  - exacta para texto y conteo de filas.
  - numerica para valores, con tolerancia inicial sugerida `1e-9`.

## Formato sugerido de fixture

Cuando ya tengamos valores reales, guardar fixtures en una carpeta futura:

```txt
fixtures/excel/
  bisection.basic.json
  fixed-point.basic.json
  secant.basic.json
  false-position.basic.json
  steffensen.basic.json
  newton.basic.json
  muller.basic.json
  lagrange.degree-2.json
  divided-differences.n3.json
  jacobi.3x3.json
  gauss-seidel.3x3.json
  nonlinear-fixed-point.2d.json
```

Estructura sugerida:

```json
{
  "method": "bisection",
  "source": "PLANTILLA DE METODOS NUMERICOS_office 2007.xlsm",
  "inputs": {},
  "excelRows": [],
  "excelMessage": "",
  "notes": []
}
```

## Checklist de metodos

### Biseccion

- Caso recomendado:
  - `f(x) = x^3 - x - 2`
  - `a = 1`
  - `b = 2`
  - `Tolerancia = 0.0001`
  - `n = 20`
- Comparar:
  - filas B:J.
  - columnas `a`, `b`, `p`, `f(a)`, `f(b)`, `f(p)`, `f(a)f(p)`, `ba`.
- Caso extra:
  - endpoint con raiz exacta para confirmar que el Excel lo rechaza por no haber cambio de signo estricto.

### Punto fijo

- Caso recomendado:
  - `g(x) = cos(x)`
  - `Po = 0.5`
  - `Tolerancia = 0.0001`
  - `maxIteracion = 30`
- Comparar:
  - filas B:E.
  - `Po`, `P1`, `Error`.

### Secante

- Caso recomendado:
  - `f(x) = x^3 - x - 2`
  - `xAnterior = 1`
  - `xActual = 2`
  - `Tolerancia = 0.0001`
  - `maxIteracion = 20`
- Comparar:
  - filas B:F.
  - actualizacion despues de cada fila.

### Posicion falsa

- Caso recomendado:
  - usar los mismos datos que secante.
- Comparar:
  - confirmar que la primera fila aparece antes del ciclo.
  - confirmar que `xActual` queda fijo.
  - confirmar si el mensaje final reporta el contador interno o el numero visible de fila.

### Steffensen

- Caso recomendado:
  - `g(x) = cos(x)`
  - `Po = 0.5`
  - `Tolerancia = 0.0001`
  - `maxIteracion = 20`
- Comparar:
  - `Po`, `P1`, `P2`, `p`, `Error`.

### Newton

- Caso recomendado:
  - `f(x) = x^3 - x - 2`
  - `Po = 1.5`
  - `Tolerancia = 0.0001`
  - `maxIteracion = 20`
- Comparar:
  - `Po`, `P1`, `Error`.
  - derivada con `h = 0.1`.
- Caso extra:
  - probar formula con `pi` o `e` para decidir si el Excel falla o si `Evaluate` resuelve algo por su cuenta.

### Muller

- Caso recomendado:
  - `f(x) = x^3 - x - 2`
  - `x0 = 0`
  - `x1 = 1`
  - `x2 = 2`
  - `Tolerancia = 0.0001`
  - `maxIteracion = 20`
- Comparar:
  - `x0`, `x1`, `x2`, `p`, `f(x0)`, `f(x1)`, `f(x2)`, `f(p)`, `Abs(h)`.
- Caso extra:
  - datos que generen discriminante negativo.

### Lagrange

- Caso recomendado:
  - `maxN = 2`
  - `Po = 1.5`
  - puntos: `(0, 1)`, `(1, 3)`, `(2, 2)`.
- Comparar:
  - `C11`: polinomio simbolico.
  - `C13`: polinomio con nodos sustituidos.
  - `C15`: polinomio con `Po` sustituido.
  - `C17`: aproximacion numerica directa.
- Nota:
  - aqui la app TS todavia requiere ajuste para mostrar igual que Excel.

### Diferencias divididas / regresivas

- Caso recomendado:
  - `cantidad = 3`
  - `dai = 1.5`
  - puntos: `(0, 1)`, `(1, 3)`, `(2, 2)`.
- Comparar:
  - tabla `B14:G18`.
  - salidas `B21:B22` y `B25:B26`.
- Casos extra:
  - repetir con `cantidad = 2`, `4` y `5`.

### Jacobi

- Caso recomendado 3x3:
  - sistema diagonalmente dominante.
  - iniciales en cero.
  - tolerancia `0.0001`.
  - max `25`.
- Comparar:
  - filas A:H para 3x3.
  - no debe existir fila inicial.
  - `Error` debe ser maximo de `E1..E3`.
- Caso extra:
  - 6x6 para confirmar el bug del coeficiente de `x6`.

### Gauss-Seidel

- Caso recomendado 3x3:
  - mismo sistema que Jacobi.
- Comparar:
  - filas A:H para 3x3.
  - uso secuencial de `Vs1`, `Vs2`, etc.
  - `Error` maximo.
- Caso extra:
  - 6x6 para confirmar el mismo bug del coeficiente de `x6`.

### Punto fijo no lineal

- Caso recomendado 2D:
  - `g1`, `g2` simples que converjan.
  - dejar `x3 inicial` vacio.
- Comparar:
  - fila inicial 0 en fila 11.
  - `x3`, `E3` como `---`.
  - actualizacion simultanea.
- Caso recomendado 3D:
  - agregar `g3` y `x3 inicial`.
  - confirmar que calcula `Vs3`, `E3` y el maximo.

## Orden recomendado manana

1. Probar primero Biseccion, Secante, Newton y Punto fijo porque son los mas faciles de validar.
2. Luego Muller y Posicion falsa por quirks.
3. Luego Lagrange y Diferencias porque tienen salidas de texto/polinomio.
4. Cerrar con Jacobi, Gauss-Seidel y Punto fijo NL.

## Criterio para marcar paridad

- `Paridad verde`: mismo numero de filas, mismas columnas, mismos valores dentro de tolerancia y mismo criterio de paro.
- `Paridad amarilla`: calculo coincide, pero texto, conteo visible o salida secundaria difiere.
- `Paridad roja`: difiere una fila numerica, condicion de paro o actualizacion de variables.
