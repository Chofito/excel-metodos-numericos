# Pasada de extraccion VBA - 2026-05-26

Objetivo: capturar todo lo util del VBA extraido para poder comparar manana la app TypeScript contra el Excel real.

Fuente primaria: `analysis/vba-modules/`.

No se modifico el `.xlsm` original.

## Convenciones comunes detectadas

- Los metodos escalares evaluan formulas con `Evaluate`.
- Casi todos hacen reemplazo textual:
  - `Replace(Ecuacion, "x", X)`
  - remover espacios
  - normalizar `--`, `+-`, `-+`
- Los metodos recursivos incrementan `nIteracion` al inicio del procedimiento.
- Las tablas no se escriben desde fila 1; usan una variable `Fila` y desplazan por `Fila + nIteracion`.
- Las condiciones de paro generalmente usan:
  - fallo si `nIteracion >= maxIteracion`
  - exito si `Error < Tolerancia` o `Error <= Tolerancia`, segun metodo
- El valor visible de error en sistemas es el maximo de errores absolutos por variable.

## Biseccion

- Modulo: `biseccion_AR.bas`.
- Macro inicial: `inicio_biseccion`.
- Procedimiento iterativo: `biseccion_AR`.
- Funcion: `f(X)`.
- Entradas:
  - `f(x)`: `Cells(2, 7)`
  - `a`: `Cells(3, 7)`
  - `b`: `Cells(4, 7)`
  - `Tolerancia`: `Cells(5, 7)`
  - `n`: `Cells(6, 7)`
- Limpieza: `Range("B9:J109")`.
- Fila base: `Fila = 8`.
- Columnas escritas:
  - B: `nIteracion`
  - C: `a`
  - D: `b`
  - E: `p`
  - F: `f(a)`
  - G: `f(b)`
  - H: `f(p)`
  - I: `f(a) * f(p)`
  - J: `ba`
- Formula:
  - `ba = (b - a) / 2`
  - `p = a + ba`
- Validacion inicial:
  - acepta solo si `f(a) < 0 And f(b) > 0 Or f(a) > 0 And f(b) < 0`.
  - no acepta raices exactas en endpoints como intervalo valido.
- Paro:
  - exito si `(ba < Tolerancia) Or (f(p) = 0)`.
  - si no, actualiza `a = p` cuando `f(a) * f(p) > 0`, si no `b = p`.

## Punto fijo

- Modulo: `puntofijo_AR.bas`.
- Macro inicial: `inicio_puntofijo`.
- Procedimiento iterativo: `puntofijo`.
- Funcion: `g(X)`.
- Entradas:
  - `g(x)`: `Cells(3, 6)`
  - `Po`: `Cells(4, 6)`
  - `Tolerancia`: `Cells(5, 6)`
  - `maxIteracion`: `Cells(6, 6)`
- Limpieza: `Range("B9:E108")`.
- Fila base: `Fila = 8`.
- Columnas escritas:
  - B: `nIteracion`
  - C: `Po`
  - D: `P1`
  - E: `Error`
- Formula:
  - `P1 = g(Po)`
  - `Error = Abs(P1 - Po)`
- Paro:
  - exito si `Error < Tolerancia`.
  - actualiza `Po = P1`.

## Secante

- Modulo: `secante_AR.bas`.
- Macro inicial: `inicio_secante`.
- Procedimiento iterativo: `Secante`.
- Funcion: `f(X)`.
- Entradas:
  - `f(x)`: `Cells(2, 5)`
  - `xAnterior`: `Cells(3, 5)`
  - `xActual`: `Cells(4, 5)`
  - `Tolerancia`: `Cells(5, 5)`
  - `maxIteracion`: `Cells(6, 5)`
- Limpieza: `Range("B9:F109")`.
- Fila base: `Fila = 8`.
- Columnas escritas:
  - B: `nIteracion`
  - C: `xAnterior`
  - D: `xActual`
  - E: `xSiguiente`
  - F: `Error`
- Formula:
  - `xSiguiente = xActual - f(xActual) * (xActual - xAnterior) / (f(xActual) - f(xAnterior))`
  - `Error = Abs(xSiguiente - xActual)`
- Paro:
  - si `Error > Tolerancia`, sigue.
  - exito si `Error <= Tolerancia`.
  - actualiza `xAnterior = xActual`, `xActual = xSiguiente`.

## Posicion falsa

- Modulo: `posicionfalsa_AR.bas`.
- Macro inicial: `inicio_posicionfalsa`.
- Procedimiento iterativo: `PosicionFalsa`.
- Funcion: `f(X)`.
- Entradas:
  - `f(x)`: `Cells(2, 5)`
  - `xAnterior`: `Cells(3, 5)`
  - `xActual`: `Cells(4, 5)`
  - `Tolerancia`: `Cells(5, 5)`
  - `maxIteracion`: `Cells(6, 5)`
- Limpieza: `Range("B9:F109")`.
- Quirk principal:
  - no es regula falsi clasica.
  - calcula una primera fila tipo secante dentro de `ParametrosIniciales`.
  - deja `xActual` fijo y reemplaza `xAnterior` por el nuevo resultado.
- Primera fila:
  - B9: `1`
  - C9: `xAnterior`
  - D9: `xActual`
  - E9: `xSiguiente1`
  - F9: `Abs(xActual - xSiguiente1)`
- Fila base despues de primera fila: `Fila = 9`.
- Iteracion:
  - `nIteracion = nIteracion + 1`
  - `xSiguiente2 = xActual - f(xActual) * (xActual - xAnterior) / (f(xActual) - f(xAnterior))`
  - `Error = Abs(xAnterior - xSiguiente2)`
  - escribe numero visible `nIteracion + 1`.
- Paro:
  - si `Error > Tolerancia`, sigue.
  - exito si `Error <= Tolerancia`.
- Brecha TS:
  - la logica numerica esta replicada.
  - falta decidir si el mensaje de exito debe usar el contador interno exacto del VBA.

## Steffensen

- Modulo: `steffenssen_AR.bas`.
- Macro inicial: `inicio_steffenssen`.
- Procedimiento iterativo: `Steffensen_AR`.
- Funcion: `g(X)`.
- Entradas:
  - `g(x)`: `Cells(2, 5)`
  - `Po`: `Cells(3, 5)`
  - `Tolerancia`: `Cells(4, 5)`
  - `maxIteracion`: `Cells(5, 5)`
- Limpieza: `Range("B8:D108")`, aunque `limpiar` borra `B8:G109`.
- Fila base: `Fila = 7`.
- Columnas escritas:
  - B: `nIteracion`
  - C: `Po`
  - D: `P1`
  - E: `P2`
  - F: `p`
  - G: `Error`
- Formula:
  - `P1 = g(Po)`
  - `P2 = g(P1)`
  - `p = Po - ((P1 - Po) ^ 2) / (P2 - 2 * P1 + Po)`
  - `Error = Abs(p - Po)`
- Paro:
  - exito si `Error < Tolerancia`.
  - actualiza `Po = p`.

## Newton

- Modulo: `newton_AR.bas`.
- Macro inicial: `inicio_newton`.
- Procedimiento iterativo: `Newton`.
- Funcion: `f(X)`.
- Entradas:
  - `f(x)`: `Cells(2, 5)`
  - `Po`: `Cells(4, 5)`
  - `Tolerancia`: `Cells(5, 5)`
  - `maxIteracion`: `Cells(6, 5)`
- Limpieza: `Range("B9:G109")`, aunque `limpiar` borra `B9:E109`.
- Fila base: `Fila = 8`.
- Columnas escritas:
  - B: `nIteracion`
  - C: `Po`
  - D: `P1`
  - E: `Error`
- Derivada:
  - `h = 0.1`.
  - `(-25*f(Po) + 48*f(Po + 0.1) - 36*f(Po + 2*0.1) + 16*f(Po + 3*0.1) - 3*f(Po + 4*0.1)) / (12*0.1)`.
- Formula:
  - `P1 = Po - f(Po) / derivada`
  - `Error = Abs(P1 - Po)`
- Paro:
  - exito si `Error < Tolerancia`.
- Quirk:
  - el codigo intenta reemplazar `e` y `pi`, pero sobrescribe `Formula` despues. Ese reemplazo no queda aplicado.

## Muller

- Modulo: `muller_AR.bas`.
- Macro inicial: `PrincipalMuller`.
- Procedimiento iterativo: `Muller`.
- Funcion: `f(X)`.
- Entradas:
  - `f(x)`: `Cells(2, 5)`
  - `x0`: `Cells(3, 5)`
  - `x1`: `Cells(4, 5)`
  - `x2`: `Cells(5, 5)`
  - `Tolerancia`: `Cells(6, 5)`
  - `maxIteracion`: `Cells(7, 5)`
- Limpieza: `Range("B10:D110")`, aunque `limpiar_muller` borra `B10:L109`.
- Fila base: `Fila = 9`.
- Columnas escritas:
  - B: `nIteracion`
  - C: `x0`
  - D: `x1`
  - E: `x2`
  - F: `p`
  - G: `f(x0)`
  - H: `f(x1)`
  - I: `f(x2)`
  - J: `f(p)`
  - K: `Abs(h)`
- Formula:
  - `h1 = x1 - x0`
  - `h2 = x2 - x1`
  - `g1 = (f(x1) - f(x0)) / h1`
  - `g2 = (f(x2) - f(x1)) / h2`
  - `d = (g2 - g1) / (h1 + h2)`
  - `b = g2 + h2 * d`
  - `DD = (b ^ 2 - 4 * f(x2) * d) ^ (1 / 2)`
  - si `Abs(b - DD) < Abs(b + DD)`, denominador = `b + DD`, si no `b - DD`.
  - `h = (-2 * f(x2)) / denominador`
  - `p = x2 + h`
- Paro:
  - si `Abs(h) > Tolerancia`, sigue.
  - exito si `Abs(h) <= Tolerancia`.
- Pendiente:
  - verificar como Excel/VBA maneja `DD` complejo en la practica.

## Lagrange

- Modulo: `lagrange_AR.bas`.
- Macro inicial: `PrincipalLagrange`.
- Procedimiento: `Lagrange`.
- Entradas:
  - `maxN` o grado: `Cells(3, 4)`
  - `Po`: `Cells(4, 4)`
  - `x_i`: fila 8 desde columna C, con indice 0 en `Cells(8, 3)`
  - `f(x_i)`: fila 9 desde columna C, con indice 0 en `Cells(9, 3)`
- Limpieza: `Range("C11:C13")`.
- Salidas:
  - `Cells(11, 3)`: `P(x) = ...` simbolico con `x0`, `x1`, ...
  - `Cells(13, 3)`: `P(x) = ...` con nodos sustituidos.
  - `Cells(15, 3)`: `P(x) = ...` con `x = Po`.
  - `Cells(17, 3)`: aproximacion directa para grados 1, 2 y 3.
- Quirks:
  - `maxN` es grado, no cantidad de puntos; se itera `For kL = 0 To maxN`, por lo que usa `maxN + 1` puntos.
  - `Lnx` arma strings con un `*` sobrante que despues limpia usando `Replace(Polinomio, "*)", ")")`.
  - Hay un bloque final que recalcula para `i = 0 To 4`, pero sus salidas estan comentadas.
- Brecha TS:
  - el TS actual usa tabla de bases `L_i(x)`.
  - para modo Excel debe cambiar a filas `Salida` / `Valor` que reflejen `C11`, `C13`, `C15`, `C17`.

## Diferencias divididas / regresivas

- Modulo: `diferencias_AR.bas`.
- Macro inicial: `PrincipalDiferenciasDivididas`.
- Procedimientos: `ParametrosIniciales`, `DiferenciasDivididas`, `EscribeSolucion`.
- Entradas:
  - cantidad de puntos: `Cells(3, 6)`, valores 2..5.
  - valor a evaluar `dai`: `Cells(4, 6)`.
  - `x_i`: fila 8 desde columna C.
  - `f(x_i)`: fila 9 desde columna C.
- Limpieza: `Range("B14:g18")`.
- Tabla:
  - B14:B18: `x0..x4`
  - C14:C18: `fx0..fx4`
  - D15:D18: primer orden
  - E16:E18: segundo orden
  - F17:F18: tercer orden
  - G18: cuarto orden
- Salidas de texto:
  - progresivas: `Cells(25, 2)` y `Cells(26, 2)`
  - regresivas: `Cells(21, 2)` y `Cells(22, 2)`
- Quirks:
  - aunque arma `Valorsolucionr1`, evalua `ValorSolucion1` para ambos `Pox` y `Pox1`.
  - por eso el valor mostrado en regresivas/progresivas termina siendo el mismo valor progresivo.
  - en 3 puntos, `Valorsolucionr1` mezcla `fx0` con terminos regresivos, pero no impacta el resultado mostrado porque no se evalua.
- Brecha TS:
  - el modo TS moderno puede mantener una evaluacion regresiva real.
  - el modo Excel debe mantener el bug de mostrar valor progresivo en ambos bloques si exponemos ambas salidas.

## Jacobi

- Modulo: `Hoja14.cls`.
- Macros iniciales:
  - 3x3: `PrincipalJacobi`
  - 4x4: `PrincipalJacobi_4`
  - 5x5: `PrincipalJacobi_5`
  - 6x6: `PrincipalJacobi_6`
- Entradas:
  - 3x3:
    - matriz: filas 6..8, columnas C..E.
    - vector b: columna F.
    - iniciales: `C10:C12`.
    - max: `H10`, tolerancia: `H12`.
  - 4x4:
    - matriz: filas 4..7, columnas M..P.
    - vector b: columna Q.
    - iniciales: `R9:R12`.
    - max: `O9`, tolerancia: `O11`.
  - 5x5:
    - matriz: filas 3..7, columnas Y..AC.
    - vector b: columna AD.
    - iniciales: `AE9:AE13`.
    - max: `AB9`, tolerancia: `AB11`.
  - 6x6:
    - matriz: filas 4..9, columnas AM..AR.
    - vector b: columna AS.
    - iniciales: `AN11:AN16`.
    - max: `AS11`, tolerancia: `AS14`.
- Tabla:
  - escribe desde una fila base sin fila inicial.
  - columnas visibles: `nIteracion`, `x1..xn`, `E1..En`, `Error`.
- Formula:
  - Jacobi puro: todas las `Vs` se calculan con los `V` anteriores.
  - `Error` es maximo de `E1..En`.
- Paro:
  - si `Error > Tolerancia`, sigue.
  - exito si `Error <= Tolerancia`.
- Quirk 6x6:
  - `Vs1` usa `Cells(4,45) * V6`; `Cells(4,45)` es tambien el termino independiente, no el coeficiente real de `x6`.

## Gauss-Seidel

- Modulo: `Hoja15.cls`.
- Macros iniciales:
  - 3x3: `Principalgaussseidel_3g`
  - 4x4: `Principalgaussseidel_4g`
  - 5x5: `Principalgaussseidel_5g`
  - 6x6: `Principalgaussseidel_6g`
- Entradas:
  - mismas zonas que Jacobi por dimension.
- Tabla:
  - igual estructura que Jacobi.
- Formula:
  - Gauss-Seidel clasico: usa `Vs1`, `Vs2`, etc. ya calculados dentro de la misma iteracion.
  - `Error` es maximo de `E1..En`.
- Paro:
  - si `Error > Tolerancia`, sigue.
  - exito si `Error <= Tolerancia`.
- Quirk 6x6:
  - igual que Jacobi, `Vs1` usa el termino independiente como coeficiente de `x6`.

## Punto fijo no lineal

- Modulo: `Hoja16.cls`.
- Macro inicial: `PrincipalPuntoFijoNL`.
- Procedimiento iterativo: `PuntoFijoNL`.
- Funcion: `f(x1, x2, x3, i)`.
- Entradas:
  - `g1`: `Cells(2, 3)`
  - `g2`: `Cells(3, 3)`
  - `g3`: `Cells(4, 3)`, si aplica
  - `x1 inicial`: `Cells(6, 3)`
  - `x2 inicial`: `Cells(7, 3)`
  - `x3 inicial`: `Cells(8, 3)`, si no esta vacia
  - `maxIteracion`: `Cells(7, 7)`
  - `Tolerancia`: `Cells(8, 7)`
- Limpieza: `Range("B13:I113")`, aunque `limpiar_PFNL` borra `B11:I78`.
- Fila base: `Fila = 10`.
- Fila inicial:
  - siempre escribe iteracion `0` en fila 11.
  - valores iniciales en columnas C, D y opcional E.
  - errores como `"---"`.
- Evaluacion:
  - reemplaza `x1`, `x2`, `x3`, `Pi`.
  - limpia espacios y signos.
  - usa `Evaluate`.
- Formula:
  - `Vs1 = f(V1, V2, V3, 1)`
  - `Vs2 = f(V1, V2, V3, 2)`
  - si `Cells(8,3)` no esta vacia: `Vs3 = f(V1, V2, V3, 3)`
  - actualizacion simultanea.
- Error:
  - `E1 = Abs(Vs1 - V1)`
  - `E2 = Abs(Vs2 - V2)`
  - `E3 = Abs(Vs3 - V3)`
  - `Error` es maximo de esos errores.
- Paro:
  - si `Error > Tolerancia`, sigue.
  - exito si `Error <= Tolerancia`.
- Brecha TS:
  - ajustar deteccion 2D/3D para depender del valor inicial `x3`, no de cuantas ecuaciones no vacias existan.

## Hallazgos para implementar despues

1. Lagrange Excel mode debe cambiar de tabla de bases a salidas tipo `C11`, `C13`, `C15`, `C17`.
2. Punto fijo NL debe decidir 2D/3D por `x3` inicial.
3. Newton Excel mode debe decidir si `pi`/`e` deben fallar como en Excel o si el motor TS tolera esos simbolos por mathjs.
4. Posicion falsa debe revisar texto/contador de exito si buscamos paridad textual.
5. Diferencias divididas debe exponer, si se desea, tanto el texto progresivo como el regresivo bugueado del VBA.
6. Los sistemas ya tienen confirmada la ausencia de fila inicial en Jacobi/Gauss-Seidel y el error maximo absoluto.
