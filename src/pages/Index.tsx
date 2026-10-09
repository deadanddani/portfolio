import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "@/styles/cinematic-blueprint.css";
import { LANGS, useLang, type Text } from "@/i18n";

const BASE = import.meta.env.BASE_URL;
const asset = (p: string) => `${BASE}${p}`;

const CB_PROFILE = {
  name: "Daniel Vadillo",
  role: { en: "Software Architect", es: "Arquitecto de software" },
  tagline: "I design systems that don't crumble at scale.",
  email: "daniel.vadillo.1q@gmail.com",
  linkedin: "https://www.linkedin.com/in/daniel-vadillo-rand-8b95b11b6/",
};

const LIVE: Text = { en: "Live", es: "Activo" };
const CONNECT_LINKEDIN: Text = { en: "Connect on LinkedIn", es: "Conecta en LinkedIn" };

const CB_STATS: { value: number; suffix: string; label: Text }[] = [
  { value: 6, suffix: "", label: { en: "Years designing & shipping software", es: "Años diseñando y entregando software" } },
  { value: 9, suffix: "", label: { en: "Certifications", es: "Certificaciones" } },
  { value: 5, suffix: "", label: { en: "Side projects shipped", es: "Proyectos personales lanzados" } },
  { value: 3, suffix: "", label: { en: "Architecture principles I live by", es: "Principios de arquitectura que sigo" } },
];

type TimelineItem = {
  year: string;
  company: string;
  role: Text;
  note: Text;
  bullets?: Text[];
  logo: string;
  location?: Text;
  period: Text;
  current?: boolean;
};

const CB_TIMELINE: TimelineItem[] = [
  {
    year: "2025",
    company: "Northius",
    role: { en: "Senior Salesforce Engineer", es: "Ingeniero Salesforce sénior" },
    note: {
      en: "As a Senior Software Engineer, I am responsible for designing and delivering scalable backend solutions focused on observability, reliability, and long-term maintainability.",
      es: "Como Senior Software Engineer, soy responsable de diseñar y entregar soluciones backend escalables centradas en la observabilidad, la fiabilidad y la mantenibilidad a largo plazo.",
    },
    bullets: [
      {
        en: "Leveraging AI-driven workflows to enhance software development processes, improving productivity and efficiency while maintaining high standards of code quality and system reliability.",
        es: "Aprovecho flujos de trabajo basados en IA para mejorar los procesos de desarrollo de software, aumentando la productividad y la eficiencia sin renunciar a altos estándares de calidad del código y fiabilidad de los sistemas.",
      },
      {
        en: "Implementing end-to-end observability solutions for centralized logging, monitoring, and operational visibility across distributed systems.",
        es: "Implemento soluciones de observabilidad de extremo a extremo para el registro centralizado, la monitorización y la visibilidad operativa en sistemas distribuidos.",
      },
      {
        en: "Designing and developing microservices and integrations between internal and external platforms.",
        es: "Diseño y desarrollo microservicios e integraciones entre plataformas internas y externas.",
      },
      {
        en: "Building resilient and sustainable systems capable of handling high traffic volumes.",
        es: "Construyo sistemas resilientes y sostenibles capaces de gestionar grandes volúmenes de tráfico.",
      },
      {
        en: "Improving delivery workflows, increasing reliability, and supporting continuous improvement practices.",
        es: "Mejoro los flujos de entrega, aumentando la fiabilidad e impulsando prácticas de mejora continua.",
      },
    ],
    logo: asset("assets/northius.jfif"),
    location: { en: "Madrid · Remote", es: "Madrid · Remoto" },
    period: { en: "May 2025 — present", es: "may 2025 — actualidad" },
    current: true,
  },
  {
    year: "2023",
    company: "CoverWallet (Aon)",
    role: { en: "Mid Salesforce Developer", es: "Desarrollador Salesforce (Mid)" },
    note: {
      en: "As a Mid Salesforce Developer, I worked in a highly skilled engineering environment where I had the opportunity to learn from experienced professionals while contributing to end-to-end feature development.",
      es: "Como Mid Salesforce Developer, trabajé en un entorno de ingeniería muy cualificado donde tuve la oportunidad de aprender de profesionales con experiencia mientras contribuía al desarrollo de funcionalidades de principio a fin.",
    },
    bullets: [
      {
        en: "Developed and delivered complete Salesforce-based solutions.",
        es: "Desarrollé y entregué soluciones completas basadas en Salesforce.",
      },
      {
        en: "Worked within established engineering processes, quickly adapting to existing workflows, standards, and team practices.",
        es: "Trabajé dentro de procesos de ingeniería consolidados, adaptándome rápidamente a los flujos de trabajo, estándares y prácticas del equipo.",
      },
      {
        en: "Gained a strong understanding of how high-performing engineering teams operate, including planning, collaboration, code reviews, and delivery management.",
        es: "Adquirí un conocimiento sólido de cómo funcionan los equipos de ingeniería de alto rendimiento: planificación, colaboración, revisiones de código y gestión de entregas.",
      },
      {
        en: "Contributed to a microservices-based architecture with event-driven communication between systems, ensuring scalable, decoupled, and resilient integrations.",
        es: "Contribuí a una arquitectura de microservicios con comunicación basada en eventos entre sistemas, garantizando integraciones escalables, desacopladas y resilientes.",
      },
    ],
    logo: asset("assets/coverwallet.png"),
    location: { en: "Hybrid", es: "Híbrido" },
    period: { en: "Mar 2023 — May 2025", es: "mar 2023 — may 2025" },
  },
  {
    year: "2020",
    company: "IZERTIS",
    role: { en: "Salesforce Developer", es: "Desarrollador Salesforce" },
    note: {
      en: "First chapter — integration projects across multiple enterprise clients, production support, and releases.",
      es: "Primer capítulo: proyectos de integración para varios clientes empresariales, soporte en producción y lanzamientos de versiones.",
    },
    logo: asset("assets/izertis.png"),
    period: { en: "Jun 2020 — Apr 2023", es: "jun 2020 — abr 2023" },
  },
];

type ProjectMetric = { k: Text; v: Text };
type Project = {
  title: Text;
  tagline: Text;
  desc: Text;
  url: Text;
  href: string;
  stack: Text[];
  metrics: ProjectMetric[];
  live?: boolean;
  aiFree?: boolean;
  images: string[];
  isMobile?: boolean;
};

const K = {
  domain: { en: "domain", es: "dominio" },
  format: { en: "format", es: "formato" },
  status: { en: "status", es: "estado" },
  platform: { en: "platform", es: "plataforma" },
  privacy: { en: "privacy", es: "privacidad" },
  safety: { en: "safety", es: "seguridad" },
  adoption: { en: "adoption", es: "adopción" },
  type: { en: "type", es: "tipo" },
  engine: { en: "engine", es: "motor" },
  loop: { en: "loop", es: "bucle" },
  validation: { en: "validation", es: "validación" },
} satisfies Record<string, Text>;

const CB_PROJECTS: Project[] = [
  {
    title: "HackTheLink",
    tagline: { en: "Auto-solves LinkedIn puzzle games, locally.", es: "Resuelve automáticamente los juegos de LinkedIn, en local." },
    desc: {
      en: "A Chrome extension that reads the current LinkedIn Games puzzle straight off the page and solves it in your browser — no servers, no external calls, no data leaving the tab. Published on the Chrome Web Store and running fully client-side, so the whole solve happens locally and privately.",
      es: "Una extensión de Chrome que lee el puzzle actual de LinkedIn Games directamente de la página y lo resuelve en tu navegador: sin servidores, sin llamadas externas y sin que ningún dato salga de la pestaña. Publicada en la Chrome Web Store y ejecutándose íntegramente en el cliente, así que toda la resolución ocurre en local y de forma privada.",
    },
    url: "chromewebstore.google.com/detail/hackthelink",
    href: "https://chromewebstore.google.com/detail/hackthelink/cnjbclmejcnobblbdnagogijahpndmpa",
    stack: ["Chrome Extension", "TypeScript", "DOM parsing", "Solver"],
    metrics: [
      { k: K.platform, v: "Chrome Web Store" },
      { k: K.privacy, v: { en: "100% local", es: "100% local" } },
      { k: K.status, v: LIVE },
    ],
    live: true,
    aiFree: true,
    images: [asset("assets/hackthelink-1.jpg"), asset("assets/hackthelink-2.jpg"), asset("assets/hackthelink-3.jpg"), asset("assets/hackthelink-4.jpg")],
  },
  {
    title: "MCPs for Salesforce CLI",
    tagline: { en: "Safe AI interactions with Salesforce orgs.", es: "Interacciones seguras de IA con orgs de Salesforce." },
    desc: {
      en: "Open-source set of Model Context Protocol servers that lets AI assistants interact with Salesforce environments in a safe, controlled way. Production and any environment you flag are hard-blocked, so the model can act against orgs without putting sensitive data or live deployments at risk. Already adopted by a large part of my team for day-to-day Salesforce work.",
      es: "Conjunto open source de servidores Model Context Protocol que permite a los asistentes de IA interactuar con entornos de Salesforce de forma segura y controlada. Producción y cualquier entorno que marques quedan bloqueados, de modo que el modelo puede actuar sobre las orgs sin poner en riesgo datos sensibles ni despliegues en producción. Ya lo usa buena parte de mi equipo en su trabajo diario con Salesforce.",
    },
    url: "github.com/deadanddani/MCPs_for_Salesforce_CLI",
    href: "https://github.com/deadanddani/MCPs_for_Salesforce_CLI",
    stack: ["TypeScript", "MCP", "Salesforce CLI", "Node.js"],
    metrics: [
      { k: K.domain, v: { en: "Salesforce · AI tooling", es: "Salesforce · Herramientas de IA" } },
      { k: K.safety, v: { en: "Prod & flagged orgs blocked", es: "Prod y orgs marcadas bloqueadas" } },
      { k: K.adoption, v: { en: "Used across my team", es: "Usado en todo mi equipo" } },
    ],
    live: true,
    images: [asset("assets/mcp-1.png")],
  },
  {
    title: "Find Me Today",
    tagline: { en: "A daily geography duel.", es: "Un duelo diario de geografía." },
    desc: {
      en: "Players race against friends to pinpoint a random location on the planet, every single day. Built solo end-to-end.",
      es: "Los jugadores compiten con sus amigos para localizar un punto aleatorio del planeta, cada día. Desarrollado en solitario de principio a fin.",
    },
    url: "findmetoday.es",
    href: "https://www.findmetoday.es",
    stack: ["Angular", "Astro", "TypeScript", "Geolocation API"],
    metrics: [{ k: K.format, v: { en: "Daily challenge", es: "Reto diario" } }, { k: K.status, v: LIVE }],
    aiFree: true,
    live: true,
    images: [asset("assets/findmetoday-1.png"), asset("assets/findmetoday-2.png"), asset("assets/findmetoday-3.png")],
  },
  {
    title: { en: "Find Me Today — Mobile", es: "Find Me Today — Móvil" },
    tagline: { en: "Native port, archived.", es: "Versión nativa, archivada." },
    desc: {
      en: "Ionic + Capacitor port. Pulled from stores due to maintenance overhead, but a fun delivery exercise.",
      es: "Versión con Ionic + Capacitor. Retirada de las tiendas por el coste de mantenimiento, pero fue un ejercicio de entrega divertido.",
    },
    url: { en: "Archived", es: "Archivado" },
    href: "",
    stack: ["Ionic", "Capacitor", "Node.js"],
    metrics: [{ k: K.format, v: { en: "Mobile", es: "Móvil" } }, { k: K.status, v: { en: "Archived", es: "Archivado" } }],
    aiFree: true,
    images: [asset("assets/findmetoday-mobile-1.webp"), asset("assets/findmetoday-mobile-2.webp"), asset("assets/findmetoday-mobile-3.webp")],
    isMobile: true,
  },
  {
    title: "Gym Tracker",
    tagline: { en: "A pocket logbook for the gym.", es: "Un cuaderno de entrenamiento de bolsillo." },
    desc: {
      en: "Personal PWA built with Next.js — a web app that behaves like a native one on iPhone, so I can log every set, rep, and weight straight from the rack with no app store and no friction. The real win is owning the data: I can analyse it, spot plateaus, and keep iterating on the app itself. I run it for friends and family too, and I keep adding recaps and friendly competitions between us.",
      es: "PWA personal hecha con Next.js: una web app que se comporta como una nativa en iPhone, para registrar cada serie, repetición y peso directamente desde el rack, sin tienda de apps y sin fricción. Lo mejor es que los datos son míos: puedo analizarlos, detectar estancamientos y seguir iterando sobre la propia app. También la usan amigos y familia, y sigo añadiendo resúmenes y competiciones amistosas entre nosotros.",
    },
    url: "Personal · PWA",
    href: "",
    stack: ["Next.js", "React", "PWA", "iOS"],
    metrics: [{ k: K.type, v: "Personal" }, { k: K.platform, v: "PWA · iOS" }],
    live: true,
    images: [asset("assets/gymtracker-1.jpeg"), asset("assets/gymtracker-2.jpeg"), asset("assets/gymtracker-3.jpeg"), asset("assets/gymtracker-4.jpeg"), asset("assets/gymtracker-5.jpeg")],
    isMobile: true,
  },
  {
    title: "Trip Planner AI",
    tagline: { en: "An AI can now plan your trip.", es: "Ahora una IA puede planificar tu viaje." },
    desc: {
      en: "Personalised trip planning powered by an LLM. Caches popular regions for instant suggestions and SEO. To keep the project sustainable long-term, it currently runs on a budget-tier model — output quality may be degraded compared to flagship LLMs.",
      es: "Planificación de viajes personalizada con un LLM. Cachea las regiones populares para ofrecer sugerencias instantáneas y mejorar el SEO. Para que el proyecto sea sostenible a largo plazo, ahora funciona con un modelo económico, así que la calidad de las respuestas puede ser inferior a la de los LLM de gama alta.",
    },
    url: "tripplannerai.es",
    href: "https://www.tripplannerai.es",
    stack: ["React", "Node.js", "OpenAI", "SEO"],
    metrics: [{ k: K.engine, v: { en: "LLM-backed", es: "Basado en LLM" } }, { k: K.status, v: LIVE }],
    live: true,
    images: [asset("assets/tripplanner-1.png"), asset("assets/tripplanner-2.png"), asset("assets/tripplanner-3.png")],
  },
  {
    title: "Polymarket Edge Bot",
    tagline: { en: "Front-running BTC sentiment, programmatically.", es: "Anticipándose al sentimiento del BTC, de forma programática." },
    desc: {
      en: "A Rust-powered bot that ingests live Bitcoin order-book and on-chain signals, models short-horizon probabilities, and places positions on Polymarket before the market reprices. Backed by a statistical pipeline and simulations to validate real-world edge before any capital goes in.",
      es: "Un bot en Rust que procesa en tiempo real señales del libro de órdenes y on-chain de Bitcoin, modela probabilidades a corto plazo y abre posiciones en Polymarket antes de que el mercado reajuste los precios. Respaldado por un pipeline estadístico y simulaciones para validar una ventaja real antes de invertir capital.",
    },
    url: { en: "Personal · Quant experiment", es: "Personal · Experimento cuantitativo" },
    href: "",
    stack: ["Rust", "WebSockets", { en: "Statistics & simulations", es: "Estadística y simulaciones" }, "Polymarket API", { en: "On-chain data", es: "Datos on-chain" }],
    metrics: [
      { k: K.domain, v: { en: "Crypto · Prediction markets", es: "Cripto · Mercados de predicción" } },
      { k: K.loop, v: { en: "Real-time", es: "Tiempo real" } },
      { k: K.validation, v: { en: "Simulated PnL", es: "PnL simulado" } },
    ],
    live: true,
    images: [asset("assets/polybot-1.png"), asset("assets/polybot-2.png"), asset("assets/polybot-3.png")],
  },
];

type Tier = "architect" | "ai" | "developer";
// Certification names are Salesforce's official (English) titles and are not translated.
type Cert = { name: string; img: string; tier: Tier; year: string };

const TIER_LABEL: Record<Tier, Text> = {
  architect: { en: "architect", es: "arquitecto" },
  ai: { en: "ai", es: "IA" },
  developer: { en: "developer", es: "desarrollador" },
};

const CB_CERTS: Cert[] = [
  { name: "Platform Development Lifecycle & Deployment Architect", img: asset("assets/cert-deployment.png"), tier: "architect", year: "2026" },
  { name: "Platform Integration Architect", img: asset("assets/cert-integration.png"), tier: "architect", year: "2026" },
  { name: "Application Architect", img: asset("assets/cert-app-architect.png"), tier: "architect", year: "2021" },
  { name: "Data Architect", img: asset("assets/cert-data-architect.png"), tier: "architect", year: "2021" },
  { name: "Sharing & Visibility Architect", img: asset("assets/cert-sharing.png"), tier: "architect", year: "2021" },
  { name: "Agentforce Specialist", img: asset("assets/cert-agentforce.png"), tier: "ai", year: "2025" },
  { name: "AI Associate", img: asset("assets/cert-ai.png"), tier: "ai", year: "2023" },
  { name: "Platform Developer I", img: asset("assets/cert-dev1.png"), tier: "developer", year: "2021" },
  { name: "Platform App Builder", img: asset("assets/cert-app-builder.png"), tier: "developer", year: "2021" },
];

function useCounter(target: number, start: boolean, dur = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, dur]);
  return v;
}

function CBHero() {
  const { lang, t } = useLang();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="cb-hero">
      <div className="cb-hero-grid" style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }} />
      <div className="cb-hero-glow" style={{ transform: `translate3d(${-parallax.x * 1.5}px, ${-parallax.y * 1.5}px, 0)` }} />

      <div className="cb-hero-meta">
        <span className="cb-meta-dot" />
        <span>{t({ en: "Open to architecture roles · 2026", es: "Abierto a puestos de arquitectura · 2026" })}</span>
      </div>

      {lang === "es" ? (
        <h1 className="cb-hero-title">
          <span className="cb-hero-line">Diseño</span>
          <span className="cb-hero-line cb-hero-emph">sistemas de software</span>
          <span className="cb-hero-line">que no se desmoronan al escalar.</span>
        </h1>
      ) : (
        <h1 className="cb-hero-title">
          <span className="cb-hero-line">I design</span>
          <span className="cb-hero-line cb-hero-emph">software systems</span>
          <span className="cb-hero-line">that don't crumble at scale.</span>
        </h1>
      )}

      {lang === "es" ? (
        <p className="cb-hero-sub">
          Daniel Vadillo — Arquitecto de software con 6 años en equipos empresariales europeos.
          Actualmente lidero la arquitectura y la IA en <span className="cb-hi">Northius</span>.
        </p>
      ) : (
        <p className="cb-hero-sub">
          Daniel Vadillo — Software Architect with 6 years across enterprise EU teams.
          Currently leading architecture &amp; AI at <span className="cb-hi">Northius</span>.
        </p>
      )}

      <div className="cb-hero-cta">
        <a className="cb-btn cb-btn-primary" href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer">
          {t(CONNECT_LINKEDIN)}
          <span className="cb-arrow">→</span>
        </a>
        <a className="cb-btn" href="#cb-projects">{t({ en: "See my work", es: "Ver mi trabajo" })}</a>
      </div>

      <div className="cb-hero-corner cb-corner-tl" />
      <div className="cb-hero-corner cb-corner-tr" />
      <div className="cb-hero-corner cb-corner-bl" />
      <div className="cb-hero-corner cb-corner-br" />
    </section>
  );
}

function CBStat({ stat, start, delay }: { stat: typeof CB_STATS[number]; start: boolean; delay: number }) {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);
  const v = useCounter(stat.value, ready);
  return (
    <div className={`cb-stat ${ready ? "in" : ""}`}>
      <div className="cb-stat-num">{v}<span className="cb-stat-suffix">{stat.suffix}</span></div>
      <div className="cb-stat-label">{t(stat.label)}</div>
    </div>
  );
}

function CBStats() {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="cb-stats">
      {CB_STATS.map((s, i) => <CBStat key={i} stat={s} start={seen} delay={i * 120} />)}
    </section>
  );
}

function CBProject({ project, index }: { project: Project; index: number }) {
  const { t } = useLang();
  const title = t(project.title);
  const [imgIdx, setImgIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [lbDragX, setLbDragX] = useState(0);
  const [lbAnimating, setLbAnimating] = useState(false);
  const [lbWidth, setLbWidth] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1024);
  const lbStageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const dragRef = useRef<{ startX: number; active: boolean; pointerId: number; moved: boolean } | null>(null);
  const lbDragRef = useRef<{ startX: number; active: boolean; pointerId: number; moved: boolean } | null>(null);
  const idleRef = useRef<number | null>(null);
  const total = project.images.length;

  useLayoutEffect(() => {
    if (!lightbox) return;
    const update = () => setLbWidth(lbStageRef.current?.offsetWidth || window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [lightbox]);

  const onLbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (lbAnimating) return;
    if ((e.target as HTMLElement).closest("button")) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    lbDragRef.current = { startX: e.clientX, active: true, pointerId: e.pointerId, moved: false };
    setLbDragX(0);
  };
  const onLbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!lbDragRef.current?.active) return;
    const dx = e.clientX - lbDragRef.current.startX;
    if (Math.abs(dx) > 3) lbDragRef.current.moved = true;
    setLbDragX(dx);
  };
  const onLbPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!lbDragRef.current?.active) return;
    const dx = e.clientX - lbDragRef.current.startX;
    const moved = lbDragRef.current.moved;
    lbDragRef.current.active = false;
    if (!moved) {
      setLbDragX(0);
      return;
    }
    const threshold = Math.min(80, lbWidth * 0.12);
    const target = dx <= -threshold ? -lbWidth : dx >= threshold ? lbWidth : 0;
    setLbAnimating(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLbDragX(target));
    });
  };
  const onLbTransitionEnd = () => {
    if (!lbAnimating) return;
    if (lbDragX <= -lbWidth + 1) setImgIdx((i) => (i + 1) % total);
    else if (lbDragX >= lbWidth - 1) setImgIdx((i) => (i - 1 + total) % total);
    setLbDragX(0);
    setLbAnimating(false);
  };

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => setFrameWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const advance = (dir = 1) => {
    if (animating || dragRef.current?.active || total < 2 || frameWidth === 0) return;
    setAnimating(true);
    const target = dir > 0 ? -frameWidth : frameWidth;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDragX(target));
    });
  };

  const scheduleIdle = () => {
    if (idleRef.current) clearTimeout(idleRef.current);
    if (total < 2 || lightbox) return;
    idleRef.current = window.setTimeout(() => advance(1), 5000);
  };

  useEffect(() => {
    scheduleIdle();
    return () => { if (idleRef.current) clearTimeout(idleRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgIdx, frameWidth, total, lightbox]);

  const goTo = (i: number) => {
    setImgIdx(((i % total) + total) % total);
    scheduleIdle();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (animating) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, active: true, pointerId: e.pointerId, moved: false };
    setDragX(0);
    if (idleRef.current) clearTimeout(idleRef.current);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current?.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 3) dragRef.current.moved = true;
    setDragX(dx);
  };
  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current?.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const moved = dragRef.current.moved;
    dragRef.current.active = false;
    if (!moved) {
      setDragX(0);
      setLightbox(true);
      if (idleRef.current) clearTimeout(idleRef.current);
      return;
    }
    const threshold = Math.min(60, frameWidth * 0.15);
    const target = dx <= -threshold ? -frameWidth : dx >= threshold ? frameWidth : 0;
    setAnimating(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDragX(target));
    });
  };
  const onTransitionEnd = () => {
    if (!animating) return;
    if (dragX <= -frameWidth + 1) {
      setImgIdx((i) => (i + 1) % total);
    } else if (dragX >= frameWidth - 1) {
      setImgIdx((i) => (i - 1 + total) % total);
    }
    setDragX(0);
    setAnimating(false);
  };

  const reverse = index % 2 === 1;
  const dragging = !!dragRef.current?.active;
  const showAdjacent = dragging || animating;
  const prevIdx = (imgIdx - 1 + total) % total;
  const nextIdx = (imgIdx + 1) % total;

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowRight") setImgIdx((i) => (i + 1) % total);
      else if (e.key === "ArrowLeft") setImgIdx((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, total]);

  return (
    <article
      className={`cb-project ${reverse ? "reverse" : ""} ${project.isMobile ? "is-mobile" : ""}`}
    >
      <div className="cb-proj-visual">
        <div
          ref={frameRef}
          className="cb-proj-frame"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          style={{ touchAction: "pan-y", cursor: dragging ? "grabbing" : "zoom-in" }}
        >
          {project.images.map((src, i) => {
            let translate = 0;
            let visible = false;
            if (i === imgIdx) { translate = dragX; visible = true; }
            else if (showAdjacent && i === nextIdx) { translate = dragX + frameWidth; visible = true; }
            else if (showAdjacent && i === prevIdx) { translate = dragX - frameWidth; visible = true; }
            const onEnd = i === imgIdx ? onTransitionEnd : undefined;
            return (
              <div
                key={src}
                className="cb-proj-slide"
                onTransitionEnd={onEnd}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: `translateX(${translate}px)`,
                  transition: dragging || !visible ? "none" : "transform .3s ease, opacity .3s ease",
                  pointerEvents: "none",
                }}
              >
                <img className="cb-proj-bg" src={src} alt="" loading="lazy" draggable={false} aria-hidden="true" />
                <img className="cb-proj-fg" src={src} alt="" loading="lazy" draggable={false} />
              </div>
            );
          })}
          <div className="cb-proj-bp" />
          {total > 1 && (
            <div className="cb-proj-dots">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`cb-proj-dot ${i === imgIdx ? "is-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`${t({ en: "Show image", es: "Mostrar imagen" })} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        {total > 1 && (
          <div className="cb-proj-thumbs">
            {project.images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`cb-proj-thumb ${i === imgIdx ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`${t({ en: "Image", es: "Imagen" })} ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
        <div className="cb-proj-index">{t({ en: "PROJECT", es: "PROYECTO" })} / 0{index + 1}</div>
      </div>

      <div className="cb-proj-content">
        <div className="cb-proj-tag">{t(project.tagline)}</div>
        <h3 className="cb-proj-title">
          {title}
          {project.live && <span className="cb-proj-badge cb-proj-badge-live" title={t({ en: "Currently live", es: "Actualmente en funcionamiento" })}>{t(LIVE)}</span>}
          {project.aiFree && <span className="cb-proj-badge" title={t({ en: "No AI involved in this build", es: "Desarrollado sin IA" })}>{t({ en: "AI-free", es: "Sin IA" })}</span>}
        </h3>
        <p className="cb-proj-desc">{t(project.desc)}</p>

        <dl className="cb-proj-meta">
          {project.metrics.map((m) => (
            <div key={t(m.k)} className="cb-meta-row">
              <dt>{t(m.k)}</dt>
              <dd>{t(m.v)}</dd>
            </div>
          ))}
          <div className="cb-meta-row">
            <dt>stack</dt>
            <dd>{project.stack.map(t).join(" · ")}</dd>
          </div>
        </dl>

        {project.href ? (
          <a className="cb-proj-link" href={project.href} target="_blank" rel="noreferrer">
            {t(project.url)} <span className="cb-arrow">↗</span>
          </a>
        ) : (
          <span className="cb-proj-link cb-proj-link-muted">{t(project.url)}</span>
        )}
      </div>

      {lightbox && (() => {
        const lbDragging = !!lbDragRef.current?.active;
        const lbShowAdj = lbDragging || lbAnimating;
        return (
          <div
            className="cb-lightbox"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — ${t({ en: "image", es: "imagen" })} ${imgIdx + 1}`}
          >
            <button
              type="button"
              className="cb-lb-close"
              onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
              aria-label={t({ en: "Close", es: "Cerrar" })}
            >×</button>
            <button
              type="button"
              className="cb-lb-nav cb-lb-prev"
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + total) % total); }}
              aria-label={t({ en: "Previous", es: "Anterior" })}
            >‹</button>
            <div
              ref={lbStageRef}
              className="cb-lb-stage"
              onClick={(e) => {
                const stage = lbStageRef.current;
                if (!stage) return;
                const imgs = stage.querySelectorAll<HTMLImageElement>(".cb-lb-img");
                const active = imgs[imgIdx];
                if (!active) return;
                const r = active.getBoundingClientRect();
                if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
                  e.stopPropagation();
                }
              }}
              onPointerDown={onLbPointerDown}
              onPointerMove={onLbPointerMove}
              onPointerUp={onLbPointerEnd}
              onPointerCancel={onLbPointerEnd}
              style={{ touchAction: "pan-y", cursor: lbDragging ? "grabbing" : "grab" }}
            >
              {project.images.map((src, i) => {
                let translate = 0;
                let visible = false;
                if (i === imgIdx) { translate = lbDragX; visible = true; }
                else if (lbShowAdj && i === nextIdx) { translate = lbDragX + lbWidth; visible = true; }
                else if (lbShowAdj && i === prevIdx) { translate = lbDragX - lbWidth; visible = true; }
                const onEnd = i === imgIdx ? onLbTransitionEnd : undefined;
                return (
                  <img
                    key={src}
                    className="cb-lb-img"
                    src={src}
                    alt=""
                    draggable={false}
                    onTransitionEnd={onEnd}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: `translate(-50%, -50%) translateX(${translate}px)`,
                      transition: lbDragging || !visible ? "none" : "transform .3s ease, opacity .3s ease",
                      pointerEvents: "none",
                    }}
                  />
                );
              })}
            </div>
            <button
              type="button"
              className="cb-lb-nav cb-lb-next"
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % total); }}
              aria-label={t({ en: "Next", es: "Siguiente" })}
            >›</button>
            <div className="cb-lb-counter">{imgIdx + 1} / {total}</div>
          </div>
        );
      })()}
    </article>
  );
}

function CBTimeline() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.4;
      const passed = Math.max(0, vh - r.top);
      setProgress(Math.min(1, Math.max(0, passed / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} className="cb-timeline">
      <div className="cb-tl-spine">
        <div className="cb-tl-spine-fill" style={{ height: `${progress * 100}%` }} />
      </div>
      {CB_TIMELINE.map((item, i) => (
        <div key={i} className={`cb-tl-item ${item.current ? "is-current" : ""}`} style={{ transitionDelay: `${i * 50}ms` }}>
          <div className="cb-tl-year">
            {item.year}
            {item.current && <span className="cb-tl-now">{t({ en: "Now", es: "Ahora" })}</span>}
          </div>
          <div className="cb-tl-marker" />
          <div className="cb-tl-card">
            <div className="cb-tl-card-head">
              {item.logo ? (
                <div className="cb-tl-logo"><img src={item.logo} alt={item.company} /></div>
              ) : (
                <div className="cb-tl-logo cb-tl-logo-placeholder" aria-label="logo placeholder">
                  <span>{item.company?.[0] || "?"}</span>
                </div>
              )}
              <div>
                <div className="cb-tl-company">{item.company}</div>
                <div className="cb-tl-role">{t(item.role)}</div>
              </div>
            </div>
            {item.period && <div className="cb-tl-period">{t(item.period)}{item.location ? ` · ${t(item.location)}` : ""}</div>}
            <div className="cb-tl-note">{t(item.note)}</div>
            {item.bullets && (
              <ul className="cb-tl-bullets">
                {item.bullets.map((b, bi) => <li key={bi}>{t(b)}</li>)}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CBCerts() {
  const { t } = useLang();
  return (
    <div className="cb-certs">
      {CB_CERTS.map((c, i) => (
        <div key={c.name} className={`cb-cert tier-${c.tier}`} style={{ animationDelay: `${i * 60}ms` }}>
          <div className="cb-cert-img-wrap">
            {c.img ? (
              <img src={c.img} alt={c.name} loading="lazy" />
            ) : (
              <div className="cb-cert-placeholder" aria-label="Salesforce certification logo placeholder">
                <span>SF</span>
              </div>
            )}
          </div>
          <div className="cb-cert-tier">{t(TIER_LABEL[c.tier])}</div>
          <div className="cb-cert-name">{c.name}</div>
          <div className="cb-cert-year">{c.year}</div>
        </div>
      ))}
    </div>
  );
}

function CBSection({ id, num, kicker, title, sub, children }: { id: string; num: string; kicker: Text; title: Text; sub?: Text; children: React.ReactNode }) {
  const { t } = useLang();
  return (
    <section id={id} className="cb-section">
      <div className="cb-section-head">
        <div className="cb-section-num">{num}</div>
        <div className="cb-section-kicker">{t(kicker)}</div>
        <h2 className="cb-section-title">{t(title)}</h2>
        {sub && <p className="cb-section-sub">{t(sub)}</p>}
      </div>
      {children}
    </section>
  );
}

function CBLangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="cb-lang" role="group" aria-label={t({ en: "Language", es: "Idioma" })}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          className="cb-lang-opt"
          aria-pressed={lang === l}
          aria-label={l === "en" ? "English" : "Español"}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const Index = () => {
  const { t } = useLang();
  return (
    <div className="cb-root">
      <div className="cb-bg-grid" />
      <div className="cb-bg-vignette" />

      <header className="cb-nav">
        <div className="cb-nav-brand">
          <span className="cb-nav-logo">DV</span>
          <div className="cb-nav-name">
            <span>Daniel Vadillo</span>
            <span className="cb-nav-role">{t(CB_PROFILE.role)}</span>
          </div>
        </div>
        <div className="cb-nav-end">
          <nav className="cb-nav-links">
            <a href="#cb-experience">{t({ en: "Experience", es: "Experiencia" })}</a>
            <a href="#cb-projects">{t({ en: "Projects", es: "Proyectos" })}</a>
            <a href="#cb-certs">{t({ en: "Certifications", es: "Certificaciones" })}</a>
            <a href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer" className="cb-nav-cta">LinkedIn →</a>
          </nav>
          <CBLangToggle />
        </div>
      </header>

      <main className="cb-main">
        <CBHero />
        <CBStats />

        <CBSection
          id="cb-experience"
          num="01"
          kicker={{ en: "Career", es: "Trayectoria" }}
          title={{ en: "Six years, three chapters.", es: "Seis años, tres capítulos." }}
          sub={{ en: "Each step deeper into systems architecture.", es: "Cada paso, más a fondo en la arquitectura de sistemas." }}
        >
          <CBTimeline />
        </CBSection>

        <CBSection
          id="cb-projects"
          num="02"
          kicker={{ en: "Side projects", es: "Proyectos personales" }}
          title={{ en: "Things I ship on weekends.", es: "Lo que lanzo los fines de semana." }}
          sub={{ en: "Each one has been live, built solo end-to-end.", es: "Todos han estado en producción, desarrollados en solitario de principio a fin." }}
        >
          <div className="cb-projects">
            {CB_PROJECTS.map((p, i) => <CBProject key={p.href || p.images[0]} project={p} index={i} />)}
          </div>
        </CBSection>

        <CBSection
          id="cb-certs"
          num="03"
          kicker={{ en: "Trust marks", es: "Credenciales" }}
          title={{ en: "Three distinct architecture domains.", es: "Tres dominios de arquitectura distintos." }}
          sub={{ en: "Application, Data, Integration — the credentials behind the practice.", es: "Aplicación, Datos, Integración: las certificaciones que respaldan la práctica." }}
        >
          <CBCerts />
        </CBSection>

        <section className="cb-cta">
          <div className="cb-cta-inner">
            <div className="cb-cta-kicker">{t({ en: "Let's talk", es: "Hablemos" })}</div>
            <h2 className="cb-cta-title">{t({ en: "Need an architect who's actually shipped?", es: "¿Buscas un arquitecto que de verdad haya llevado proyectos a producción?" })}</h2>
            <p className="cb-cta-sub">{t({ en: "Open to software architecture, platform, and AI integration work.", es: "Abierto a proyectos de arquitectura de software, plataforma e integración de IA." })}</p>
            <div className="cb-cta-row">
              <a className="cb-btn cb-btn-primary" href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer">
                {t(CONNECT_LINKEDIN)} <span className="cb-arrow">→</span>
              </a>
              <a className="cb-btn" href={`mailto:${CB_PROFILE.email}`}>{CB_PROFILE.email}</a>
            </div>
          </div>
        </section>

        <footer className="cb-footer">
          <span>© {new Date().getFullYear()} Daniel Vadillo</span>
          <span>·</span>
          <span>{t({ en: "Spain", es: "España" })}</span>
          <span>·</span>
          <a href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </footer>
      </main>
    </div>
  );
};

export default Index;
