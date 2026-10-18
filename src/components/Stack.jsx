"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const techCategories = [
  { key: "Frontend", items: ["React", "Next.js", "JavaScript", "Tailwind"], n: "04" },
  { key: "Backend", items: ["Node.js", "Express", "REST APIs","Authentication"], n: "04" },
  { key: "Database", items: ["PostgreSQL", "MongoDB", "Vector Database" ,"Redis"], n: "04" },
  { key: "DevOps", items: ["Docker","Nginx", "Git", "Github"], n: "04" },
  { key: "AI/GenAI", items: ["RAG", "Langchain.js", "Gemini API", "Vector Embeddings", "Semantic Search", "Reranking"], n: "06" },
];

// ---- graph geometry (SVG viewBox is 400 x 400, centre = 200,200) ----
const C = 200;
const BADGE_R = 145; // distance from centre to each badge
const LINE_START = 38; // line starts outside the centre node
const LINE_END = 129; // line stops before the badge edge

const polar = (i, r) => {
  const angle = (i / techCategories.length) * Math.PI * 2 - Math.PI / 2;
  return { x: C + Math.cos(angle) * r, y: C + Math.sin(angle) * r };
};

export default function Stack() {
  const [active, setActive] = useState(null);
  const [hover, setHover] = useState(false);

  // gentle auto-cycle until the user hovers the list
  useEffect(() => {
    if (hover) return;
    let i = 0;
    const t = setInterval(() => {
      setActive(techCategories[i % techCategories.length].key);
      i++;
    }, 2200);
    return () => clearInterval(t);
  }, [hover]);

  return (
    <section id="stack" className="relative py-28">
      <div className="section">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="eyebrow">My toolbox</p>
          <h2 className="h2 mx-auto mt-4 max-w-[12ch]">An ecosystem, not a checklist.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Everything connects back to one thing: shipping products that hold up in production.
          </p>
        </motion.div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          {/* ───────────── network graph ───────────── */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
            {/* dashed lines (background layer) */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 400 400"
              aria-hidden="true"
            >
              {techCategories.map((cat, i) => {
                const a = polar(i, LINE_START);
                const b = polar(i, LINE_END);
                const isActive = active === cat.key;
                return (
                  <motion.line
                    key={cat.key}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="currentColor"
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    className={`transition-colors duration-300 ${isActive ? "text-lime" : "text-white/20"}`}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* badges + centre node (foreground layer) */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {techCategories.map((cat, i) => {
                const p = polar(i, BADGE_R);
                const isActive = active === cat.key;
                return (
                  <motion.span
                    key={cat.key}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    onMouseEnter={() => setActive(cat.key)}
                    className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      isActive
                        ? "border-lime bg-[#314123] text-lime shadow-[0_0_24px_rgba(163,243,70,0.35)]" /* opaque = line never shows through */
                        : "border-white/10 bg-card text-muted"
                    }`}
                    style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
                  >
                    {cat.key}
                  </motion.span>
                );
              })}

              {/* central hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-bg px-5 py-3 text-center shadow-[0_0_40px_rgba(163,243,70,0.12)]">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Node</p>
                <p className="font-display text-sm font-semibold text-fg">Full Stack Developer</p>
              </div>
            </div>
          </div>

          {/* ───────────── category list ───────────── */}
          <div
            className="space-y-3"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false);
              setActive(null);
            }}
          >
            {techCategories.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                onMouseEnter={() => setActive(cat.key)}
                className={`card p-5 ${active === cat.key ? "!border-lime/60 bg-lime/[0.04]" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold">{cat.key}</h3>
                  <span className="font-mono text-[10px] text-muted">{cat.n}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((t) => (
                    <span key={t} className="chip rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}