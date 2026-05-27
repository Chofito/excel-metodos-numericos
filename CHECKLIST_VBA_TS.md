# Checklist VBA vs TypeScript

Este checklist compara los metodos extraidos del Excel con la reimplementacion TypeScript actual.

Leyenda:

- `[x]` Implementado en TS.
- `[~]` Implementado, pero requiere auditoria fina contra fixtures del Excel.
- `[ ]` Pendiente de ajustar para paridad 1:1.
- `Paridad alta`: estructura, entradas, columnas y quirks principales ya estan reflejados.
- `Paridad parcial`: el metodo calcula, pero falta replicar algun detalle visible del VBA.

## Resumen

| Metodo | VBA fuente | TS Excel | TS moderno | Estado |
|---|---|---|---|---|
| Biseccion | `biseccion_AR.bas` | `src/lib/math/excel/bisection.ts` | `src/lib/math/modern/bisection.ts` | `[x] Paridad alta` |
| Punto fijo | `puntofijo_AR.bas` | `src/lib/math/excel/fixedPoint.ts` | `src/lib/math/modern/fixedPoint.ts` | `[x] Paridad alta` |
| Secante | `secante_AR.bas` | `src/lib/math/excel/secant.ts` | `src/lib/math/modern/secant.ts` | `[x] Paridad alta` |
| Posicion falsa | `posicionfalsa_AR.bas` | `src/lib/math/excel/falsePosition.ts` | `src/lib/math/modern/falsePosition.ts` | `[x] Paridad alta con quirk` |
| Steffensen | `steffenssen_AR.bas` | `src/lib/math/excel/steffensen.ts` | `src/lib/math/modern/steffensen.ts` | `[x] Paridad alta` |
| Newton | `newton_AR.bas` | `src/lib/math/excel/newton.ts` | `src/lib/math/modern/newton.ts` | `[x] Paridad alta` |
| Muller | `muller_AR.bas` | `src/lib/math/excel/muller.ts` | `src/lib/math/modern/muller.ts` | `[~] Paridad parcial` |
| Lagrange | `lagrange_AR.bas` | `src/lib/math/excel/lagrange.ts` | `src/lib/math/modern/lagrange.ts` | `[ ] Pendiente de ajuste 1:1` |
| Regresivas / Diferencias divididas | `diferencias_AR.bas` | `src/lib/math/excel/dividedDifferences.ts` | `src/lib/math/modern/dividedDifferences.ts` | `[~] Paridad parcial` |
| Jacobi | `Hoja14.cls` | `src/lib/math/excel/jacobi.ts` | `src/lib/math/modern/jacobi.ts` | `[~] Paridad parcial` |
| Gauss-Seidel | `Hoja15.cls` | `src/lib/math/excel/gaussSeidel.ts` | `src/lib/math/modern/gaussSeidel.ts` | `[~] Paridad parcial` |
| Punto fijo NL | `Hoja16.cls` | `src/lib/math/excel/nonlinearFixedPoint.ts` | `src/lib/math/modern/nonlinearFixedPoint.ts` | `[~] Paridad parcial` |

## Detalle por metodo

### Biseccion

- Estado: `[x] Paridad alta`.
- Entradas VBA: `f(x)`, `a`, `b`, `Tolerancia`, `n`.
- Columnas Excel replicadas: `nIteracion`, `a`, `b`, `p`, `f(a)`, `f(b)`, `f(p)`, `f(a)f(p)`, `ba`.
- Quirks replicados:
  - El Excel exige cambio de signo estricto; si `f(a)=0` o `f(b)=0`, no lo acepta como intervalo valido.
  - El criterio Excel usa `ba < Tolerancia` o `f(p) = 0`.
  - `ba` se calcula como `(b-a)/2`, sin `Abs`.
- Pendiente:
  - Crear fixture con una corrida real del Excel para comparar fila por fila.

### Punto fijo

- Estado: `[x] Paridad alta`.
- Entradas VBA: `g(x)`, `Po`, `Tolerancia`, `maxIteracion`.
- Columnas Excel replicadas: `nIteracion`, `Po`, `P1`, `Error`.
- Quirks replicados:
  - El modo Excel evalua con reemplazo textual ingenuo.
  - El criterio Excel usa `Error < Tolerancia`.
- Pendiente:
  - En UI, conviene ocultar o separar `f(x)` cuando se esta en modo Excel, porque el VBA de punto fijo solo necesita `g(x)`.

### Secante

- Estado: `[x] Paridad alta`.
- Entradas VBA: `f(x)`, `xAnterior`, `xActual`, `Tolerancia`, `maxIteracion`.
- Columnas Excel replicadas: `nIteracion`, `xAnterior`, `xActual`, `xSiguiente`, `Error`.
- Quirks replicados:
  - Primero escribe la fila y luego actualiza `xAnterior = xActual`, `xActual = xSiguiente`.
  - El criterio Excel usa `Error <= Tolerancia`.
- Pendiente:
  - Fixture de comparacion con denominador normal y caso cercano a division por cero.

### Posicion falsa

- Estado: `[x] Paridad alta con quirk`.
- Entradas VBA: `f(x)`, `xAnterior`, `xActual`, `Tolerancia`, `maxIteracion`.
- Columnas Excel replicadas: `nIteracion`, `xAnterior`, `xActual`, `xSiguiente`, `Error`.
- Quirks replicados:
  - El VBA no implementa regula falsi clasica.
  - La version Excel actual replica la variante tipo secante: calcula una primera fila, mantiene `xActual` fijo y va sustituyendo `xAnterior`.
  - La primera fila se escribe dentro de `ParametrosIniciales`, antes de reiniciar `nIteracion`.
- Pendiente:
  - Ajustar el mensaje de exito si queremos imitar el texto exacto: el VBA reporta `nIteracion`, aunque la fila visible puede ir una posicion adelante.

### Steffensen

- Estado: `[x] Paridad alta`.
- Entradas VBA: `g(x)`, `Po`, `Tolerancia`, `maxIteracion`.
- Columnas Excel replicadas: `nIteracion`, `Po`, `P1`, `P2`, `p`, `Error`.
- Quirks replicados:
  - Usa `p = Po - ((P1-Po)^2)/(P2-2*P1+Po)`.
  - El criterio Excel usa `Error < Tolerancia`.
- Pendiente:
  - Fixture con denominador no cero y fixture con denominador cero para confirmar comportamiento visible.

### Newton

- Estado: `[x] Paridad alta`.
- Entradas VBA: `f(x)`, `Po`, `Tolerancia`, `maxIteracion`.
- Columnas Excel replicadas: `nIteracion`, `Po`, `P1`, `Error`.
- Quirks replicados:
  - La derivada Excel usa diferencia progresiva fija:
    `(-25f(x)+48f(x+h)-36f(x+2h)+16f(x+3h)-3f(x+4h))/(12h)`.
  - El `h` del VBA es fijo: `0.1`.
  - El criterio Excel usa `Error < Tolerancia`.
- Quirk detectado:
  - El VBA intenta reemplazar `e` y `pi`, pero lo hace antes de cargar la ecuacion en `Formula`; despues sobrescribe `Formula` con `Replace(Ecuacion, "x", X)`. En la practica esos reemplazos se pierden.
- Pendiente:
  - Fixture fila por fila para confirmar redondeo/precision de `Evaluate`.

### Muller

- Estado: `[~] Paridad parcial`.
- Entradas VBA: `f(x)`, `x0`, `x1`, `x2`, `Tolerancia`, `maxIteracion`.
- Columnas Excel replicadas: `nIteracion`, `x0`, `x1`, `x2`, `p`, `f(x0)`, `f(x1)`, `f(x2)`, `f(p)`, `Abs(h)`.
- Quirks replicados:
  - Usa la rama real del radical.
  - Si el discriminante produce complejo, se reporta fallo numerico.
- Pendiente:
  - Revisar contra `muller_AR.bas` si el VBA escoge el denominador con la misma comparacion de magnitudes.
  - Confirmar comportamiento del Excel cuando aparecen raices complejas.
  - Fixture de 3 a 5 iteraciones para comparar `p`, `f(p)` y `Abs(h)`.

### Lagrange

- Estado: `[ ] Pendiente de ajuste 1:1`.
- Entradas VBA: `grado/cantidad de puntos`, `Po`, `x_i`, `f(x_i)`.
- Columnas actuales TS: `x_i`, `y_i`, `L_i(x)`, `termino`.
- Diferencia importante:
  - El VBA no produce una tabla iterativa real.
  - `Cells(3,4)` representa `maxN` o grado; el numero de puntos usados es `maxN + 1`.
  - El VBA construye strings de polinomio, sustituye nodos, luego evalua con `Evaluate` y escribe salidas de polinomio/resultado.
  - Para grados 1, 2 y 3 tambien escribe una aproximacion directa en `C17`.
- Ajuste pendiente:
  - El modo Excel debe devolver filas tipo `Salida` / `Valor`, no bases `L_i` como tabla principal.
  - El modo moderno puede conservar la tabla de bases `L_i(x)` porque es mas explicativa.
  - Replicar el orden de sustitucion textual del VBA.

### Regresivas / Diferencias divididas

- Estado: `[~] Paridad parcial`.
- Entradas VBA: `cantidad de puntos 2..5`, `valor a evaluar`, `x_i`, `f(x_i)`.
- Columnas Excel replicadas: `x`, `f[x]`, `orden 1`, `orden 2`, `orden 3`, `orden 4`.
- Quirks replicados:
  - El modo Excel evalua la forma progresiva para el valor final.
- Quirks detectados:
  - El VBA tambien arma texto regresivo, pero por bug evalua `ValorSolucion1` en ambos bloques y muestra el mismo valor progresivo.
  - En el caso de 3 puntos, el texto regresivo usa `fx2`, pero `Valorsolucionr1` empieza con `fx0`; aun asi no se usa para el valor mostrado.
- Pendiente:
  - Confirmar nombres visibles y posicion exacta de columnas contra `diferencias_AR.bas`.
  - Revisar si el Excel espera puntos ordenados de alguna forma especifica.
  - Fixture para `n=2`, `n=3`, `n=4` y `n=5`.

### Jacobi

- Estado: `[~] Paridad parcial`.
- Entradas VBA: `dimension 3..6`, matriz `A`, vector `b`, vector inicial, `Tolerancia`, `maxIteracion`.
- Columnas replicadas: `nIteracion`, `x1..xn`, `E1..En`, `Error`.
- Quirks replicados:
  - Para dimension 6, el VBA usa el termino independiente de la primera ecuacion como coeficiente de `x6` en la primera ecuacion.
- Pendiente:
  - Verificar si el VBA incluye fila inicial o solo empieza en iteracion 1.
  - Confirmar si `Error` es maximo de errores, suma, o ultimo error mostrado.
  - Fixture para dimension 3 y dimension 6.

### Gauss-Seidel

- Estado: `[~] Paridad parcial`.
- Entradas VBA: `dimension 3..6`, matriz `A`, vector `b`, vector inicial, `Tolerancia`, `maxIteracion`.
- Columnas replicadas: `nIteracion`, `x1..xn`, `E1..En`, `Error`.
- Quirks replicados:
  - Para dimension 6, el VBA usa el termino independiente de la primera ecuacion como coeficiente de `x6` en la primera ecuacion.
  - La actualizacion usa los valores nuevos disponibles dentro de la misma iteracion.
- Pendiente:
  - Verificar si el VBA incluye fila inicial o solo empieza en iteracion 1.
  - Confirmar criterio exacto de `Error`.
  - Fixture para dimension 3 y dimension 6.

### Punto fijo NL

- Estado: `[~] Paridad parcial`.
- Entradas VBA: `g1`, `g2`, `g3` opcional, `x1 inicial`, `x2 inicial`, `x3 inicial opcional`, `Tolerancia`, `maxIteracion`.
- Columnas replicadas: `nIteracion`, `x1`, `x2`, `x3`, `E1`, `E2`, `E3`, `Error`.
- Quirks replicados:
  - El modo Excel incluye fila inicial `0` con valores iniciales y `---` en errores.
  - El modo Excel evalua con reemplazo textual de `x1`, `x2`, `x3` y `Pi`.
- Quirks detectados:
  - El VBA decide si el sistema es 2D o 3D revisando si la celda del valor inicial `x3` esta vacia.
  - La actualizacion es simultanea: `Vs1`, `Vs2` y `Vs3` se calculan con `V1`, `V2`, `V3` anteriores.
- Pendiente:
  - Ajustar la deteccion 2D/3D para que siga exactamente la celda usada por el VBA.
  - Fixture 2D y fixture 3D.

## Checklist tecnico transversal

- `[x]` Hay 12 archivos en `src/lib/math/excel/`, uno por metodo pedido.
- `[x]` Hay 12 archivos en `src/lib/math/modern/`, uno por metodo pedido.
- `[x]` Existe mapa de paridad en `src/lib/math/excel/parity.ts`.
- `[x]` Las columnas de iteracion principales estan documentadas por metodo.
- `[x]` El modo Excel usa evaluacion textual compatible con los quirks del VBA.
- `[x]` El modo moderno usa evaluacion por scope con `mathjs`.
- `[~]` Los archivos por metodo todavia delegan parte del cuerpo a solvers compartidos; conviene mover la logica delicada a cada archivo para que la auditoria sea mas facil.
- `[ ]` Faltan fixtures copiados desde corridas reales del Excel.
- `[ ]` Falta comparar fila por fila cada metodo contra esos fixtures.
- `[ ]` Falta decidir redondeo/formato visible si queremos que la tabla sea identica al Excel, no solo numericamente equivalente.

## Prioridad de siguiente ajuste

1. Lagrange: convertir modo Excel a salidas tipo polinomio/valor como el VBA.
2. Punto fijo NL: confirmar 2D/3D y simultaneo/secuencial contra `Hoja16.cls`.
3. Jacobi/Gauss-Seidel: confirmar fila inicial y criterio exacto de error.
4. Muller: confirmar seleccion de denominador y comportamiento complejo.
5. Diferencias divididas: fixtures para 2..5 puntos.
