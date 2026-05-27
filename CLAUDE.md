# CLAUDE.md

Contexto de continuidad para Claude u otra IA conversacional que retome este proyecto.

## Resumen corto

Estamos construyendo una app web para reemplazar un Excel de metodos numericos con macros VBA.

El usuario quiere una app mas comoda que el Excel, pero con una condicion fuerte: el modo `Excel 1:1` debe replicar exactamente los calculos, columnas, inputs y quirks del VBA extraido.

Tambien existe un modo `Moderno` con implementaciones mas sanas y un modo `Comparacion`.

## Preferencias del usuario

- Prefiere ejecutar los comandos el mismo.
- No quiere que la IA corra tests/build/lint/dev server sola.
- Quiere codigo bien organizado, no monolitos.
- Quiere dos familias de math:
  - `excel`
  - `modern`
- Quiere UI en espanol.
- Quiere modo oscuro.
- Quiere estilo spreadsheet moderno, no landing page.
- Quiere tabs de metodos abajo.
- Quiere tablas sin overflow global; el scroll horizontal debe estar dentro del contenedor.

## Estado visual actual

Orden de la pantalla:

```txt
Header
Inputs
Tabla / resultados
Tabs de metodos
```

Header:

- logo/titulo.
- metodo activo y descripcion.
- switch de 3 modos.

Tabs:

- estan abajo.
- solo muestran nombres de metodos.
- no muestran `*_AR`, `.bas`, `Hoja14`, etc.

Comparacion:

- una sola tabla.
- cada celda apila:
  - Excel 1:1 en verde.
  - Moderno en morado.
  - diferencia abajo.
- la leyenda explica los colores.

## Archivos que importan

UI:

```txt
src/App.tsx
src/components/layout/AppHeader.tsx
src/components/layout/InputPanel.tsx
src/components/layout/MethodTabs.tsx
src/components/results/CompareTable.tsx
src/components/results/ResultTable.tsx
src/components/results/SummaryCards.tsx
```

Dominio:

```txt
src/lib/types.ts
src/lib/defaultInput.ts
src/lib/methods.ts
src/lib/runMethod.ts
src/lib/numerics.ts
src/lib/shared/evaluate.ts
```

Math:

```txt
src/lib/math/excel/
src/lib/math/modern/
src/lib/solvers/
```

Auditoria:

```txt
CHECKLIST_VBA_TS.md
docs/vba-extraction-pass-2026-05-26.md
docs/excel-vs-ts-test-plan.md
src/lib/math/excel/parity.ts
```

## Historia de extraccion

Se uso `oletools/olevba` para extraer las macros del Excel:

```txt
PLANTILLA DE METODOS NUMERICOS_office 2007.xlsm
```

Script:

```txt
tools/extract_vba_analysis.py
```

Salida local:

```txt
analysis/
```

`analysis/` esta ignorado por git, pero contiene los modulos VBA extraidos.

## Modulos VBA relevantes

- `biseccion_AR.bas`
- `puntofijo_AR.bas`
- `secante_AR.bas`
- `posicionfalsa_AR.bas`
- `steffenssen_AR.bas`
- `newton_AR.bas`
- `muller_AR.bas`
- `lagrange_AR.bas`
- `diferencias_AR.bas`
- `Hoja14.cls`: Jacobi.
- `Hoja15.cls`: Gauss-Seidel.
- `Hoja16.cls`: Punto fijo no lineal.

## Metodos en scope

1. Biseccion
2. Punto fijo
3. Secante
4. Posicion falsa
5. Steffensen
6. Newton
7. Muller
8. Lagrange
9. Regresivas / diferencias divididas
10. Jacobi
11. Gauss-Seidel
12. Punto fijo no lineal

Neville existe en el Excel extraido, pero esta fuera del v1.

## Paridad actual, lectura honesta

Mejor alineados:

- Biseccion
- Punto fijo
- Secante
- Posicion falsa, con quirk
- Steffensen
- Newton

Todavia delicados:

- Muller
- Lagrange
- Diferencias divididas
- Jacobi
- Gauss-Seidel
- Punto fijo no lineal

El siguiente paso real es comparar contra corridas del Excel.

## Pendientes tecnicos importantes

- Crear fixtures reales desde el Excel.
- Lagrange modo Excel debe devolver salidas tipo `P(x)`/valor como el VBA, no solo tabla de bases.
- Punto Fijo NL debe detectar 2D/3D exactamente como el VBA: por valor inicial `x3` vacio o no.
- Newton con `pi`/`e` debe validarse contra Excel real.
- Muller con discriminante negativo debe validarse contra Excel real.
- Diferencias divididas debe reflejar el bug de salida regresiva si se expone esa salida.

## Recordatorio de quirks

- Biseccion no acepta endpoint raiz como cambio de signo.
- Posicion falsa del VBA no es posicion falsa clasica.
- Newton usa derivada numerica progresiva fija con `h=0.1`.
- El reemplazo de `e/pi` en Newton esta bugueado.
- Jacobi/Gauss-Seidel 6x6 tienen un bug en coeficiente de `x6`.
- Punto fijo no lineal escribe fila inicial 0.

## Como ayudar mejor al usuario

Ser directo, pragmatico y cuidadoso con paridad.

Cuando el usuario pida cambios visuales, implementarlos sin tocar logica numerica salvo que sea necesario.

Cuando el usuario pida cambios de calculo, revisar primero:

1. modulo VBA en `analysis/vba-modules/`.
2. checklist.
3. implementacion TS actual.
4. fixture real si ya existe.

No afirmar que algo es 1:1 si no se comparo contra Excel real.
