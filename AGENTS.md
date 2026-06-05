# AGENTS.md

Instrucciones para agentes de codigo que trabajen en este repo.

## Regla de tests y comandos

No ejecutar automaticamente:

- `bun run dev`
- `bun run build`
- `bun run lint`
- tests
- instalaciones

El usuario ejecuta comandos del proyecto. Si necesitas verificar algo, pide al usuario que ejecute el comando y comparta la salida.

Comandos disponibles para el usuario:

```bash
bun install
bun run dev
bun run build
bun run lint      # alias de biome check
bun run check
bun run check:fix
bun run format
bun test
```

## Prioridad del proyecto

La prioridad tecnica es paridad contra el Excel original.

No optimices ni "corrijas" el modo `Excel 1:1` sin revisar primero el VBA extraido. Muchos comportamientos raros son intencionales porque replican bugs o quirks del Excel.

## Archivos fuente de verdad

Excel original:

```txt
PLANTILLA DE METODOS NUMERICOS_office 2007.xlsm
```

VBA extraido:

```txt
analysis/vba-modules/
```

Documentacion de auditoria:

```txt
CHECKLIST_VBA_TS.md
docs/vba-extraction-pass-2026-05-26.md
docs/excel-vs-ts-test-plan.md
src/lib/math/excel/parity.ts
```

## No modificar

- No modificar el `.xlsm` original.
- No borrar `analysis/`.
- No revertir cambios del usuario.
- No meter fixtures inventados; los fixtures deben venir de corridas reales del Excel.

## Organizacion esperada

Mantener implementaciones separadas:

```txt
src/lib/math/excel/
src/lib/math/modern/
```

Cada carpeta debe tener archivos por metodo.

Helpers compartidos aceptables:

```txt
src/lib/shared/
src/lib/solvers/
```

Usar helpers compartidos solo si no ocultan demasiado la paridad del metodo.

## UI esperada

La UI debe mantenerse:

- en espanol.
- modo oscuro.
- estilo spreadsheet moderno.
- desktop-first.
- sin sidebar lateral.
- tabs de metodos abajo.
- header compacto arriba.
- inputs arriba de resultados.
- tablas autocontenidas con scroll horizontal interno.

Orden visual actual:

```txt
Header
Inputs
Tabla / resultados
Tabs de metodos
```

## Modo comparacion

La tabla de comparacion debe mostrar valores apilados dentro de la misma celda:

- verde: Excel 1:1.
- morado: Moderno.
- linea inferior: diferencia numerica.

No repetir etiquetas `Excel`, `Moderno` o `Delta` dentro de cada celda. Para eso esta la leyenda.

## Quirks que no deben perderse

- Biseccion exige cambio de signo estricto.
- Biseccion usa `ba = (b-a)/2` sin `Abs`.
- Posicion falsa replica una variante tipo secante, no regula falsi clasica.
- Newton usa derivada progresiva fija con `h=0.1`.
- Newton tiene un intento roto de reemplazar `e/pi`.
- Lagrange usa `maxN` como grado y consume `maxN + 1` puntos.
- Diferencias divididas tiene bug en salida regresiva: evalua valor progresivo.
- Jacobi/Gauss-Seidel 6x6 usan el termino independiente como coeficiente de `x6` en la primera ecuacion.
- Punto fijo no lineal decide 2D/3D por si el valor inicial `x3` esta vacio.
- Punto fijo no lineal usa actualizacion simultanea.

## Siguiente trabajo recomendado

1. Validar Biseccion, Punto fijo, Secante y Newton contra Excel real.
2. Crear fixtures reales con las tablas copiadas del Excel.
3. Ajustar Lagrange Excel mode.
4. Ajustar Punto Fijo NL 2D/3D.
5. Validar Muller con discriminante negativo.

## Estilo de cambios

- Preferir cambios pequenos y auditables.
- Mantener componentes separados.
- Evitar monolitos.
- Usar TypeScript explicito donde ayude a prevenir errores.
- No cambiar el diseno general sin pedir confirmacion.
