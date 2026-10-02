/* global React */
const { useState } = React;
const NS = window.SVBLIMEDesignSystem_fe43f6;
const { Button, Badge, Eyebrow, SpectrumBar, PillarCard, QuoteBlock, FounderCard, StatBlock, Card } = NS;

/* ---- shared stage-light background (on-brand: colored beams over black) ---- */
const stage = (a = "78,169,255", b = "143,0,255") => ({
  background:
    "radial-gradient(120% 90% at 15% -10%, rgba(" + a + ",0.20), transparent 55%)," +
    "radial-gradient(120% 90% at 90% 0%, rgba(" + b + ",0.18), transparent 55%)," +
    "var(--bg-stage)",
});

const LOGO = "assets/svblime-logo-white-transparent.png";
const LOGO_MONO_WHITE = "assets/svblime-mono-blanco.png";
const LOGO_MONO_BLACK = "assets/svblime-mono.png";
const LOGO_NEG = "assets/svblime-negativo.png";

/* ============================ Loading screen (logo flash + intro) ============================ */
function LoadingScreen({ onDone }) {
  const frames = [
    { bg: "#FFFFFF", src: LOGO_MONO_BLACK },  // fondo blanco · letras negras (sin color)
    { bg: "#4EA9FF", src: LOGO_MONO_WHITE },  // color sobre color · azul
    { bg: "#FFCD59", src: LOGO_MONO_WHITE },  // color sobre color · ámbar
    { bg: "#8F00FF", src: LOGO_MONO_WHITE },  // color sobre color · violeta
    { bg: "#000000", src: LOGO_NEG },         // principal · negro + letras blancas con color
  ];
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState("flash"); // flash → out

  React.useEffect(() => {
    if (phase !== "flash") return;
    const last = frames.length - 1;
    const holds = i === last ? 420 : 130;
    const t = setTimeout(() => {
      if (i < last) setI(i + 1);
      else { setPhase("out"); setTimeout(onDone, 700); }
    }, holds);
    return () => clearTimeout(t);
  }, [i, phase]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200, overflow: "hidden", background: "#000",
      opacity: phase === "out" ? 0 : 1, pointerEvents: phase === "out" ? "none" : "auto",
      transition: "opacity 700ms var(--ease-standard)",
    }}>
      {frames.map((f, idx) => (
        <div key={idx} style={{
          position: "absolute", inset: 0, background: f.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: (phase === "flash" && idx === i) || (phase !== "flash" && idx === frames.length - 1) ? 1 : 0,
          transition: "opacity 100ms var(--ease-standard)",
        }}>
          <img src={f.src} alt="SVBLIME" style={{ width: "min(46vw, 520px)", height: "auto" }} />
        </div>
      ))}
    </div>
  );
}

/* ============================ Header ============================ */
function Header({ onCta }) {
  const SERVICES = [
    ["Dirección Creativa", "servicios/direccion-creativa.html"],
    ["Experiencias Visuales", "servicios/experiencias-visuales.html"],
    ["Producción Integral", "servicios/produccion-integral.html"],
    ["Branding de Eventos", "servicios/branding-eventos.html"],
  ];
  const [svcOpen, setSvcOpen] = useState(false);
  const svcTimer = React.useRef(null);
  const svcEnter = () => { if (svcTimer.current) { clearTimeout(svcTimer.current); svcTimer.current = null; } setSvcOpen(true); };
  const svcLeave = () => { if (svcTimer.current) clearTimeout(svcTimer.current); svcTimer.current = setTimeout(() => setSvcOpen(false), 3000); };
  React.useEffect(() => () => { if (svcTimer.current) clearTimeout(svcTimer.current); }, []);
  const links = [
    ["SVBLIME", "#agencia"],
    ["Servicios", "#pilares"],
    ["Portafolio", "#lineup"],
    ["Galeria", "#trabajo"],
  ];
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    if (!open) return;
    if (svcOpen) return;
    const t = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(t);
  }, [open, svcOpen]);
  React.useEffect(() => { if (!open) setSvcOpen(false); }, [open]);
  const [reveal, setReveal] = useState(0); // hidden until the centered SVBLIME logo appears
  React.useEffect(() => {
    const show = () => setReveal(1);
    window.addEventListener("svb-reveal-ui", show);
    return () => window.removeEventListener("svb-reveal-ui", show);
  }, []);
  const bar = { display: "block", width: "34px", height: "6px", transition: "transform 500ms var(--ease-out), opacity 500ms var(--ease-standard)" };
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "13px clamp(20px,5vw,56px)",
      background: "rgba(8,8,10,0.5)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-soft)",
      pointerEvents: "none", gap: "clamp(16px,2vw,28px)",
      opacity: reveal, transform: "translateY(" + (-12 * (1 - reveal)) + "px)",
      visibility: reveal < 0.02 ? "hidden" : "visible",
      transition: "opacity 500ms var(--ease-standard), transform 500ms var(--ease-out)",
    }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} style={{
        display: "flex", flexDirection: "column", gap: "4px", padding: 0, border: "none", flex: "none",
        background: "transparent", cursor: "pointer", pointerEvents: "auto",
      }}>
        <span className="svb-bars" style={{ ...bar, background: "var(--svb-blue)", transform: open ? "translateY(10px) rotate(45deg)" : "none" }}></span>
        <span className="svb-bars" style={{ ...bar, background: "var(--svb-amber)", opacity: open ? 0 : 1 }}></span>
        <span className="svb-bars" style={{ ...bar, background: "var(--svb-violet)", transform: open ? "translateY(-10px) rotate(-45deg)" : "none" }}></span>
        <svg className="svb-chev" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--svb-white)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "none", transform: open ? "rotate(180deg)" : "none", transition: "transform 320ms var(--ease-out)" }}><path d="M5 8l5 5 5-5"></path></svg>
      </button>

      {/* Inline horizontal menu — unfolds from the 3 bars */}
      <nav className="svb-nav" data-open={open ? "true" : "false"} style={{
        display: "flex", alignItems: "center", gap: "clamp(14px,2vw,26px)", marginRight: "auto",
        maxWidth: open ? "600px" : "0px", opacity: open ? 1 : 0,
        overflow: "hidden", pointerEvents: open ? "auto" : "none",
        transition: "max-width 900ms var(--ease-out) " + (open ? "0ms" : "260ms") + ", opacity 700ms var(--ease-standard) " + (open ? "0ms" : "200ms"),
      }}>
        {links.map(([label, href], i) => {
          const isSvc = label === "Servicios";
          const anim = {
            opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 600ms var(--ease-standard) " + (open ? (180 + i * 110) + "ms" : ((links.length - 1 - i) * 90) + "ms") + ", transform 600ms var(--ease-out) " + (open ? (180 + i * 110) + "ms" : ((links.length - 1 - i) * 90) + "ms"),
          };
          const linkStyle = {
            fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500,
            color: svcOpen && isSvc ? "var(--svb-amber)" : "var(--text-body)",
            letterSpacing: "0.01em", whiteSpace: "nowrap", pointerEvents: "auto",
            display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer",
            ...anim,
          };
          if (!isSvc) {
            return <a key={href} href={href} className="svb-navlink" onClick={() => setOpen(false)} style={linkStyle}>{label}</a>;
          }
          return (
            <React.Fragment key={href}>
              <a href={href} className="svb-navlink" aria-expanded={svcOpen} onMouseEnter={svcEnter} onMouseLeave={svcLeave} onClick={(e) => { e.preventDefault(); setSvcOpen((v) => !v); }} style={linkStyle}>
                {label}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ transform: svcOpen ? "rotate(180deg)" : "none", transition: "transform 320ms var(--ease-out)" }}>
                  <path d="M2.5 4.5 6 8l3.5-3.5" />
                </svg>
              </a>
              <div className="svb-svcmenu" data-open={svcOpen ? "true" : "false"} onMouseEnter={svcEnter} onMouseLeave={svcLeave} style={{
                position: "fixed", top: "54px", left: "calc(clamp(20px,5vw,56px) + 56px)",
                display: "flex", flexDirection: "column", minWidth: "252px",
                background: "rgba(8,8,10,0.97)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid var(--border-soft)", borderRadius: "var(--radius-sm)",
                overflow: "hidden", pointerEvents: svcOpen ? "auto" : "none",
                opacity: svcOpen ? 1 : 0, transform: svcOpen ? "translateY(0)" : "translateY(-14px)",
                transition: "opacity 420ms var(--ease-standard), transform 460ms var(--ease-out), visibility 0ms linear " + (svcOpen ? "0ms" : "460ms"),
                visibility: svcOpen ? "visible" : "hidden",
              }}>
                {SERVICES.map(([sl, sh], si) => (
                  <a key={sh} href={sh} className="svb-navlink" onClick={() => { setSvcOpen(false); setOpen(false); }} style={{
                    fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "var(--text-body)",
                    padding: "13px 18px", borderTop: si === 0 ? "none" : "1px solid var(--border-soft)", whiteSpace: "nowrap",
                  }}>{sl}</a>
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </nav>

      <button type="button" onClick={onCta} aria-label="Hablemos" title="Hablemos" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "36px", height: "36px", padding: 0, pointerEvents: "auto",
        background: "transparent", color: "var(--svb-white)",
        border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
      }}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z" />
          <path d="M21 11h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Z" />
          <path d="M3 11v-1a9 9 0 0 1 18 0v1" />
          <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
        </svg>
      </button>
    </header>
  );
}

/* ============================ Hero (autoplay video → text → scroll) ============================ */
const smoothstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
// Photos + videos from the "Fotos" section, used for the hidden gallery above SVBLIME.
const GALLERY_META = {
  hiphop: { t: "Hip Hop al Parque · Colombia", tags: ["Contenido", "Luz"] },
  vina: { t: "Festival de Viña", tags: ["Iluminación", "TV"] },
  polima: { t: "Polima & Pailita · Movistar Arena", tags: ["Dirección creativa", "Iluminación"] },
  icare: { t: "Meeting Empresa · Icare", tags: ["Pantalla", "Producción técnica"] },
  tecate: { t: "Tecate Pa'l Norte · México", tags: ["Iluminación"] },
  chystemc: { t: "ChysteMC · 20 años", tags: ["Iluminación", "Visuales"] },
  lara: { t: "Lollapalooza · Lara Project", tags: ["Programación", "Código de tiempo"] },
  summit: { t: "Breast Cancer Summit", tags: ["Media Server", "Operación"] },
  blue: { t: "Branding Blue Label", tags: ["Pantalla", "Operación"] },
  muno: { t: "Lanzamiento de Marca", tags: ["Contenido visual", "Producción técnica"] },
  dvd: { t: "DVD En Vivo · La Combo Tortuga", tags: ["Diseño", "Iluminación", "Programación"] },
  face: { t: "FaceBrooklyn · Teatro Coliseo", tags: ["Programación", "Operación en vivo"] },
  rumble: { t: "Pablito Pesadilla · Quinta Vergara", tags: ["Iluminación"] },
  cuenta: { t: "Cuenta Pública · Municipalidades", tags: ["Operación visuales", "Producción técnica"] },
  combo: { t: "Video clip 3am · La Combo Tortuga", tags: ["Diseño", "Código de tiempo"] },
  chevrolet: { t: "Branding Chevrolet", tags: ["Pantalla", "Contenido visual"] },
  yandel: { t: "Yandel Sinfónico · Viña 2025", tags: ["Operación", "Diseño", "Contenido"] },
  televisado: { t: "Festival Televisado · LCT Huaso de Olmué", tags: ["Programación de iluminación"] },
  garras: { t: "Festival del Huaso de Olmué · Garras de Amor", tags: ["Operación en vivo"] },
  mesostendras: { t: "Video Clip · Me Sostendrás", tags: ["Diseño", "Operación"] },
  finalrojo: { t: "Final ROJO TVN", tags: ["Programación", "Iluminación"] },
  lctenvivo: { t: "Video clip en vivo · LCT", tags: ["Iluminación", "Videoclip"] },
  mesobrabas: { t: "Video clip LCT · Me Sobrabas Tú", tags: ["Iluminación", "Videoclip"] },
  alanis: { t: "Alanis Lago en vivo · Olmué", tags: ["Dirección creativa"] },
  entremares: { t: "Entremares · Arena Monticello", tags: ["Dirección de iluminación"] },
  movistar13: { t: "Movistar Arena · LCT 13 años", tags: ["Programación", "Código de tiempo"] },
  ciberseg: { t: "Evento Empresa · Ciberseguridad", tags: ["Producción", "Contenido"] },
  activaciones: { t: "Activaciones de empresas", tags: ["Media Server", "Visuales"] },
  doctores: { t: "Evento Doctores · Armonic", tags: ["Contenido", "Producción"] },
  walmart: { t: "Walmart Chile · Media Server", tags: ["Producción técnica"] },
  meli: { t: "Fiesta Fin de Año · Mercado Libre", tags: ["Pantallas", "Iluminación"] },
  colombia: { t: "Colombia Travel", tags: ["Punto de encuentro", "Branding"] },
  eaton: { t: "Branding Empresa · Eaton Tech Day", tags: ["Branding", "Contenido"] },
  worktech: { t: "Evento anual · Worktech", tags: ["Branding", "Producción técnica"] },
  santotomas: { t: "Charla Santo Tomás", tags: ["Contenido", "Branding"] },
  astara: { t: "Capacitación Empresa · Astara", tags: ["Producción técnica", "Contenido"] },
  pailita: { t: "Iluminación y Visuales · Pailita", tags: ["Diseño", "Programación"] },
  pampilla: { t: "Festival La Pampilla · Pablito Pesadilla", tags: ["Iluminación", "+100.000 personas"] },
  gino: { t: "Teletón 2025 · Gino Mella", tags: ["Dirección creativa", "Contenido"] },
  dulsonico: { t: "Dirección Video Clip · Dulsónico", tags: ["Dirección de arte", "Edición"] },
  movistar: { t: "Movistar Empresas · HISPAM Digital Forum", tags: ["Contenido", "3D"] },
  bci: { t: "Banco BCI", tags: ["Código de tiempo", "Iluminación"] },
};
const metaFor = (base) => GALLERY_META[base.replace(/-.*/, "").replace(/video$/, "")] || GALLERY_META[base.split("-")[0]] || { t: "SVBLIME", tags: [] };
const GALLERY_PHOTOS = [
  "hiphop-1", "vina-1", "polima-1", "icare-2", "tecate-1", "chystemc-2",
  "lara-1", "summit-1", "blue-1", "muno-2", "dvd-1", "face-1",
  "rumble-1", "cuenta-1", "hiphop-3", "polima-3", "tecate-3",
  "icare-1", "vina-2", "chystemc-1", "lara-3", "summit-2", "blue-3",
  "muno-1", "dvd-3", "face-2", "rumble-2", "cuenta-3", "chevrolet-1",
  "hiphop-2", "vina-3", "polima-2", "tecate-2", "icare-3", "chystemc-3",
  "entremares-1", "movistar13-1", "ciberseg-1", "activaciones-1", "doctores-1", "walmart-1",
  "meli-1", "colombia-1", "eaton-1", "worktech-1", "santotomas-1", "astara-1",
  "entremares-2", "movistar13-2", "ciberseg-2", "activaciones-2", "doctores-2", "walmart-2",
  "meli-2", "colombia-2", "eaton-2", "worktech-2", "santotomas-2", "astara-2",
  "pailita-1.png", "pampilla-1.png", "pailita-3.png", "pampilla-2.png", "pailita-2.png", "pampilla-3.png",
].map((n) => ({ type: "img", src: "work/min/" + (/\.(png|jpg)$/.test(n) ? n : n + ".jpg"), meta: metaFor(n.replace(/\.(png|jpg)$/, "")) }));
const GALLERY_VIDEOS = ["yandel-video", "chevrolet-video", "vina-video", "combo-video", "televisado-video", "garras-olmue-video", "mesostendras-video", "finalrojo-video", "lctenvivo-video", "mesobrabas-video", "alanis-video", "gino-teleton-video", "dulsonico-video", "movistar-empresas-video", "bci-video", "bci-video-2", "dvd-video"]
  .map((n) => ({ type: "video", src: "work/" + n + ".mp4", meta: metaFor(n) }));
const FEATURED = ["blue", "bci", "chevrolet", "icare", "muno", "doctores", "yandel", "mesostendras", "finalrojo", "gino", "combo", "vina", "pampilla", "pailita", "movistar13", "dvd", "tecate", "hiphop"];
const isFeatured = (src) => { const f = src.split("/").pop().replace(/\.(png|jpg|mp4)$/, ""); const k = f.replace(/-.*/, ""); return FEATURED.indexOf(k) >= 0 || FEATURED.indexOf(f.replace(/-video.*$/, "")) >= 0; };
const hashStr = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000; return h; };
const isBig = (src) => isFeatured(src) || hashStr(src) % 100 < 62;
// Interleave media and split into 3 rows for the horizontal marquee.
const GALLERY_MEDIA = (() => {
  const out = [], p = [...GALLERY_PHOTOS], v = [...GALLERY_VIDEOS];
  let vi = 0;
  p.forEach((item, i) => { out.push(item); if ((i + 1) % 9 === 0 && vi < v.length) out.push(v[vi++]); });
  while (vi < v.length) out.push(v[vi++]);
  return out;
})();
const GALLERY_ROWS = (() => {
  const rows = [[], [], []];
  GALLERY_MEDIA.forEach((m, i) => rows[i % rows.length].push(m));
  return rows;
})();
// Deep link (index.html#trabajo from a service page): skip the whole intro.
const SKIP_INTRO = typeof window !== "undefined" && window.location.hash.length > 1;
function Hero() {
  const videoRef = React.useRef(null);
  const [ready, setReady] = React.useState(SKIP_INTRO);
  const [videoDone, setVideoDone] = React.useState(SKIP_INTRO);
  const [nearEnd, setNearEnd] = React.useState(SKIP_INTRO ? 1 : 0); // 0→1 over the last ~2.2s of the clip
  const [logoIn, setLogoIn] = React.useState(SKIP_INTRO); // "Bienvenidos a" revealed
  const [logoMark, setLogoMark] = React.useState(SKIP_INTRO); // the logo itself, a beat later
  const logoScreenRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const rowRefs = React.useRef([]);       // outer track per row (transformed)
  const rowSeqRefs = React.useRef([]);    // first sequence per row (for width measure)
  const offsetRef = React.useRef(0);      // accumulated up-scroll → photos slide right
  const introSeenRef = React.useRef(SKIP_INTRO); // once the intro is scrolled past, the logo never returns

  // Download the whole clip as a Blob URL for smooth playback, then autoplay it.
  React.useEffect(() => {
    if (SKIP_INTRO) return;
    let url;
    let cancelled = false;
    fetch("hero.mp4").then((r) => r.blob()).then((b) => {
      if (cancelled) return;
      url = URL.createObjectURL(b);
      const v = videoRef.current;
      if (v) {
        v.src = url;
        v.load();
        setReady(true);
        v.playbackRate = 0.75;
        const p = v.play();
        if (p) p.catch(() => {});
      }
    }).catch(() => { setReady(true); });
    return () => { cancelled = true; if (url) URL.revokeObjectURL(url); };
  }, []);

  // Lock page scroll until the centered logo is shown; release afterward.
  React.useEffect(() => {
    if (!logoIn) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [logoIn]);

  // End of intro: fade out BOTH the video and the text, then bring in the color logo + UI.
  const finishIntro = () => {
    setNearEnd(1);
    setVideoDone(true);
    window.setTimeout(() => {
      setLogoIn(true);
      window.setTimeout(() => setLogoMark(true), 240);
      window.dispatchEvent(new Event("svb-reveal-ui"));
    }, 700);
  };
  const onVideoEnd = finishIntro;
  const skip = () => { const v = videoRef.current; if (v) { try { v.pause(); } catch (e) {} } finishIntro(); };

  // Logo fade (on scroll toward SVBLIME) + wheel-driven gallery.
  // At the very top: scrolling UP slides all photos/videos to the right (looping);
  // scrolling DOWN lets the page descend normally.
  React.useEffect(() => {
    if (!logoIn) return;
    let raf = 0;
    const speeds = [0.62, 0.86, 1.12];
    const applyRows = () => {
      rowRefs.current.forEach((track, i) => {
        const seq = rowSeqRefs.current[i];
        if (!track || !seq) return;
        const w = seq.offsetWidth || 1;
        const x = -w + (((offsetRef.current * speeds[i]) % w) + w) % w; // right-moving loop
        track.style.transform = "translate3d(" + x + "px,0,0)";
      });
    };
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (y > vh * 0.35) introSeenRef.current = true;
      const logoEl = logoScreenRef.current;
      if (logoEl) {
        const o = introSeenRef.current ? 0 : Math.max(0, 1 - Math.min(1, y / (vh * 0.4)));
        logoEl.style.opacity = String(o);
        logoEl.style.visibility = o <= 0.001 ? "hidden" : "visible";
      }
      const gal = galleryRef.current;
      if (gal) gal.style.opacity = String(introSeenRef.current ? 1 : Math.min(1, y / (vh * 0.35)));
      applyRows();
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onWheel = (e) => {
      // Only trap upward wheel at the very top, after the intro — that's the gallery zone.
      if (introSeenRef.current && window.scrollY <= 1 && e.deltaY < 0) {
        e.preventDefault();
        offsetRef.current += -e.deltaY;
        if (!raf) raf = requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [logoIn]);

  // The top gallery drifts continuously on its own (3 speeds); wheel-up still nudges it.
  React.useEffect(() => {
    if (!logoIn) return;
    let raf = 0, last = 0;
    const speeds = [0.62, 0.86, 1.12];
    const tick = (now) => {
      if (!last) last = now;
      const dt = Math.min(60, now - last); last = now;
      offsetRef.current -= dt * 0.045;
      rowRefs.current.forEach((track, i) => {
        const seq = rowSeqRefs.current[i];
        if (!track || !seq) return;
        const w = seq.offsetWidth || 1;
        const x = -w + (((offsetRef.current * speeds[i]) % w) + w) % w;
        track.style.transform = "translate3d(" + x + "px,0,0)";
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [logoIn]);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || videoDone) return;
    const lead = 3.0;
    const t = Math.min(1, Math.max(0, (v.currentTime - (v.duration - lead)) / lead));
    setNearEnd(t);
  };

  const introReveal = smoothstep(0.06, 0.5, nearEnd);
  const textVis = videoDone ? 0 : introReveal;          // fades in on the tail, out when the clip ends
  const videoOpacity = ready ? (videoDone ? 0 : 1 - smoothstep(0.55, 1, nearEnd)) : 0;

  return (
    <section id="top" style={{ position: "relative", height: "100vh", background: "#000" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden", background: "#000" }}>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onEnded={onVideoEnd}
          onTimeUpdate={onTimeUpdate}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: videoOpacity, transition: "opacity 700ms var(--ease-standard)" }}
        />
        {/* loading placeholder while the clip downloads */}
        <div style={{ position: "absolute", inset: 0, display: ready ? "none" : "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-stage)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-meta)" }}>Cargando</span>
        </div>
        {/* darkening scrim so the text reads clearly */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 45%, transparent 80%)", opacity: textVis, transition: "opacity 500ms linear", pointerEvents: "none" }} />

        {/* Text — fades in over the clip's tail, fades out with the video at the end */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "clamp(40px,7vw,110px) clamp(20px,5vw,56px) clamp(56px,9vw,120px)",
          pointerEvents: "none",
          opacity: textVis, transition: "opacity 700ms var(--ease-standard)",
        }}>
          <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", width: "100%" }}>
            <h1 className="svb-h1line" style={{
              position: "absolute", width: "1px", height: "1px", overflow: "hidden",
              clipPath: "inset(50%)", whiteSpace: "nowrap", margin: "-1px", padding: 0, border: 0,
              fontFamily: "var(--font-mono)", fontSize: "min(14px,1.42vw)", letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--text-meta)", fontWeight: 400,
              maxWidth: "none", lineHeight: 1.7,
            }}>Agencia creativa de producción de eventos y experiencias visuales</h1>
            <div role="doc-subtitle" style={{
              fontFamily: "var(--font-display)", color: "var(--svb-white)",
              fontSize: "clamp(42px,8vw,104px)", lineHeight: 0.98, letterSpacing: "-0.03em",
              margin: 0, maxWidth: "16ch", display: "flex", flexWrap: "wrap",
            }}>
              {"Cerramos la distancia entre imaginarlo y vivirlo.".split(" ").map((w, i) => (
                <span key={i} style={{ marginRight: "0.28em", opacity: textVis, transition: "opacity 600ms var(--ease-standard) " + (i * 80) + "ms", display: "inline-block" }}>{w}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden gallery — photos + videos from "Fotos"; scroll up at the top slides them right */}
        {logoIn && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }} aria-hidden="true">
            <div ref={galleryRef} style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              justifyContent: "center", gap: "clamp(10px,1.6vw,22px)", opacity: 0, willChange: "opacity",
              transition: "opacity 500ms linear",
            }}>
              {GALLERY_ROWS.map((row, ri) => (
                <div key={ri} style={{ position: "relative", height: "clamp(150px,26vh,300px)", overflow: "hidden" }}>
                  <div ref={(el) => { rowRefs.current[ri] = el; }} style={{ position: "absolute", top: 0, left: 0, height: "100%", display: "flex", willChange: "transform" }}>
                    {[0, 1].map((copy) => (
                      <div key={copy} ref={copy === 0 ? (el) => { rowSeqRefs.current[ri] = el; } : null} style={{ display: "flex", alignItems: "center", gap: "clamp(10px,1.6vw,22px)", paddingRight: "clamp(10px,1.6vw,22px)" }}>
                        {row.map((m, ii) => (
                          <div key={copy + "-" + ii} className="svb-gitem" style={{ position: "relative", alignSelf: "center", height: isBig(m.src) ? "100%" : "62%", aspectRatio: m.type === "video" ? "16 / 9" : (ii % 3 === 0 ? "3 / 4" : ii % 3 === 1 ? "1 / 1" : "4 / 3"), borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#111", flex: "none" }}>
                            {m.type === "video" ? (
                              <video src={m.src} muted loop playsInline autoPlay preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.9 }} />
                            ) : (
                              <img src={m.src} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }} />
                            )}
                            <div className="svb-gcap" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "8px", padding: "clamp(10px,1.2vw,16px)", background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)" }}>
                              <span style={{ fontFamily: "var(--font-display)", color: "var(--svb-white)", fontSize: "clamp(13px,1.15vw,17px)", lineHeight: 1.12, letterSpacing: "-0.01em" }}>{m.meta.t}</span>
                              <div className="svb-gtags" style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                {m.meta.tags.map((tg) => (
                                  <span key={tg} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "999px", padding: "3px 8px" }}>{tg}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* subtle vignette so edges melt into black */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(130% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.7) 100%)" }} />
          </div>
        )}

        {/* Automatic reveal — SVBLIME color logo, centered on black */}
        <div ref={logoScreenRef} style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "clamp(14px,2.4vw,28px)", padding: "0 clamp(20px,5vw,56px)", background: "#000", pointerEvents: "none",
          opacity: logoIn ? 1 : 0, transition: "opacity 140ms linear",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "clamp(10px,1.1vw,13px)", letterSpacing: "0.34em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
            opacity: logoIn ? 1 : 0, transform: logoIn ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 700ms var(--ease-standard) 250ms, transform 700ms var(--ease-out) 250ms",
          }}>Bienvenidos a</span>
          <img src={LOGO_NEG} alt="SVBLIME" style={{
            width: "min(46vw, 520px)", height: "auto",
            opacity: logoMark ? 1 : 0,
            transform: logoMark ? "scale(1)" : "scale(0.86)",
            transition: "opacity 900ms var(--ease-standard), transform 1150ms cubic-bezier(0.16,1,0.3,1)",
          }} />
        </div>

        {/* scroll cue — appears with the logo, hides as you scroll */}
        <div style={{
          position: "absolute", left: "50%", bottom: "34px", transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)", opacity: logoIn ? 1 : 0, transition: "opacity 600ms var(--ease-standard) 400ms",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", pointerEvents: "none",
        }}>
          Scroll
          <span style={{ display: "block", width: "1px", height: "34px", background: "linear-gradient(rgba(255,255,255,0.7), transparent)" }} />
        </div>

        {/* skip intro — only while the video plays */}
        <button type="button" onClick={skip} style={{
          position: "absolute", right: "clamp(20px,5vw,56px)", bottom: "34px",
          fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)", background: "transparent", border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "var(--radius-sm)", padding: "8px 14px", cursor: "pointer",
          opacity: videoDone ? 0 : 1, pointerEvents: videoDone ? "none" : "auto", transition: "opacity 400ms var(--ease-standard)",
        }}>Saltar intro</button>
      </div>
    </section>
  );
}

/* ============================ Pilares ============================ */
function Pilares() {
  const hrefs = {
    "Dirección Creativa": "servicios/direccion-creativa.html",
    "Experiencias Visuales": "servicios/experiencias-visuales.html",
    "Producción Integral": "servicios/produccion-integral.html",
    "Branding de Eventos": "servicios/branding-eventos.html",
  };
  const pillars = [
    ["", "gray", "Dirección Creativa", "Concepto, narrativa, dirección de arte y el sentido del proyecto. Donde una intención se vuelve visión ejecutable."],
    ["", "amber", "Experiencias Visuales", "Luz, pantallas, contenido, motion, programación, previsualización y operación en vivo."],
    ["", "violet", "Producción Integral", "Planificación, coordinación, gestión de proveedores y ejecución en terreno, todo bajo control."],
    ["", "blue", "Branding de Eventos", "Identidad, mensaje, sistema visual y puntos de contacto, coherentes antes, durante y después."],
  ];
  return (
    <section id="pilares" style={{ position: "relative", padding: "var(--section-y) clamp(20px,5vw,56px)", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className="svb-reveal" style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px", maxWidth: "60ch" }}>
          <Eyebrow tickColor="var(--svb-amber)" style={{ display: "none" }}>Cuatro pilares · una sola dirección</Eyebrow>
          <div style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap", margin: "-1px", padding: 0, border: 0, fontFamily: "var(--font-mono)", fontSize: "clamp(11px,1.5vw,14px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-meta)", fontWeight: 400, display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.62em" }}>
            <span>Dirección</span>
            <span aria-hidden="true" style={{ color: "var(--text-meta)" }}>|</span>
            <span>Experiencias</span>
            <span aria-hidden="true" style={{ color: "var(--text-meta)" }}>|</span>
            <span>Producción</span>
            <span aria-hidden="true" style={{ color: "var(--text-meta)" }}>|</span>
            <span>Branding</span>
            <span aria-hidden="true" style={{ color: "var(--bg-page)" }}>|</span>
            <span style={{ color: "var(--bg-page)" }}>Productora 360</span>
          </div>
          <h2 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap", margin: "-1px", padding: 0, border: 0, fontFamily: "var(--font-mono)", fontSize: "clamp(11px,1.5vw,14px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-meta)", fontWeight: 400 }}>
            Servicios: dirección creativa, producción de eventos y experiencias visuales
          </h2>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,5vw,52px)", color: "var(--svb-white)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            El poder de un equipo conectado.
          </div>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.6, color: "var(--text-body)", maxWidth: "none", width: "max-content", whiteSpace: "nowrap" }}>
            Cuatro formas de trabajar, una sola misión: <em>hacer que tu idea cobre vida.</em>
          </p>
        </div>
        <div className="svb-reveal svb-pillargrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px" }}>
          {pillars.map((p) => (
            <a key={p[2]} href={hrefs[p[2]]} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <PillarCard number={p[0]} accent={p[1]} title={p[2]} description={p[3]} />
            </a>
          ))}
        </div>
      </div>
      <SpectrumBar thickness={4} style={{ position: "absolute", bottom: 0, left: 0, display: "none" }} />
    </section>
  );
}

/* ============================ Line Up (festival poster) ============================ */
const LINEUP_DAYS = [
  {
    day: "01", label: "Día 01 · Marcas", tint: "78,169,255",
    headliners: ["Claro", "Entel", "Copec", "Chevrolet", "TVN"],
    main: ["Johnnie Walker Blue Label", "Caja Los Andes", "Carolina Herrera 212", "Muni. de Vitacura", "Muni. de Pudahuel", "Muni. de Pedro Aguirre Cerda", "Lotus"],
    support: ["INACAP", "IP Chile", "Hilaria", "Provetec", "Muno BX", "Axon Pharma", "Armonic", "Breast Cancer"],
  },
  {
    day: "02", label: "Día 02 · Festivales", tint: "255,205,89",
    headliners: ["Festival de Viña", "Lollapalooza", "Billboard"],
    main: ["Tecate Pa'l Norte", "Coca Cola Flow Fest", "Ultra Festival", "Huaso de Olmué", "Festival La Pampilla"],
    support: ["Crush Power Music", "Premios Pulsar", "Resistence", "Rock Out", "Knock Fest"],
  },
  {
    day: "03", label: "Día 03 · Artistas", tint: "143,0,255",
    headliners: ["Yandel", "Carin León", "Myriam Hernández", "The Wailers"],
    main: ["Onyx", "P.O.D.", "Nanpa Básico", "Floyymenor", "Polimá Westcoast", "Pailita", "Zúmbale Primo", "La Combo Tortuga", "Pablito Pesadilla", "Alanis Lagos", "Pablo Chillee", "Lara Project"],
    support: ["Marcianeke", "ChysteMC", "Jere Klein", "Gino Mella", "Harry Nach", "Julianno Sosa", "Jordan 23", "Kidd Tetón", "Ithan NY", "FaceBrooklyn", "Garras de Amor", "Akrilla", "Saturno", "Bubaseta", "Shamanes Crew", "King Savage"],
  },
];
function LineUp() {
  const DOT = "rgba(255,255,255,0.55)";
  const sep = () => (
    <span style={{ display: "inline-block", width: "6px", height: "6px", margin: "0 clamp(8px,1.3vw,16px)", transform: "translateY(-4px) rotate(45deg)", background: DOT }} />
  );
  const row = (items, cls) => (
    <div className={cls} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", rowGap: "4px" }}>
      {items.map((name, i) => (
        <React.Fragment key={name + i}>
          {i > 0 && sep()}
          <span className="svb-name">{name}</span>
        </React.Fragment>
      ))}
    </div>
  );
  const dayDivider = (day, label, color) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", margin: "clamp(30px,4.5vw,56px) 0 clamp(18px,2.6vw,32px)" }}>
      <span style={{ height: "1px", flex: "1 1 0", maxWidth: "clamp(40px,12vw,160px)", background: "linear-gradient(90deg, transparent, " + color + ")" }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px,1.4vw,13px)", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--text-body)", WebkitTextFillColor: "var(--text-body)", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span style={{ height: "1px", flex: "1 1 0", maxWidth: "clamp(40px,12vw,160px)", background: "linear-gradient(90deg, " + color + ", transparent)" }} />
    </div>
  );
  return (
    <section id="lineup" style={{ position: "relative", overflow: "hidden", padding: "var(--section-y) clamp(20px,5vw,56px)", background: "radial-gradient(120% 80% at 50% -10%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(90% 90% at 8% 108%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(90% 90% at 92% 108%, rgba(255,205,89,0.06), transparent 55%), var(--bg-stage)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "var(--spectrum)", display: "none" }} />
      <div className="svb-reveal" style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        {/* header */}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px,1.4vw,13px)", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--text-meta)", display: "none" }}>SVBLIME presenta</span>
        <img className="svb-fest-lockup" src="assets/svblime-fest-lockup.png" alt="SVBLIME Fest" style={{ display: "block", width: "min(760px,82vw)", height: "auto", margin: "clamp(10px,1.6vw,20px) auto 0" }} />
        <p className="svb-lu-sub" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "20px", letterSpacing: "0.01em", color: "var(--text-body)", margin: "clamp(2px,0.5vw,8px) auto 0", maxWidth: "44ch", textAlign: "center" }}>Marcas, corporaciones y artistas que han confiado.</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", margin: "clamp(16px,2.4vw,28px) auto 0", display: "none" }}>
          <span style={{ width: "26px", height: "3px", background: "var(--svb-blue)" }} />
          <span style={{ width: "26px", height: "3px", background: "var(--svb-amber)" }} />
          <span style={{ width: "26px", height: "3px", background: "var(--svb-violet)" }} />
        </div>

        {/* continuous poster billing, split by day dividers */}
        <div className="svb-grad">
        {LINEUP_DAYS.map((d) => {
          const color = "rgb(" + d.tint + ")";
          return (
            <div key={d.day}>
              {dayDivider(d.day, d.label.split("·")[1] ? d.label.split("·")[1].trim() : d.label, color)}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.5vw,18px)" }}>
                <div className="svb-lu-head" style={{ fontFamily: "var(--font-display)", color: "var(--svb-white)", fontSize: "clamp(19px,3.6vw,44px)", lineHeight: 1.0, letterSpacing: "-0.02em" }}>{row(d.headliners)}</div>
                <div className="svb-lu-main" style={{ fontFamily: "var(--font-display)", color: "var(--svb-white)", fontSize: "clamp(13px,2.1vw,27px)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>{row(d.main)}</div>
                <div className="svb-lu-sup" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--text-body)", fontSize: "clamp(11px,1.3vw,15px)", letterSpacing: "0.02em" }}>{row(d.support)}</div>
              </div>
            </div>
          );
        })}
        </div>

        <div style={{ marginTop: "clamp(40px,6vw,72px)", paddingTop: "clamp(28px,4vw,44px)", borderTop: "1px solid var(--border-default)", display: "none" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,56px)", letterSpacing: "-0.02em", color: "var(--svb-white)" }}>SVBLIME.CL</span>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px,1.3vw,12px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-meta)", margin: "16px auto 0", maxWidth: "60ch", lineHeight: 1.7 }}>
            Trayectoria acumulada de los socios · participación por proyecto (visuales · iluminación · producción · contenido)
          </p>
        </div>
      </div>
      <div style={{ marginTop: "clamp(48px,7vw,88px)", overflow: "hidden", position: "relative", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
        <div style={{ display: "flex", width: "max-content", animation: "svbMarquee 34s linear infinite" }}>
          {[0, 1].map((rep) => (
            <div key={rep} aria-hidden={rep === 1} style={{ display: "flex", alignItems: "center", gap: "clamp(40px,6vw,88px)", padding: "0 clamp(20px,3vw,44px)" }}>
              {["rock-out", "claro", "muno-bx", "premios-pulsar", "flow-fest", "pailita", "vitacura", "pod", "lollapalooza", "knotfest", "carolina-herrera", "copec", "pedro-aguirre-cerda", "wailers", "pudahuel", "shishi-gang", "tecate", "stellantis", "myriam-hernandez", "akriila", "axon-pharma", "jere-klein", "billboard", "chystemc", "combo-tortuga", "provetec", "resistance", "ultra", "carin-leon", "tvn", "nanpa-basico", "blue-label", "hilaria", "polima-westcoast", "inacap", "ipchile", "lotus", "breast-cancer", "vina-fest", "shamanes", "garras-amor", "crush-music", "chevrolet", "onyx", "caja-los-andes", "huaso-olmue", "alanys-lagos", "lara-project", "armonic", "yandel-artist", "facebrooklyn", "zumbale-primo", "entel"].map((b, bi) => (
                <span key={b} className="svb-brand" style={{ ["--m"]: "url(brands/" + b + ".png)", ["--c"]: ["var(--svb-blue)", "var(--svb-amber)", "var(--svb-violet)"][bi % 3] }}><img src={"brands/" + b + ".png"} alt={b} loading="lazy" decoding="async" style={{ height: "calc(clamp(22px,2.4vw,30px) * " + ({"carolina-herrera":1.75,"vitacura":1.9,"armonic":2.0,"chevrolet":1.75,"blue-label":1.55,"hilaria":1.9,"pudahuel":1.25,"claro":1.3,"provetec":1.55,"onyx":1.5,"pod":1.2,"chystemc":1.7,"tecate":1.7,"huaso-olmue":1.6,"myriam-hernandez":1.1,"flow-fest":1.5,"jere-klein":1.1,"wailers":1.3,"zumbale-primo":1.15,"polima-westcoast":1.4,"lara-project":1.35,"nanpa-basico":1.3,"alanys-lagos":1.3,"yandel-artist":1.4,"pailita":1.15,"shamanes":1.15,"premios-pulsar":1.45,"rock-out":1.05,"knotfest":1.1,"vina-fest":1.2,"shishi-gang":1.6,"garras-amor":1.0,"combo-tortuga":1.3,"crush-music":1.4}[b] || 1) + ")", width: "auto", objectFit: "contain", opacity: 0.8, display: "block" }} /></span>
              ))}
            </div>
          ))}
        </div>
        <style>{"@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"}</style>
      </div>
    </section>
  );
}
function WorkCard({ w }) {
  const photos = w.photos || [];
  const videos = w.videos || (w.video ? [w.video] : []);
  const slides = [...videos.map((_, i) => "__video" + i + "__"), ...photos];
  const [idx, setIdx] = React.useState(0);
  const videoRef = React.useRef(null);
  const vIdx = idx < videos.length ? idx : -1;

  // Rotate through video (played full) then photos every 2s. Lazy-load images so the grid stays fluid.
  React.useEffect(() => {
    const cur = slides[idx];
    if (typeof cur === "string" && cur.indexOf("__video") === 0) {
      const v = videoRef.current;
      if (v) { try { v.currentTime = 0; } catch (e) {} const p = v.play(); if (p) p.catch(() => {}); }
      if (slides.length < 2) return; // single video → loops
      const t = setTimeout(() => setIdx((n) => (n + 1) % slides.length), 10000); // show 10s of the video
      return () => clearTimeout(t);
    }
    if (slides.length < 2) return;
    const t = setTimeout(() => setIdx((n) => (n + 1) % slides.length), 3300);
    return () => clearTimeout(t);
  }, [idx, slides.length]);

  const onVideoEnd = () => setIdx((n) => (n + 1) % slides.length);

  return (
    <Card interactive padding="0" style={{ overflow: "hidden" }}>
      <div style={{
        aspectRatio: "16/10", position: "relative", overflow: "hidden",
        background:
          "radial-gradient(90% 120% at 20% 0%, rgba(" + w.beam[0] + ",0.55), transparent 60%)," +
          "radial-gradient(90% 120% at 90% 100%, rgba(" + w.beam[1] + ",0.5), transparent 60%)," +
          "#050506",
        display: "flex", alignItems: "flex-end", padding: "16px",
      }}>
        {videos.length > 0 && (
          <video key={vIdx >= 0 ? vIdx : "last"} ref={videoRef} src={videos[vIdx >= 0 ? vIdx : 0]} muted playsInline preload="auto" loop={slides.length === 1} onEnded={onVideoEnd}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: vIdx >= 0 ? 1 : 0, transition: "opacity 600ms var(--ease-standard)" }} />
        )}
        {photos.map((src, i) => {
          const slideI = videos.length + i;
          return <img key={i} src={src} alt={w.t} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: slideI === idx ? 1 : 0, transition: "opacity 600ms var(--ease-standard)" }} />;
        })}
        <span style={{ position: "relative", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", opacity: (photos.length || videos.length) ? 0 : 1 }}>{w.cat} · foto de show</span>
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: "var(--svb-white)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{w.t}</h4>
        <p style={{ margin: "0 0 14px", fontSize: "13px", color: "var(--text-meta)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>{w.v}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {w.tags.map((t) => <Badge key={t} tone="outline">{t}</Badge>)}
        </div>
      </div>
    </Card>
  );
}
const WORK = [
  { t: "Producción general", v: "Eaton Tech Day", tags: ["Branding", "Contenido", "Producción técnica"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/eaton-1.jpg", "work/min/eaton-2.jpg", "work/min/eaton-3.jpg"] },
  { t: "Evento anual empresa", v: "Worktech", tags: ["Branding", "Contenido", "Producción técnica"], cat: "Corporativo", beam: ["143,0,255", "255,205,89"], photos: ["work/min/worktech-1.jpg", "work/min/worktech-2.jpg", "work/min/worktech-3.jpg"] },
  { t: "Charla Santo Tomás", v: "Branding Empresa", tags: ["Contenido", "Pantalla", "Branding"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/santotomas-1.jpg", "work/min/santotomas-2.jpg", "work/min/santotomas-3.jpg"] },
  { t: "Capacitación Empresa", v: "Astara", tags: ["Producción técnica", "Contenido"], cat: "Corporativo", beam: ["143,0,255", "78,169,255"], photos: ["work/min/astara-1.jpg", "work/min/astara-2.jpg", "work/min/astara-3.jpg"] },
  { t: "Walmart Chile", v: "Media Server", tags: ["Producción técnica", "Contenido visual"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/walmart-1.jpg", "work/min/walmart-2.jpg", "work/min/walmart-3.jpg"] },
  { t: "Fiesta Fin de Año", v: "Mercado Libre", tags: ["Producción", "Pantallas", "Iluminación"], cat: "Corporativo", beam: ["143,0,255", "255,205,89"], photos: ["work/min/meli-1.jpg", "work/min/meli-2.jpg", "work/min/meli-3.jpg"] },
  { t: "Colombia Travel", v: "Activación de turismo", tags: ["Producción técnica", "Operador"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/colombia-1.jpg", "work/min/colombia-2.jpg", "work/min/colombia-3.jpg"] },
  { t: "Evento Empresa", v: "Ciberseguridad", tags: ["Operador", "Contenido"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/ciberseg-1.jpg", "work/min/ciberseg-2.jpg", "work/min/ciberseg-3.jpg"] },
  { t: "Activaciones de empresas", v: "Producción técnica", tags: ["Producción", "Media Server", "Visuales"], cat: "Corporativo", beam: ["143,0,255", "255,205,89"], photos: ["work/min/activaciones-1.jpg", "work/min/activaciones-2.jpg", "work/min/activaciones-3.jpg"] },
  { t: "Junta de doctores", v: "Armonic", tags: ["Contenido", "Producción", "Broadcast"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/doctores-1.jpg", "work/min/doctores-2.jpg", "work/min/doctores-3.jpg"] },
  { t: "Dirección Video Clip", v: "Dulsónico", tags: ["Dirección de arte", "Edición"], cat: "Show", beam: ["143,0,255", "255,205,89"], video: "work/dulsonico-video.mp4" },
  { t: "Teletón 2025", v: "Gino Mella", tags: ["Dirección creativa", "Diseño", "Contenido"], cat: "TV", beam: ["78,169,255", "255,205,89"], video: "work/gino-teleton-video.mp4" },
  { t: "Festival Televisado", v: "LCT · Festival del Huaso de Olmué", tags: ["Programación", "Iluminación"], cat: "TV", beam: ["78,169,255", "255,205,89"], video: "work/televisado-video.mp4" },
  { t: "Festival del Huaso de Olmué", v: "Garras de Amor", tags: ["Operación de iluminación en vivo"], cat: "TV", beam: ["143,0,255", "78,169,255"], video: "work/garras-olmue-video.mp4" },
  { t: "Movistar Empresas", v: "HISPAM Digital Forum", tags: ["Contenido", "3D", "Dirección creativa"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], video: "work/movistar-empresas-video.mp4" },
  { t: "Banco BCI", v: "Programación de iluminación", tags: ["Código de tiempo", "Iluminación"], cat: "Corporativo", beam: ["78,169,255", "255,205,89"], videos: ["work/bci-video-2.mp4", "work/bci-video.mp4"] },
  { t: "Festival La Pampilla", v: "Pablito Pesadilla", tags: ["Iluminación", "+100.000 personas"], cat: "Show", beam: ["78,169,255", "255,205,89"], photos: ["work/min/pampilla-1.png", "work/min/pampilla-2.png", "work/min/pampilla-3.png"] },
  { t: "Iluminación y Visuales", v: "Pailita", tags: ["Diseño", "Programación", "Código de tiempo"], cat: "Show", beam: ["255,205,89", "78,169,255"], photos: ["work/min/pailita-1.png", "work/min/pailita-2.png", "work/min/pailita-3.png"] },
  { t: "Entremares", v: "Arena Monticello", tags: ["Dirección de iluminación"], cat: "Show", beam: ["255,205,89", "143,0,255"], photos: ["work/min/entremares-1.jpg", "work/min/entremares-2.jpg", "work/min/entremares-3.jpg"] },
  { t: "Movistar Arena", v: "LCT · 13 años", tags: ["Programación", "Código de tiempo"], cat: "Show", beam: ["78,169,255", "143,0,255"], photos: ["work/min/movistar13-1.jpg", "work/min/movistar13-2.jpg"] },
  { t: "Producción Técnica", v: "Video Clip", tags: ["Diseño", "Operación", "Pantalla"], cat: "Show", beam: ["143,0,255", "255,205,89"], video: "work/mesostendras-video.mp4" },
  { t: "Final ROJO TVN", v: "Iluminación en vivo", tags: ["Programación", "Iluminación", "TV"], cat: "TV", beam: ["255,205,89", "143,0,255"], video: "work/finalrojo-video.mp4" },
  { t: "Video clip en vivo", v: "La Combo Tortuga", tags: ["Programación", "Iluminación"], cat: "Show", beam: ["78,169,255", "143,0,255"], video: "work/lctenvivo-video.mp4" },
  { t: "Video clip · LCT", v: "Me Sobrabas Tú", tags: ["Programación", "Iluminación"], cat: "Show", beam: ["143,0,255", "255,205,89"], video: "work/mesobrabas-video.mp4" },
  { t: "Alanis Lago en vivo", v: "Festival del Huaso de Olmué", tags: ["Dirección creativa", "Contenido visual"], cat: "TV", beam: ["78,169,255", "255,205,89"], video: "work/alanis-video.mp4" },
  { t: "Yandel Sinfónico", v: "Festival de Viña 2025", tags: ["Operación", "Diseño", "Contenido"], cat: "TV", beam: ["143,0,255", "255,205,89"], video: "work/yandel-video.mp4" },
  { t: "Stand Publicitario", v: "Branding Chevrolet", tags: ["Pantalla", "Contenido visual", "Punto de encuentro"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], video: "work/chevrolet-video.mp4", photos: ["work/min/chevrolet-1.jpg"] },
  { t: "Hip Hop al Parque · Colombia", v: "+65.000 asistentes", tags: ["Contenido", "Luz"], cat: "Festival", beam: ["143,0,255", "255,205,89"], photos: ["work/min/hiphop-1.jpg", "work/min/hiphop-2.jpg", "work/min/hiphop-3.jpg"] },
  { t: "Meeting Empresa", v: "Icare", tags: ["Pantalla", "Producción técnica", "Operación"], cat: "Corporativo", beam: ["143,0,255", "78,169,255"], photos: ["work/min/icare-1.jpg", "work/min/icare-2.jpg", "work/min/icare-3.jpg"] },
  { t: "ChysteMC · 20 años", v: "Teatro Coliseo", tags: ["Iluminación", "Visuales"], cat: "Show", beam: ["78,169,255", "143,0,255"], photos: ["work/min/chystemc-1.jpg", "work/min/chystemc-2.jpg", "work/min/chystemc-3.jpg"] },
  { t: "Experiencia inmersiva de lujo", v: "Branding Blue Label", tags: ["Pantalla", "Operación", "Audio inmersivo"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/blue-1.jpg", "work/min/blue-2.jpg", "work/min/blue-3.jpg"] },
  { t: "Lollapalooza", v: "Lara Poyect", tags: ["Programación", "Código de tiempo"], cat: "Festival", beam: ["78,169,255", "255,205,89"], photos: ["work/min/lara-1.jpg", "work/min/lara-2.jpg", "work/min/lara-3.jpg"] },
  { t: "Conferencia Doctores", v: "Breast Cancer Summit", tags: ["Media Server", "Branding", "Producción técnica"], cat: "Corporativo", beam: ["143,0,255", "78,169,255"], photos: ["work/min/summit-1.jpg", "work/min/summit-2.jpg", "work/min/summit-3.jpg"] },
  { t: "Polima & Pailita", v: "Movistar Arena 360", tags: ["Dirección creativa", "Iluminación"], cat: "Show", beam: ["143,0,255", "78,169,255"], photos: ["work/min/polima-1.jpg", "work/min/polima-2.jpg", "work/min/polima-3.jpg"] },
  { t: "Lanzamiento de Marca", v: "Evento corporativo", tags: ["Contenido visual", "Producción técnica"], cat: "Corporativo", beam: ["78,169,255", "143,0,255"], photos: ["work/min/muno-1.jpg", "work/min/muno-2.jpg", "work/min/muno-3.jpg"] },
  { t: "Festival de Viña", v: "Polima Westcoast", tags: ["Iluminación", "TV"], cat: "TV", beam: ["78,169,255", "143,0,255"], video: "work/vina-video.mp4" },
  { t: "Cuenta Pública", v: "Municipalidades", tags: ["Operación visuales", "Producción técnica"], cat: "Corporativo", beam: ["143,0,255", "255,205,89"], photos: ["work/min/cuenta-1.jpg", "work/min/cuenta-2.jpg", "work/min/cuenta-3.jpg"] },
  { t: "Video clip · 3am", v: "La Combo Tortuga", tags: ["Diseño", "Código de tiempo"], cat: "Show", beam: ["255,205,89", "78,169,255"], video: "work/combo-video.mp4" },
  { t: "Tecate Pal Norte · México", v: "DJ Pablito Pesadilla", tags: ["Iluminación"], cat: "Show", beam: ["143,0,255", "78,169,255"], photos: ["work/min/tecate-1.jpg", "work/min/tecate-2.jpg", "work/min/tecate-3.jpg"] },
  { t: "Pablito Pesadilla", v: "Quinta Vergara", tags: ["Iluminación"], cat: "Show", beam: ["143,0,255", "78,169,255"], photos: ["work/min/rumble-1.jpg", "work/min/rumble-2.jpg", "work/min/rumble-3.jpg"] },
  { t: "DVD En Vivo", v: "La Combo Tortuga", tags: ["Diseño", "Iluminación", "Programación"], cat: "Show", beam: ["78,169,255", "255,205,89"], video: "work/dvd-video.mp4", photos: ["work/min/dvd-1.jpg", "work/min/dvd-2.jpg", "work/min/dvd-3.jpg"] },
  { t: "FaceBrooklyn", v: "Teatro Coliseo", tags: ["Diseño/Iluminación", "Programación", "Operación en vivo"], cat: "Show", beam: ["143,0,255", "255,205,89"], photos: ["work/min/face-1.jpg", "work/min/face-2.jpg"] },
];
function Trabajo() {
  const cats = ["Todo", "Corporativos", "TV y Videos", "Artistas"];
  const [cat, setCat] = useState("Todo");
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true); // true = visible
  const PER = 6;
  React.useEffect(() => {
    if (cat !== "Todo") return;
    return undefined;
  }, [cat]);
  const isVideoClip = (w) => (w.tags || []).includes("Videoclip") || /video\s?clip/i.test(w.t) || /video\s?clip/i.test(w.v || "");
  const CORP_FIRST = ["Experiencia inmersiva de lujo", "Banco BCI", "Stand Publicitario", "Meeting Empresa", "Lanzamiento de Marca", "Junta de doctores", "Conferencia Doctores", "Movistar Empresas"];
  const CORP_LAST = ["Capacitación Empresa", "Producción general"];
  const corpAll = WORK.filter((w) => w.cat === "Corporativo").slice().sort((a, b) => {
    const rank = (w) => {
      const i = CORP_FIRST.indexOf(w.t);
      if (i >= 0) return i;
      return CORP_LAST.indexOf(w.t) >= 0 ? 999 : 99;
    };
    return rank(a) - rank(b);
  });
  const TV_FIRST = ["Yandel Sinfónico", "Producción Técnica", "Final ROJO TVN", "Teletón 2025", "Video clip · 3am", "Festival de Viña"];
  const TV_LAST = ["Festival Televisado", "Festival del Huaso de Olmué"];
  const tvAll = WORK.filter((w) => w.cat === "TV" || isVideoClip(w)).slice().sort((a, b) => {
    const rank = (w) => {
      const i = TV_FIRST.indexOf(w.t);
      if (i >= 0) return i;
      return TV_LAST.indexOf(w.t) >= 0 ? 999 : 99;
    };
    return rank(a) - rank(b);
  });
  const ART_FIRST = ["Festival La Pampilla", "Iluminación y Visuales", "Movistar Arena", "DVD En Vivo", "Tecate Pal Norte · México", "Hip Hop al Parque · Colombia"];
  const artAll = WORK.filter((w) => w.cat !== "Corporativo" && w.cat !== "TV" && !isVideoClip(w)).slice().sort((a, b) => {
    const rank = (w) => { const i = ART_FIRST.indexOf(w.t); return i < 0 ? 99 : i; };
    return rank(a) - rank(b);
  });
  const [mixSeed, setMixSeed] = useState(0);
  const shuffle = React.useCallback((arr, seed) => {
    const a = arr.slice();
    let s = seed * 9301 + 49297;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }, []);
  const mixed = React.useMemo(() => {
    const pick = shuffle(corpAll.slice(0, 6), mixSeed + 1).slice(0, 4)
      .concat(shuffle(tvAll.slice(0, 6), mixSeed + 2).slice(0, 1))
      .concat(shuffle(artAll.slice(0, 6), mixSeed + 3).slice(0, 1));
    return shuffle(pick, mixSeed + 4);
  }, [mixSeed, shuffle]);
  const shown = cat === "Todo" ? mixed
    : cat === "TV y Videos" ? tvAll
    : cat === "Corporativos" ? corpAll
    : artAll;
  const pages = Math.max(1, Math.ceil(shown.length / PER));
  React.useEffect(() => { setPage(0); if (cat === "Todo") setMixSeed(Math.floor(Math.random() * 10000)); }, [cat]);
  const goToPage = React.useCallback((next) => {
    setFade(false); // fade out
    setTimeout(() => { setPage(next); setFade(true); }, 280); // swap while hidden, then fade in
  }, []);
  React.useEffect(() => {
    const AUTO_ADVANCE = true;
    if (pages <= 1 || !AUTO_ADVANCE) return;
    // 3 fotos × 3.3s ≈ 10s por tarjeta → mantener cada página ~10s para alcanzar a mostrar todas
    const id = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => { setPage((p) => (p + 1) % pages); setFade(true); }, 280);
    }, 10000);
    return () => clearInterval(id);
  }, [pages]);
  const pageItems = shown.slice(page * PER, page * PER + PER);
  return (
    <section id="trabajo" style={{ ...stage("255,205,89", "143,0,255"), padding: "var(--section-y) clamp(20px,5vw,56px)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className="svb-reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Eyebrow tickColor="var(--svb-violet)" style={{ display: "none" }}>Trayectoria · escenarios reales</Eyebrow>
            <h2 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap", margin: "-1px", padding: 0, border: 0, fontFamily: "var(--font-mono)", fontSize: "clamp(11px,1.5vw,14px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-meta)", fontWeight: 400, margin: 0 }}>
              Portafolio de eventos corporativos y experiencias en vivo
            </h2>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,5vw,52px)", color: "var(--svb-white)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Lo mejor de nuestro trabajo es verlo en acción.
            </div>
          </div>
          <div className="svb-tabs" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "7px 14px", borderRadius: "var(--radius-pill)", cursor: "pointer",
                background: cat === c ? "var(--svb-white)" : "transparent",
                color: cat === c ? "#000" : "var(--text-body)",
                border: "1px solid " + (cat === c ? "var(--svb-white)" : "var(--border-default)"),
                transition: "all var(--dur-base) var(--ease-standard)",
              }}>{c}</button>
            ))}
          </div>
        </div>
        <div className="svb-reveal svb-workgrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "16px", opacity: fade ? 1 : 0, transition: "opacity 280ms var(--ease-standard)" }}>
          {pageItems.map((w, i) => (
            <WorkCard key={page + "-" + i} w={w} />
          ))}
        </div>
        {pages > 1 && (
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "32px" }}>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => goToPage(i)} aria-label={"Página " + (i + 1)} style={{
                width: i === page ? "28px" : "10px", height: "10px", padding: 0, cursor: "pointer",
                borderRadius: "var(--radius-pill)", border: "none",
                background: i === page ? "var(--svb-white)" : "var(--border-strong)",
                transition: "width var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)",
              }} />
            ))}
          </div>
        )}
        <p style={{ marginTop: "26px", fontSize: "13px", color: "var(--text-meta)", maxWidth: "70ch", lineHeight: 1.6, display: "none" }}>
          Referencias de la trayectoria acumulada de los socios, individualmente o en colaboración.
          Cada proyecto se presenta con su nivel exacto de participación.
        </p>
      </div>
    </section>
  );
}

/* ============================ Equipo ============================ */
function Equipo() {
  return (
    <section id="equipo" style={{ padding: "var(--section-y) clamp(20px,5vw,56px)", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className="svb-reveal" style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "44px", maxWidth: "56ch" }}>
          <Eyebrow tickColor="var(--svb-blue)" style={{ display: "none" }}>Tres trayectorias · una capacidad de marca</Eyebrow>
          <h2 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap", margin: "-1px", padding: 0, border: 0, fontFamily: "var(--font-mono)", fontSize: "clamp(11px,1.5vw,14px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-meta)", fontWeight: 400, margin: 0, maxWidth: "none", width: "max-content", whiteSpace: "nowrap" }}>
            Trayectoria en producción de eventos
          </h2>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,5vw,52px)", color: "var(--svb-white)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            La experiencia nos une.
          </div>
        </div>
        <div className="svb-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px" }}>
          <FounderCard name="Jaime Lagos" role="Creatividad & Arte" accent="blue" photo="assets/team/jaime-lagos.png" hoverPhotos={["team/min/jaime-hover.png"]} disciplines={["Dirección de arte", "Contenido visual", "3D"]} />
          <FounderCard name="Luis Ulloa" role="Producción & Media Server" accent="amber" photo="assets/team/luis-ulloa.png" hoverPhotos={["team/min/luis-hover.jpg"]} disciplines={["Producción general", "Coordinación", "Visuales"]} />
          <FounderCard name="Elvis Coloma" role="Iluminación & Técnica" accent="violet" photo="assets/team/elvis-coloma.png" hoverPhotos={["team/min/elvis-2.jpg"]} disciplines={["Diseño de luz", "Programación", "Escenario"]} />
        </div>
        <div style={{ display: "none", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "24px", marginTop: "64px", paddingTop: "48px", borderTop: "1px solid var(--border-default)" }}>
          <StatBlock value="+10" label="Años en escenarios en vivo" accent="blue" />
          <StatBlock value="04" label="Pilares bajo una dirección" accent="amber" />
          <StatBlock value="03" label="Socios fundadores" accent="violet" />
          <StatBlock value="65K" label="Máx. asistentes en un show" accent="white" />
        </div>
      </div>
    </section>
  );
}

/* ============================ Contacto ============================ */
function Contacto({ formRef }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const field = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const DEST = "svblime.lab@gmail.com";
  const submit = (e) => {
    e.preventDefault();
    if (sending) return;
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) { setError("Completa nombre, email y mensaje."); return; }
    setSending(true); setError("");
    const data = new FormData();
    data.append("Nombre", form.nombre);
    data.append("Email", form.email);
    data.append("Mensaje", form.mensaje);
    data.append("_subject", "Nuevo contacto desde svblime.cl - " + form.nombre);
    data.append("_template", "table");
    data.append("_captcha", "false");
    fetch("https://formsubmit.co/ajax/" + DEST, { method: "POST", body: data })
      .then(function (r) { return r.json().catch(function () { return { success: r.ok ? "true" : "false" }; }); })
      .then(function (j) {
        if (String(j.success) === "true" || (j.message && /success/i.test(j.message))) { setSent(true); }
        else { setError((j.message || "No pudimos enviar el mensaje.") + " Escríbenos directo a " + DEST + "."); }
      })
      .catch(function (err) {
        setError("No pudimos enviar el mensaje (" + (err && err.message ? err.message : "error de red") + "). Escríbenos directo a " + DEST + ".");
      })
      .then(function () { setSending(false); });
  };
  const inputStyle = {
    width: "100%", padding: "13px 14px", background: "var(--surface-input)",
    border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)",
    color: "var(--svb-white)", fontFamily: "var(--font-sans)", fontSize: "15px", outline: "none",
  };
  return (
    <section id="contacto" ref={formRef} style={{ ...stage("143,0,255", "78,169,255"), padding: "var(--section-y) clamp(20px,5vw,56px)" }}>
      <div className="svb-reveal" style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
        <QuoteBlock size="lg">
          Tu idea, cuidada desde el concepto hasta la experiencia final.
        </QuoteBlock>
        <div>
          {sent ? (
            <Card style={{ padding: "40px" }}>
              <Eyebrow tickColor="var(--svb-violet)">Recibido</Eyebrow>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--svb-white)", margin: "16px 0 8px", letterSpacing: "-0.01em" }}>Gracias por escribirnos.</p>
              <p style={{ margin: 0, color: "var(--text-body)", lineHeight: 1.6 }}>Revisamos la idea general y te proponemos una bajada clara y realista.</p>
            </Card>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="svb-eyebrow" style={{ display: "block", marginBottom: "8px" }}>Nombre</label>
                <input style={inputStyle} value={form.nombre} onChange={(e) => field("nombre", e.target.value)} placeholder="Tu nombre" required />
              </div>
              <div>
                <label className="svb-eyebrow" style={{ display: "block", marginBottom: "8px" }}>Email</label>
                <input style={inputStyle} type="email" value={form.email} onChange={(e) => field("email", e.target.value)} placeholder="tu@correo.com" required />
              </div>
              <div>
                <label className="svb-eyebrow" style={{ display: "block", marginBottom: "8px" }}>Cuéntanos la idea</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "96px" }} value={form.mensaje} onChange={(e) => field("mensaje", e.target.value)} placeholder="Objetivo del evento, público, lugar, fecha…" />
              </div>
              <Button variant="secondary" size="lg" type="submit" onClick={submit} disabled={sending} style={{ marginTop: "6px", alignSelf: "flex-start", opacity: sending ? 0.6 : 1, pointerEvents: sending ? "none" : "auto" }}>{sending ? "Enviando…" : "Enviar"}</Button>
              {error ? (<p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: 1.6, color: "var(--svb-amber)" }}>{error} <a href={"mailto:" + DEST} style={{ color: "var(--svb-blue)" }}>Abrir correo</a></p>) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================ Footer ============================ */
function BrandMarquee() {
  return (
    <div style={{ background: "var(--bg-stage)", borderTop: "1px solid var(--border-default)", padding: "clamp(28px,4vw,48px) 0", overflow: "hidden", position: "relative", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div style={{ display: "flex", width: "max-content", animation: "svbMarquee 34s linear infinite" }}>
        {[0, 1].map((rep) => (
          <div key={rep} aria-hidden={rep === 1} style={{ display: "flex", alignItems: "center", gap: "clamp(40px,6vw,88px)", padding: "0 clamp(20px,3vw,44px)" }}>
            {["rock-out", "claro", "muno-bx", "premios-pulsar", "flow-fest", "pailita", "vitacura", "pod", "lollapalooza", "knotfest", "carolina-herrera", "copec", "pedro-aguirre-cerda", "wailers", "pudahuel", "shishi-gang", "tecate", "stellantis", "myriam-hernandez", "akriila", "axon-pharma", "jere-klein", "billboard", "chystemc", "combo-tortuga", "provetec", "resistance", "ultra", "carin-leon", "tvn", "nanpa-basico", "blue-label", "hilaria", "polima-westcoast", "inacap", "ipchile", "lotus", "breast-cancer", "vina-fest", "shamanes", "garras-amor", "crush-music", "chevrolet", "onyx", "caja-los-andes", "huaso-olmue", "alanys-lagos", "lara-project", "armonic", "yandel-artist", "facebrooklyn", "zumbale-primo", "entel"].map((b, bi) => (
              <span key={b} className="svb-brand" style={{ ["--m"]: "url(brands/" + b + ".png)", ["--c"]: ["var(--svb-blue)", "var(--svb-amber)", "var(--svb-violet)"][bi % 3] }}><img src={"brands/" + b + ".png"} alt={b} loading="lazy" decoding="async" style={{ height: "calc(clamp(22px,2.4vw,30px) * " + ({"carolina-herrera":1.75,"vitacura":1.9,"armonic":2.0,"chevrolet":1.75,"blue-label":1.55,"hilaria":1.9,"pudahuel":1.25,"claro":1.3,"provetec":1.55,"onyx":1.5,"pod":1.2,"chystemc":1.7,"tecate":1.7,"huaso-olmue":1.6,"myriam-hernandez":1.1,"flow-fest":1.5,"jere-klein":1.1,"wailers":1.3,"zumbale-primo":1.15,"polima-westcoast":1.4,"lara-project":1.35,"nanpa-basico":1.3,"alanys-lagos":1.3,"yandel-artist":1.4,"pailita":1.15,"shamanes":1.15,"premios-pulsar":1.45,"rock-out":1.05,"knotfest":1.1,"vina-fest":1.2,"shishi-gang":1.6,"garras-amor":1.0,"combo-tortuga":1.3,"crush-music":1.4}[b] || 1) + ")", width: "auto", objectFit: "contain", opacity: 0.8, display: "block" }} /></span>
            ))}
          </div>
        ))}
      </div>
      <style>{"@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"}</style>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--bg-stage)", borderTop: "1px solid var(--border-default)" }}>
      <SpectrumBar thickness={4} />
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "48px clamp(20px,5vw,56px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--svb-white)", maxWidth: "620px" }}>
          SVBLIME existe para que ninguna gran idea se pierda.
        </p>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-meta)" }}>
          Chile · 2026
        </p>
      </div>
    </footer>
  );
}

/* ============================ SiteSeo ============================ */
function SiteSeo() {
  const [loading, setLoading] = React.useState(!SKIP_INTRO);
  const goContact = () => { window.location.hash = "#contacto"; };
  React.useEffect(() => {
    if (loading) { document.body.style.overflow = "hidden"; window.scrollTo(0, 0); }
  }, [loading]);
  // Deep link from the service pages (e.g. index.html#trabajo): once the intro releases
  // the scroll lock, jump to the requested section.
  React.useEffect(() => {
    const h = window.location.hash;
    if (!h || h.length < 2) return;
    // #galeria: land on the top photo/video gallery and start the navigation from there.
    if (h === "#galeria") { window.scrollTo(0, 0); return; }
    let tries = 0;
    const id = setInterval(() => {
      const el = document.querySelector(h);
      if (el && document.body.style.overflow !== "hidden") {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 70, behavior: "smooth" });
        clearInterval(id);
      }
      if (++tries > 150) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, []);
  // Scroll-reveal: elements animate in as they enter, and back out as they leave —
  // in both scroll directions. Direction sets whether they rise or sink.
  React.useEffect(() => {
    let lastY = window.scrollY;
    const io = new IntersectionObserver((entries) => {
      const goingDown = window.scrollY >= lastY;
      lastY = window.scrollY;
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("out-up", "out-down");
          e.target.classList.add("in");
        } else {
          e.target.classList.remove("in");
          e.target.classList.add(goingDown ? "out-up" : "out-down");
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    const scan = () => document.querySelectorAll(".svb-reveal").forEach((el) => io.observe(el));
    scan();
    const t = setTimeout(scan, 400);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [loading]);
  return (
    <div style={{ background: "var(--bg-page)", minHeight: "100vh" }}>
      <style>{".svb-reveal{opacity:0;transform:translateY(40px) scale(0.985);transition:opacity 850ms cubic-bezier(0.16,1,0.3,1),transform 850ms cubic-bezier(0.16,1,0.3,1)}.svb-reveal.in{opacity:1;transform:none}.svb-reveal.out-up{opacity:0;transform:translateY(-40px) scale(0.985)}.svb-reveal.out-down{opacity:0;transform:translateY(40px) scale(0.985)}@media(prefers-reduced-motion:reduce){.svb-reveal{opacity:1!important;transform:none!important}}.svb-gcap{opacity:0;transition:opacity 280ms ease}.svb-gitem:hover .svb-gcap{opacity:1;transition:opacity 320ms ease 700ms}.svb-gitem:hover img,.svb-gitem:hover video{opacity:1!important}"}</style>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Header onCta={goContact} />
      <Hero />
      <section id="agencia" style={{ position: "relative", overflow: "hidden", padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)", background: "radial-gradient(90% 80% at 12% 0%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(80% 90% at 92% 100%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(70% 70% at 60% 40%, rgba(255,205,89,0.05), transparent 60%), var(--bg-page)", borderTop: "1px solid var(--border-soft)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "var(--spectrum)", opacity: 0.9 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "4px", background: "var(--spectrum)", opacity: 0.9 }} />
        <div style={{ margin: "0 auto" }}>
          <div className="svb-reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center", marginInline: "auto" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,52px)", color: "var(--svb-white)", lineHeight: 1.06, letterSpacing: "-0.02em", margin: 0 }}>
              <span style={{ color: "var(--text-muted)", fontSize: "45px", display: "none", letterSpacing: "-0.01em" }}>Va más allá de las luces, pantallas y la producción.</span>
              Lo que merece ser recordado,<br />lo hacemos realidad.
            </p>
            <p style={{ margin: 0, fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: "var(--text-body)" }}>
              Transformamos tus ideas en experiencias que inspiran, conectan e impactan, con un propósito: <em>hacerlas inolvidables.</em>
            </p>
          </div>
        </div>
      </section>
      <Pilares />
      <LineUp />
      <Trabajo />
      <Equipo />
      <Contacto />
      <Footer />
    </div>
  );
}

window.SiteSeo = SiteSeo;
