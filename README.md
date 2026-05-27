# Metodos numericos

App web para reemplazar una plantilla Excel con macros VBA de metodos numericos.

El proyecto busca conservar la logica historica del Excel, pero con una interfaz mas comoda, oscura y tipo spreadsheet moderno.

## Que hace

La app permite calcular metodos numericos en tres modos:

- `Excel 1:1`: replica la logica extraida del VBA del Excel original.
- `Moderno`: usa implementaciones TypeScript mas robustas.
- `Comparacion`: muestra ambos calculos por iteracion para ver diferencias.

## Metodos incluidos

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

## Stack

- React
- TypeScript
- Vite
- Bun
- Tailwind CSS 4
- mathjs
- lucide-react

## Excel fuente

El Excel original se conserva en la raiz:

```txt
PLANTILLA DE METODOS NUMERICOS_office 2007.xlsm
```

Ese archivo contiene las macros VBA usadas como fuente de verdad para el modo `Excel 1:1`.

## Extraccion VBA

La extraccion se realizo con `oletools/olevba` usando un script local:

```txt
tools/extract_vba_analysis.py
```

Los resultados quedaron en:

```txt
analysis/
```

`analysis/` esta ignorado por git porque contiene artefactos locales de extraccion, pero es importante para auditoria.

## Estructura principal

```txt
src/
  App.tsx
  components/
  lib/
    math/
      excel/
      modern/
    shared/
    solvers/
  ui/

docs/
tools/
CHECKLIST_VBA_TS.md
```

## Motores numericos

Las replicas del Excel viven en:

```txt
src/lib/math/excel/
```

Las versiones modernas viven en:

```txt
src/lib/math/modern/
```

La evaluacion de formulas esta en:

```txt
src/lib/shared/evaluate.ts
```

## Documentacion de auditoria

- `CHECKLIST_VBA_TS.md`: estado de paridad VBA vs TypeScript.
- `docs/vba-extraction-pass-2026-05-26.md`: celdas, columnas, criterios de paro y quirks extraidos.
- `docs/excel-vs-ts-test-plan.md`: plan para comparar contra el Excel real.
- `src/lib/math/excel/parity.ts`: mapa estructurado de paridad por metodo.

## UI actual

La interfaz esta en espanol, modo oscuro y orientada a escritorio.

Orden visual:

```txt
Header
Inputs
Tabla / resultados
Tabs de metodos
```

En modo comparacion, cada celda muestra:

- valor Excel en verde.
- valor moderno en morado.
- diferencia numerica abajo.

Las tablas tienen scroll horizontal interno para no causar overflow de la pagina.

## Comandos

El usuario ejecuta los comandos del proyecto:

```bash
bun install
bun run dev
bun run build
bun run lint
```

## Estado del proyecto

El proyecto esta en etapa de replica/auditoria.

La UI ya tiene una base usable. El siguiente paso importante es validar las implementaciones `Excel 1:1` contra corridas reales del Excel original y crear fixtures.

Pendientes principales:

- Crear fixtures reales desde el Excel.
- Ajustar Lagrange modo Excel para devolver salidas tipo polinomio/valor como el VBA.
- Ajustar Punto Fijo NL para detectar 2D/3D exactamente como el VBA.
- Revisar Newton con `pi`/`e` contra Excel real.
- Validar Muller con discriminante negativo.
- Comparar todos los metodos fila por fila contra fixtures del Excel.
