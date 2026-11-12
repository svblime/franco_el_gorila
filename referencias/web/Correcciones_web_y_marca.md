# Correcciones · web svblime.cl y sistema de marca

*Revisión del 12-11-2026, sobre el código de la web leído el 02-10-2026 (`referencias/web/site-seo_2026-10-02.jsx`).*

---

## A. Decisiones de marca (definir una vez, aplicar en todo)

| # | Tema | Hoy | Recomendación |
|---|---|---|---|
| 1 | Tipografía de texto | Brandbook: Inter · Web, design system y propuestas: Hanken Grotesk + JetBrains Mono | Quedarse con **Hanken Grotesk + JetBrains Mono** y corregir el brandbook. Es lo que ya está en producción. Ambas son de Google Fonts con licencia libre (OFL); falta verificarlo y anotarlo en el design system. |
| 2 | Negro y blanco base | Brandbook: `#141414` / `#F4F1EA` · Design system: `#000000` (escenario), `#08080A` (página) / `#F4F4F2` | Adoptar los valores del **design system** y actualizar el brandbook. |
| 3 | Nombre de los colores | Amarillo / púrpura (brandbook) · ámbar / violeta (design system) | En textos y documentos: **azul · amarillo · púrpura**. Los nombres de tokens en código (`--svb-amber`, `--svb-violet`) pueden quedar como están. |
| 4 | "Pilares" | Prohibida por regla de marca, pero existe `PillarCard` y el Badge habla de "pilar" | Renombrar a **`ServiceCard`** y cambiar "pilar" por "servicio" en las descripciones. |
| 5 | "360" | En la lista de palabras a evitar, pero usada como keyword SEO | Permitirla **solo** en título, meta descripción y URL de la página SEO. Nunca en copy visible de marca ni como texto oculto. |
| 6 | "No hacemos de todo; hacemos experiencias con propósito." | Abre con negación | Reemplazar por: **"Elegimos hacer experiencias con propósito."** |
| 7 | Nombre del servicio 03 | Web: Producción Integral · Catálogo y design system: Producción de Eventos | Por definir. Si se elige "Producción de Eventos", la URL `/servicios/produccion-integral` puede quedar igual por SEO. |

---

## B. Correcciones en la web

| # | Dónde (línea en el código) | Hoy | Cambiar a |
|---|---|---|---|
| 1 | Bloque de cierre (l. 1120–1121) | Frase oculta "Va más allá de las luces, pantallas y la producción." y frase visible "Lo que merece ser recordado, lo hacemos realidad." | Mostrar la frase vigente completa: **"SVBLIME va más allá de las luces, pantallas y la producción. Aquí, las ideas que merecen ser recordadas se hacen realidad."** |
| 2 | Bloque de cierre (l. 1124) | "Transformamos tus ideas en experiencias que inspiran, conectan e impactan, con un propósito: hacerlas inolvidables." | Frase aprobada: **"Transformamos tus ideas en experiencias visuales que inspiran, conectan e impactan, con un único propósito: hacerlas inolvidables."** |
| 3 | Sección servicios (l. 566) | Eyebrow oculto "Cuatro pilares · una sola dirección" | Borrarlo, o mostrarlo como **"Cuatro servicios · una sola dirección"**. |
| 4 | Cifras (l. 945) | "04 · Pilares bajo una dirección" | **"04 · Servicios bajo una dirección"** |
| 5 | Sección servicios (l. 567–576) | Texto oculto con "Productora 360" (invisible para el visitante, legible para Google) | **Borrarlo.** Google puede penalizar el texto oculto con keywords. El keyword "productora 360" va en el título y la meta descripción de su propia página. |
| 6 | Cifras (l. 947) vs. portafolio (l. 231 y 771) | "65K · Máx. asistentes en un show", pero La Pampilla figura con "+100.000 personas" | Por definir. Si la cifra de La Pampilla es correcta, cambiar la cifra a **"+100K"**. Si no, corregir la ficha de La Pampilla. |
| 7 | Portafolio (l. 217 y 779) | "Alanis Lago" | Unificar con el bloque de artistas: **"Alanis Lagos"** (confirmar la escritura correcta). |
| 8 | Portafolio (l. 786) | "Lara Poyect" | **"Lara Project"** |
| 9 | Portafolio (l. 196, 788 y 790) | "Polima" | **"Polimá"** |

---

## C. Prompt para Claude Design (corrige la web)

Pegar en el proyecto de la web en Claude Design, después de confirmar los puntos A7 y B6:

```
Haz estas correcciones en la web, sin cambiar nada más del diseño:

1. Bloque de cierre: reemplaza la frase grande por "SVBLIME va más allá de las luces, pantallas y la producción. Aquí, las ideas que merecen ser recordadas se hacen realidad." (muestra la frase completa; hoy la primera parte está oculta).
2. Bajo esa frase, reemplaza el párrafo por: "Transformamos tus ideas en experiencias visuales que inspiran, conectan e impactan, con un único propósito: hacerlas inolvidables."
3. Sección de servicios: elimina el eyebrow oculto "Cuatro pilares · una sola dirección" y elimina el bloque de texto oculto que contiene "Dirección | Experiencias | Producción | Branding | Productora 360". No dejes texto oculto con keywords en ninguna parte de la página.
4. Cifras: cambia "Pilares bajo una dirección" por "Servicios bajo una dirección".
5. Cifras: cambia "65K" por "[CIFRA DEFINIDA]" en "Máx. asistentes en un show".
6. Portafolio: corrige "Alanis Lago" por "Alanis Lagos", "Lara Poyect" por "Lara Project" y "Polima" por "Polimá" en todas sus apariciones.
7. Revisa que la palabra "pilares" no aparezca en ninguna parte visible ni en los nombres de sección.
```

---

## D. Otras piezas a actualizar

- **Catálogo de servicios:** cambiar la frase de apertura por la versión vigente.
- **Brandbook:** tipografía de texto, negro y blanco base, según las decisiones A1–A3.
- **Design system:** renombrar `PillarCard` y la descripción del Badge (A4), anotar las licencias de las fuentes (A1) y reformular el mensaje clave (A6).
