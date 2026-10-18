"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const groups = [
  { key: "Frontend", items: ["React", "Next.js", "JavaScript", "Tailwind"], n: "04" },
  { key: "Backend", items: ["Node.js", "Express", "REST APIs"], n: "03" },
  { key: "Database", items: ["PostgreSQL", "MongoDB", "Redis"], n: "03" },
  { key: "DevOps", items: ["Docker", "Git", "AWS"], n: "03" },
  { key: "AI", items: ["RAG", "LLM APIs", "AI Agents"], n: "03" },
];

// node positions inside a 400x360 viewBox (centre = 200,180)
const pos = {
  Frontend: { x: 200, y: 40 },
  Backend: { x: 340, y: 130 },
  Database: { x: 290, y: 300 },
  DevOps: { x: 110, y: 300 },
  AI: { x: 60, y: 130 },
};

export default function Stack() {
  const [active, setActive] = useState(null);
  const [hover, setHover] = useState(false);

  // gentle auto-cycle until the user interacts
  useEffect(() => {
    if (hover) return;
    let i = 0;
    const t = setInterval(() => { setActive(groups[i % groups.length].key); i++; }, 2200);
    return () => clearInterval(t);
  }, [hover]);

  return (
    <section id="stack" className="relative py-28">
      <div className="section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <p className="eyebrow">My toolbox</p>
          <h2 className="h2 mx-auto mt-4 max-w-[12ch]">An ecosystem, not a checklist.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">Everything connects back to one thing: shipping products that hold up in production.</p>
        </motion.div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          {/* network graph */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <svg viewBox="0 0 400 360" className="w-full">
              {groups.map((g) => {
                const p = pos[g.key];
                const on = active === g.key;
                return (
                  <motion.line
                    key={g.key}
                    x1="200" y1="180" x2={p.x} y2={p.y}
                    stroke={on ? "#a3f346" : "rgba(255,255,255,0.12)"}
                    strokeWidth={on ? 2 : 1}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1 }}
                  />
                );
              })}
            </svg>
            {groups.map((g) => {
              const p = pos[g.key];
              const on = active === g.key;
              return (
                <motion.span
                  key={g.key}
                  animate={{ scale: on ? 1.1 : 1 }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    on ? "border-lime bg-lime/20 text-lime shadow-[0_0_24px_rgba(163,243,70,0.35)]" : "border-white/10 bg-card text-muted"
                  }`}
                  style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 360) * 100}%` }}
                >
                  {g.key}
                </motion.span>
              );
            })}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-bg px-5 py-3 text-center shadow-[0_0_40px_rgba(163,243,70,0.12)]">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Node</p>
              <p className="font-display text-sm font-semibold">Full Stack Developer</p>
            </div>
          </div>

          {/* category list */}
          <div className="space-y-3" onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setActive(null); }}>
            {groups.map((g, i) => (
              <motion.div
                key={g.key}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                onMouseEnter={() => setActive(g.key)}
                className={`card p-5 ${active === g.key ? "!border-lime/60 bg-lime/[0.04]" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold">{g.key}</h3>
                  <span className="font-mono text-[10px] text-muted">{g.n}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">{g.items.map((t) => <span key={t} className="chip rounded-md">{t}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
