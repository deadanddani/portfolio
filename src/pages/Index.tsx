import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "@/styles/cinematic-blueprint.css";

const BASE = import.meta.env.BASE_URL;
const asset = (p: string) => `${BASE}${p}`;

const CB_PROFILE = {
  name: "Daniel Vadillo",
  role: "Software Architect",
  tagline: "I design systems that don't crumble at scale.",
  email: "daniel.vadillo.1q@gmail.com",
  linkedin: "https://www.linkedin.com/in/daniel-vadillo-rand-8b95b11b6/",
};

const CB_STATS = [
  { value: 6, suffix: "", label: "Years designing & shipping software" },
  { value: 9, suffix: "", label: "Certifications" },
  { value: 5, suffix: "", label: "Side projects shipped" },
  { value: 3, suffix: "", label: "Architecture principles I live by" },
];

type TimelineItem = {
  year: string;
  company: string;
  role: string;
  note: string;
  logo: string;
  location?: string;
  period: string;
  current?: boolean;
};

const CB_TIMELINE: TimelineItem[] = [
  { year: "2025", company: "Northius", role: "Senior Salesforce Engineer", note: "Architecture, integration, and AI initiatives across the EdTech platform.", logo: asset("assets/northius.jfif"), location: "Madrid · Remote", period: "May 2025 — present", current: true },
  { year: "2024", company: "CoverWallet (Aon)", role: "Mid Salesforce Developer", note: "Event-driven integrations on insurance flows for the EU market — designing how Salesforce talks to internal microservices in near real time.", logo: asset("assets/coverwallet.png"), location: "Hybrid", period: "Sept 2024 — May 2025" },
  { year: "2023", company: "CoverWallet (Aon)", role: "Junior Salesforce Developer", note: "Joined to focus on integration between Salesforce and internal microservices.", logo: asset("assets/coverwallet.png"), location: "Hybrid", period: "Mar 2023 — Oct 2024" },
  { year: "2020", company: "IZERTIS", role: "Salesforce Developer", note: "First chapter — integration projects across multiple enterprise clients, production support, and releases.", logo: asset("assets/izertis.png"), period: "Jun 2020 — Apr 2023" },
];

type ProjectMetric = { k: string; v: string };
type Project = {
  title: string;
  tagline: string;
  desc: string;
  url: string;
  href: string;
  stack: string[];
  metrics: ProjectMetric[];
  live?: boolean;
  aiFree?: boolean;
  images: string[];
  isMobile?: boolean;
};

const CB_PROJECTS: Project[] = [
  {
    title: "MCPs for Salesforce CLI",
    tagline: "Safe AI interactions with Salesforce orgs.",
    desc: "Open-source set of Model Context Protocol servers that lets AI assistants interact with Salesforce environments in a safe, controlled way. Production and any environment you flag are hard-blocked, so the model can act against orgs without putting sensitive data or live deployments at risk. Already adopted by a large part of my team for day-to-day Salesforce work.",
    url: "github.com/deadanddani/MCPs_for_Salesforce_CLI",
    href: "https://github.com/deadanddani/MCPs_for_Salesforce_CLI",
    stack: ["TypeScript", "MCP", "Salesforce CLI", "Node.js"],
    metrics: [
      { k: "domain", v: "Salesforce · AI tooling" },
      { k: "safety", v: "Prod & flagged orgs blocked" },
      { k: "adoption", v: "Used across my team" },
    ],
    live: true,
    images: [asset("assets/mcp-1.png")],
  },
  {
    title: "Polymarket Edge Bot",
    tagline: "Front-running BTC sentiment, programmatically.",
    desc: "A Rust-powered bot that ingests live Bitcoin order-book and on-chain signals, models short-horizon probabilities, and places positions on Polymarket before the market reprices. Backed by a statistical pipeline and simulations to validate real-world edge before any capital goes in.",
    url: "Personal · Quant experiment",
    href: "",
    stack: ["Rust", "WebSockets", "Statistics & simulations", "Polymarket API", "On-chain data"],
    metrics: [
      { k: "domain", v: "Crypto · Prediction markets" },
      { k: "loop", v: "Real-time" },
      { k: "validation", v: "Simulated PnL" },
    ],
    live: true,
    images: [asset("assets/polybot-1.png"), asset("assets/polybot-2.png"), asset("assets/polybot-3.png")],
  },
  {
    title: "Find Me Today",
    tagline: "A daily geography duel.",
    desc: "Players race against friends to pinpoint a random location on the planet, every single day. Built solo end-to-end.",
    url: "findmetoday.es",
    href: "https://www.findmetoday.es",
    stack: ["Angular", "Astro", "TypeScript", "Geolocation API"],
    metrics: [{ k: "format", v: "Daily challenge" }, { k: "status", v: "Live" }],
    aiFree: true,
    live: true,
    images: [asset("assets/findmetoday-1.png"), asset("assets/findmetoday-2.png"), asset("assets/findmetoday-3.png")],
  },
  {
    title: "Find Me Today — Mobile",
    tagline: "Native port, archived.",
    desc: "Ionic + Capacitor port. Pulled from stores due to maintenance overhead, but a fun delivery exercise.",
    url: "Archived",
    href: "",
    stack: ["Ionic", "Capacitor", "Node.js"],
    metrics: [{ k: "format", v: "Mobile" }, { k: "status", v: "Archived" }],
    aiFree: true,
    images: [asset("assets/findmetoday-mobile-1.webp"), asset("assets/findmetoday-mobile-2.webp"), asset("assets/findmetoday-mobile-3.webp")],
    isMobile: true,
  },
  {
    title: "Gym Tracker",
    tagline: "A pocket logbook for the gym.",
    desc: "Personal PWA built with Next.js — a web app that behaves like a native one on iPhone, so I can log every set, rep, and weight straight from the rack with no app store and no friction. The real win is owning the data: I can analyse it, spot plateaus, and keep iterating on the app itself. I run it for friends and family too, and I keep adding recaps and friendly competitions between us.",
    url: "Personal · PWA",
    href: "",
    stack: ["Next.js", "React", "PWA", "iOS"],
    metrics: [{ k: "type", v: "Personal" }, { k: "platform", v: "PWA · iOS" }],
    live: true,
    images: [asset("assets/gymtracker-1.jpeg"), asset("assets/gymtracker-2.jpeg"), asset("assets/gymtracker-3.jpeg"), asset("assets/gymtracker-4.jpeg"), asset("assets/gymtracker-5.jpeg")],
    isMobile: true,
  },
  {
    title: "Trip Planner AI",
    tagline: "An AI can now plan your trip.",
    desc: "Personalised trip planning powered by an LLM. Caches popular regions for instant suggestions and SEO. To keep the project sustainable long-term, it currently runs on a budget-tier model — output quality may be degraded compared to flagship LLMs.",
    url: "tripplannerai.es",
    href: "https://www.tripplannerai.es",
    stack: ["React", "Node.js", "OpenAI", "SEO"],
    metrics: [{ k: "engine", v: "LLM-backed" }, { k: "status", v: "Live" }],
    live: true,
    images: [asset("assets/tripplanner-1.png"), asset("assets/tripplanner-2.png"), asset("assets/tripplanner-3.png")],
  },
];

type Cert = { name: string; img: string; tier: "architect" | "ai" | "developer"; year: string };

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
        <span>Open to architecture roles · 2026</span>
      </div>

      <h1 className="cb-hero-title">
        <span className="cb-hero-line">I design</span>
        <span className="cb-hero-line cb-hero-emph">software systems</span>
        <span className="cb-hero-line">that don't crumble at scale.</span>
      </h1>

      <p className="cb-hero-sub">
        Daniel Vadillo — Software Architect with 6 years across enterprise EU teams.
        Currently leading architecture &amp; AI at <span className="cb-hi">Northius</span>.
      </p>

      <div className="cb-hero-cta">
        <a className="cb-btn cb-btn-primary" href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer">
          Connect on LinkedIn
          <span className="cb-arrow">→</span>
        </a>
        <a className="cb-btn" href="#cb-projects">See my work</a>
      </div>

      <div className="cb-hero-corner cb-corner-tl" />
      <div className="cb-hero-corner cb-corner-tr" />
      <div className="cb-hero-corner cb-corner-bl" />
      <div className="cb-hero-corner cb-corner-br" />
    </section>
  );
}

function CBStat({ stat, start, delay }: { stat: typeof CB_STATS[number]; start: boolean; delay: number }) {
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
      <div className="cb-stat-label">{stat.label}</div>
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
                  aria-label={`Show image ${i + 1}`}
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
                aria-label={`Image ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
        <div className="cb-proj-index">PROJECT / 0{index + 1}</div>
      </div>

      <div className="cb-proj-content">
        <div className="cb-proj-tag">{project.tagline}</div>
        <h3 className="cb-proj-title">
          {project.title}
          {project.live && <span className="cb-proj-badge cb-proj-badge-live" title="Currently live">Live</span>}
          {project.aiFree && <span className="cb-proj-badge" title="No AI involved in this build">AI-free</span>}
        </h3>
        <p className="cb-proj-desc">{project.desc}</p>

        <dl className="cb-proj-meta">
          {project.metrics.map((m) => (
            <div key={m.k} className="cb-meta-row">
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
          <div className="cb-meta-row">
            <dt>stack</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
        </dl>

        {project.href ? (
          <a className="cb-proj-link" href={project.href} target="_blank" rel="noreferrer">
            {project.url} <span className="cb-arrow">↗</span>
          </a>
        ) : (
          <span className="cb-proj-link cb-proj-link-muted">{project.url}</span>
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
            aria-label={`${project.title} — image ${imgIdx + 1}`}
          >
            <button
              type="button"
              className="cb-lb-close"
              onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
              aria-label="Close"
            >×</button>
            <button
              type="button"
              className="cb-lb-nav cb-lb-prev"
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + total) % total); }}
              aria-label="Previous"
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
              aria-label="Next"
            >›</button>
            <div className="cb-lb-counter">{imgIdx + 1} / {total}</div>
          </div>
        );
      })()}
    </article>
  );
}

function CBTimeline() {
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
            {item.current && <span className="cb-tl-now">Now</span>}
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
                <div className="cb-tl-role">{item.role}</div>
              </div>
            </div>
            {item.period && <div className="cb-tl-period">{item.period}{item.location ? ` · ${item.location}` : ""}</div>}
            <div className="cb-tl-note">{item.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CBCerts() {
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
          <div className="cb-cert-tier">{c.tier}</div>
          <div className="cb-cert-name">{c.name}</div>
          <div className="cb-cert-year">{c.year}</div>
        </div>
      ))}
    </div>
  );
}

function CBSection({ id, num, kicker, title, sub, children }: { id: string; num: string; kicker: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="cb-section">
      <div className="cb-section-head">
        <div className="cb-section-num">{num}</div>
        <div className="cb-section-kicker">{kicker}</div>
        <h2 className="cb-section-title">{title}</h2>
        {sub && <p className="cb-section-sub">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

const Index = () => {
  return (
    <div className="cb-root">
      <div className="cb-bg-grid" />
      <div className="cb-bg-vignette" />

      <header className="cb-nav">
        <div className="cb-nav-brand">
          <span className="cb-nav-logo">DV</span>
          <div className="cb-nav-name">
            <span>Daniel Vadillo</span>
            <span className="cb-nav-role">{CB_PROFILE.role}</span>
          </div>
        </div>
        <nav className="cb-nav-links">
          <a href="#cb-projects">Projects</a>
          <a href="#cb-experience">Experience</a>
          <a href="#cb-certs">Certifications</a>
          <a href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer" className="cb-nav-cta">LinkedIn →</a>
        </nav>
      </header>

      <main className="cb-main">
        <CBHero />
        <CBStats />

        <CBSection id="cb-projects" num="01" kicker="Side projects" title="Things I ship on weekends." sub="Each one has been live, built solo end-to-end.">
          <div className="cb-projects">
            {CB_PROJECTS.map((p, i) => <CBProject key={p.title} project={p} index={i} />)}
          </div>
        </CBSection>

        <CBSection id="cb-experience" num="02" kicker="Career" title="Six years, three chapters." sub="Each step deeper into systems architecture.">
          <CBTimeline />
        </CBSection>

        <CBSection id="cb-certs" num="03" kicker="Trust marks" title="Three distinct architecture domains." sub="Application, Data, Integration — the credentials behind the practice.">
          <CBCerts />
        </CBSection>

        <section className="cb-cta">
          <div className="cb-cta-inner">
            <div className="cb-cta-kicker">Let's talk</div>
            <h2 className="cb-cta-title">Need an architect who's actually shipped?</h2>
            <p className="cb-cta-sub">Open to software architecture, platform, and AI integration work.</p>
            <div className="cb-cta-row">
              <a className="cb-btn cb-btn-primary" href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn <span className="cb-arrow">→</span>
              </a>
              <a className="cb-btn" href={`mailto:${CB_PROFILE.email}`}>{CB_PROFILE.email}</a>
            </div>
          </div>
        </section>

        <footer className="cb-footer">
          <span>© {new Date().getFullYear()} Daniel Vadillo</span>
          <span>·</span>
          <span>Spain</span>
          <span>·</span>
          <a href={CB_PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </footer>
      </main>
    </div>
  );
};

export default Index;
