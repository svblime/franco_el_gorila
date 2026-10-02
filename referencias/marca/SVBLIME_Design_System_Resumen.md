# SVBLIME — Design System (resumen)

## Esencia
Agencia creativa de experiencias en vivo (Chile, 2026). Hace cuatro cosas: Dirección Creativa, Experiencias Visuales, Producción de Eventos y Branding de Eventos. Es una sola marca (*branded house*) y no maneja submarcas. La idea central del sistema visual es **el escenario**: lienzo negro, luz blanca y tres colores de señal.

---

## Colores

### Base
| Token | Hex | Uso |
|---|---|---|
| `--svb-black` | `#000000` | El escenario, lienzo principal |
| `--svb-white` | `#FFFFFF` | La luz: titulares y logo |

### Señales (los tres pesan igual, ninguno manda)
| Token | Hex | Strong (hover) | Soft (relleno) |
|---|---|---|---|
| `--svb-blue` | `#4EA9FF` | `#2E93F5` | `rgba(78,169,255,0.14)` |
| `--svb-amber` | `#FFCD59` | `#F5BB37` | `rgba(255,205,89,0.16)` |
| `--svb-violet` | `#8F00FF` | `#7A00DB` | `rgba(143,0,255,0.16)` |

- Van siempre en el orden del logo: azul → ámbar → violeta.
- Cuando los acentos rotan, se usan los tres. Ninguno se vuelve "el color de marca".
- El azul es el color de interacción (links, focus) solo para que la UI sea consistente. No significa que tenga más jerarquía.
- Se usan con moderación: poco color sobre grandes áreas neutras.

### Neutros oscuros (UI por defecto)
| Token | Hex | Uso |
|---|---|---|
| `--svb-ink-900` | `#000000` | Negro absoluto del escenario |
| `--svb-ink-800` | `#08080A` | Fondo de página |
| `--svb-ink-700` | `#0F0F12` | Superficie elevada |
| `--svb-ink-600` | `#17171B` | Superficie de tarjeta |
| `--svb-ink-500` | `#1F1F25` | Tarjeta elevada / input |
| `--svb-ink-400` | `#2A2A31` | Relleno hover / línea fuerte |
| `--svb-line` | `#26262C` | Borde de 1px por defecto |
| `--svb-line-soft` | `rgba(255,255,255,0.08)` | Borde suave |
| `--border-strong` | `#3A3A42` | Borde fuerte |

### Neutros claros (documentos, impresos, UI clara)
| Token | Hex | Uso |
|---|---|---|
| `--svb-paper` | `#FFFFFF` | Papel |
| `--svb-paper-soft` | `#F4F4F2` | Blanco cálido (páginas de manual) |
| `--svb-paper-line` | `#E4E4E0` | Líneas sobre papel |
| `--svb-gray-100` | `#E8E8E6` | — |
| `--svb-gray-300` | `#B6B6B8` | — |
| `--svb-gray-500` | `#77777C` | — |
| `--svb-gray-700` | `#3A3A3F` | — |

### Texto sobre oscuro
| Token | Hex | Uso |
|---|---|---|
| `--svb-text` | `#FFFFFF` | Titulares |
| `--svb-text-muted` | `#B4B4BC` | Texto de cuerpo y secundario |
| `--svb-text-faint` | `#74747E` | Captions y metadatos |
| `--svb-text-on-accent` | `#000000` | Texto sobre relleno azul o ámbar |

### Alias semánticos (los que se usan en la UI)
- **Fondos y superficies:**
  - `--bg-page` = ink-800
  - `--bg-stage` = ink-900
  - `--surface-raised` = ink-700
  - `--surface-card` = ink-600
  - `--surface-input` = ink-500
  - `--surface-hover` = ink-400
- **Bordes:** `--border-default` = line, `--border-soft` = line-soft
- **Texto:**
  - `--text-heading` = blanco
  - `--text-body` = muted
  - `--text-meta` = faint
- **Acentos y focus:**
  - `--accent-primary` = azul
  - `--accent-highlight` = ámbar
  - `--accent-creative` = violeta
  - `--focus-ring` = azul
- **Selección de texto:** fondo azul, texto `#000`.

---

## Tipografía

### Familias
| Rol | Familia | Token | Origen |
|---|---|---|---|
| Display | **Borscha SemiBold** (600) | `--font-display` | Archivo local `assets/fonts/borscha-semibold.otf` |
| Texto / UI | **Hanken Grotesk** | `--font-sans` | Google Fonts. Pesos 300–800 y cursiva 400 |
| Mono | **JetBrains Mono** | `--font-mono` | Google Fonts. Pesos 400, 500 y 600 |

Hanken Grotesk y JetBrains Mono son **recomendaciones** y falta confirmar sus licencias.

### Pesos
| Token | Valor |
|---|---|
| `--fw-light` | 300 |
| `--fw-regular` | 400 |
| `--fw-medium` | 500 |
| `--fw-semibold` | 600 (el único peso de Borscha) |
| `--fw-bold` | 700 |
| `--fw-black` | 800 |

### Escalas
| Escala | Tokens |
|---|---|
| **Display (Borscha)** | `--text-display-2xl` 128px (frases hero) · `-xl` 88px · `-lg` 64px · `-md` 48px · `-sm` 36px |
| **Texto (Hanken)** | `--text-title` 28px (títulos de sección) · `--text-xl` 22px (lead) · `--text-lg` 18px · `--text-base` 16px (cuerpo) · `--text-sm` 14px · `--text-xs` 13px |
| **Mono** | `--text-label` 12px (eyebrows y tags) · `--text-label-sm` 11px |

### Interlineado
| Token | Valor |
|---|---|
| `--lh-tight` | 0.98 (display grande) |
| `--lh-snug` | 1.08 |
| `--lh-heading` | 1.15 |
| `--lh-body` | 1.6 |
| `--lh-relaxed` | 1.75 |

### Tracking
| Token | Valor |
|---|---|
| `--tracking-display` | -0.02em |
| `--tracking-tight` | -0.01em |
| `--tracking-normal` | 0 |
| `--tracking-label` | 0.18em |
| `--tracking-wide` | 0.24em |

### Jerarquía
- **h1–h4:** Borscha 600, color blanco, interlineado 1.15, tracking -0.01em.
- **Titulares de marca:** Borscha, muchas veces en MAYÚSCULAS, con tracking negativo leve.
- **Títulos de sección y cuerpo:** sentence case.
- **Cuerpo:** Hanken 16px / 1.6, peso 400, color `--text-body`.
- **Eyebrows** (`.svb-eyebrow`): Mono 12px, peso 500, tracking 0.18em, en MAYÚSCULAS, color `--text-meta`. Evocan un timecode técnico.

---

## Espaciado y layout
- **Escala (base 4px):** 0 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160px. Tokens `--space-0` a `--space-40`.
- **Contenedores:**
  - `--container-max` 1200px
  - `--container-wide` 1440px
- **Gutters:**
  - `--gutter` 24px
  - `--gutter-lg` 48px
- **Secciones:**
  - `--section-y` 120px
  - `--section-y-sm` 72px
- **Principio:** "el orden protege la creatividad". El contenido respira y nunca se amontona.

---

## Radios, bordes, sombras y movimiento

### Radios
| Token | Valor | Uso |
|---|---|---|
| `--radius-none` | 0 | — |
| `--radius-xs` | 2px | — |
| `--radius-sm` | 4px | Controles |
| `--radius-md` | 8px | Tarjetas |
| `--radius-lg` | 12px | Paneles |
| `--radius-pill` | 999px | Solo tags |

### Bordes
- `--border-hair`: 1px sólido, color `--border-default`.
- `--border-focus`: 2px sólido, color azul.
- `--ring` (anillo de focus): `0 0 0 2px var(--bg-page), 0 0 0 4px var(--focus-ring)`.

### Sombras
| Token | Valor |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.4)` |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,.45)` |
| `--shadow-lg` | `0 24px 60px rgba(0,0,0,.55)` |
| `--glow-blue` | `0 0 0 1px rgba(78,169,255,.5), 0 8px 32px rgba(78,169,255,.28)` |
| `--glow-violet` | `0 0 0 1px rgba(143,0,255,.5), 0 8px 32px rgba(143,0,255,.30)` |

- En UI oscura, la elevación se logra con superficies más claras y bordes de 1px, no con sombras pesadas.
- Los glows se usan solo en acentos puntuales del hero o en elementos interactivos.

### Movimiento
- **Duraciones:**
  - `--dur-fast` 120ms
  - `--dur-base` 200ms
  - `--dur-slow` 360ms
  - `--dur-slower` 600ms
- **Easings:**
  - `--ease-standard` `cubic-bezier(0.22,0.61,0.36,1)`
  - `--ease-out` `cubic-bezier(0.16,1,0.3,1)`
  - `--ease-in-out` `cubic-bezier(0.65,0,0.35,1)`
- **Reglas:** fades y desplazamientos cortos. Nada de rebotes ni loops decorativos.
  - Hover: cambia la superficie o el borde, o sube un poco la opacidad.
  - Press: oscurece levemente, sin encoger exageradamente el elemento.

### Links
- Color azul. Al hover pasa a `#2E93F5`.
- Sin subrayado.
- Transición de color de 200ms.

---

## Componentes

### Core
- **Button**
  - Variantes:
    - `primary`: relleno sólido de señal con texto negro.
    - `secondary`: outline.
    - `ghost`: solo texto.
    - `signal`: outline del color de acento.
  - Tamaños `sm`, `md` y `lg`.
  - `signal` define el acento: blue, amber o violet.
  - Iconos con `iconLeft` / `iconRight` (Lucide, en currentColor).
- **Badge:** tag para pilar, categoría o estado.
  - Mono en mayúsculas por defecto.
  - Tonos: `blue`, `amber` y `violet` (rellenos soft), `neutral` y `outline`.
  - `mono={false}` desactiva la tipografía mono.
- **Eyebrow:** kicker en mono y mayúsculas que va sobre un titular.
  - Lleva una barra inicial (tick).
  - `tick={false}` la quita y `tickColor` cambia su acento.
- **SpectrumBar:** el divisor firma, azul → ámbar → violeta.
  - Sirve para separar secciones, subrayar titulares o firmar una pieza.
  - Props: `thickness`, `length`, `radius` y `orientation`.
  - La utilidad `.svb-spectrum` mide 4px de alto y 100% de ancho.

### Contenido
- **Card:** superficie `--surface-card` con borde de 1px y radio de 8px.
  - Sombra mínima o ninguna.
  - Con `interactive`: sube al hover y toma el borde del acento (`accent`).
- **PillarCard:** número en eyebrow, título en Borscha y descripción. Se usa para los cuatro pilares.
- **QuoteBlock:** frase madre grande en Borscha con acento de espectro y `cite`. La frase debe ser corta y segura.
- **FounderCard:** ficha de un socio con foto en escala de grises (si no hay foto, muestra iniciales).
  - Lleva `name`, `role`, `accent` y `disciplines`.
  - Socios:
    - Jaime Lagos (creatividad y arte)
    - Luis Ulloa (producción)
    - Elvis Coloma (iluminación y tecnología)
- **StatBlock:** número grande en Borscha con un label en mono. Ejemplos: "+10", "65K".

---

## Logotipo

### Construcción
Wordmark SVBLIME cuya "E" final se forma con tres barras horizontales de igual peso: azul, ámbar y violeta (de arriba a abajo).

### Versiones (`assets/`)
| Archivo | Uso |
|---|---|
| `svblime-negativo.png` | Lockup principal: letras blancas y barras de color, sobre fondo oscuro |
| `svblime-positivo.png` | Letras negras y barras de color, sobre fondo claro |
| `svblime-mono.png` | Monocromático negro, impresión a 1 tinta sobre fondo claro |
| `svblime-mono-blanco.png` | Monocromático blanco, sobre campos de color o fotografía |
| `svblime-logo-white.png` | Original, blanco sobre negro |
| `svblime-logo-white-transparent.png` | El original con fondo transparente, para cualquier superficie oscura |
| `svblime-fest-lockup.png` | Lockup "fest" (no está documentado en el readme) |

### Reglas
- **Área de resguardo:** el espacio libre alrededor debe ser igual a la altura de una barra.
- **Tamaño mínimo impreso:** 22 mm de ancho.
- **Elección de versión:**
  - Fondo oscuro: negativo.
  - Fondo claro: positivo.
  - Sin color disponible (1 tinta), o sobre color o foto: monocromático.
- **Nunca** redibujar, deformar, recolorear las barras ni reconstruir la marca.
- **Barras apiladas:** usadas en vertical, como en la E, sirven como bloque gráfico de portada o firma.

---

## Imagen, fondos e iconos

### Fondos
- Principalmente negro plano.
- Se permite:
  - Fotografía de shows a sangre completa, con overlay oscuro.
  - Degradados radiales muy oscuros, tipo luz de escenario, con moderación.

### Fotografía
- Mundo real: conciertos, festivales, montajes, luz y público.
- Atmósfera oscura y contrastada, donde dominan los haces de color de las señales.
- Importan más la energía y la coherencia que una foto "bonita" genérica.

### Transparencia y blur
Uso puntual:
- `backdrop-filter` en la navegación.
- Overlays que protegen el texto sobre fotos.

### Iconos
- Lucide, en trazo lineal de 1.5–2px y currentColor.
- Tamaños 16, 20 y 24px.
- Siempre outline: nunca relleno ni multicolor.
- Lucide es una **sustitución propuesta** porque la marca no tiene set propio.
- No usar Unicode como icono.

---

## Voz y tono
- **Esencia:** "Habla como un equipo que ya estuvo en el escenario: claro, seguro, cercano y con criterio."
- **Principios:**
  - Claridad
  - Cercanía profesional
  - Seguridad sin arrogancia
  - Creatividad con propósito
  - Honestidad operacional
- **Persona:**
  - Español de Chile.
  - Primera persona plural ("integramos", "diseñamos").
  - Tutea al cliente en canales cercanos ("tu idea", "tu proyecto").
- **Palabras que sí usamos:** experiencia, idea, visión, criterio, coherencia, dirección, tranquilidad, propósito, ejecución, detalle, atmósfera, identidad, memoria, equipo, proceso.
- **Palabras que evitamos:**
  - magia (sin sustento), único, increíble, disruptivo, 360, wow, full
  - "premium" sin razón
  - "solución integral para todo"
  - barato, rápido
  - "hacemos de todo"
- **Mensajes clave:**
  - Cerramos la distancia entre lo que se imagina y lo que se vive.
  - No hacemos de todo; hacemos experiencias con propósito.
  - La creatividad necesita orden para llegar intacta al público.
  - La tecnología no reemplaza la idea; la potencia.
  - El detalle es respeto por el público, por el cliente y por el oficio.
- **Regla de oro:** "Si una frase podría estar en la web de cualquier agencia, todavía no es una frase de SVBLIME." Todo impacto tiene que explicar qué lo produce.
- **Posicionamiento:** premium. Compite por confianza, criterio y calidad de ejecución, nunca por precio.

---

## Sí / No

**Sí**
- Fondos negros con poco color de señal.
- Usar los tres acentos con el mismo peso y en el orden del logo.
- Barra de espectro horizontal y recta como firma.
- Radios ajustados y bordes de 1px.
- Movimiento rápido y preciso.
- Overlays oscuros sobre foto para sostener el texto blanco.
- Ritmo amplio entre secciones.

**No**
- Promover un acento por sobre los otros, o hacer competir los tres a la vez.
- Degradados saturados azul-púrpura de fondo, patrones decorativos ruidosos o texturas generadas por IA.
- Sombras pesadas, rebotes o loops decorativos.
- Iconos rellenos o multicolor, emoji o Unicode usado como icono.
- Pills fuera de los tags.
- Redibujar, deformar o recolorear el logotipo.
- Jerga, exageraciones o frases genéricas de agencia.
