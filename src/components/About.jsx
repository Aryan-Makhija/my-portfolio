"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Code2, Server, Database, Cloud, Sparkles } from "lucide-react";

function Counter({ to, suffix = "+" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v) + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { n: 0, l: "Years Development" },
  { n: 6, l: "Projects Shipped" },
  { n: 290, l: "DSA Problems" },
];

// angle in degrees around the orbit
const nodes = [
  { label: "Frontend", icon: Code2, a: -88 },
  { label: "Backend", icon: Server, a: -8 },
  { label: "Database", icon: Database, a: 52 },
  { label: "Cloud", icon: Cloud, a: 128 },
  { label: "AI", icon: Sparkles, a: 196 },
];

export default function About() {
  const R = 38; // % radius
  return (
    <section id="about" className="relative py-28">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-lime/[0.07] blur-[140px]" />
      <div className="section grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Who I am</p>
          <h2 className="h2 mt-4 max-w-[12ch] md:text-6xl">Building products from idea to production.</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            I&apos;m a Full Stack Developer focused on building production-ready web applications with strong frontend
            experiences and scalable backend architectures. I care about data models, latency and the details users
            actually feel.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -4 }}
                className="card card-hover p-4"
              >
                <p className="font-display text-3xl font-bold text-lime"><Counter to={s.n} /></p>
                <p className="mt-1 text-xs text-muted">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* orbit card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="card relative aspect-square w-full overflow-hidden !border-lime/30"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,243,70,0.18),transparent_55%)]" />
          {[38, 60, 82].map((s, i) => (
            <div key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" style={{ width: `${s}%`, height: `${s}%` }}>
              {i === 1 && <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_12px_#a3f346]" />}
            </div>
          ))}

          {/* rotating node ring */}
          <div className="absolute inset-0 animate-orbit">
            {nodes.map((n) => {
              const rad = (n.a * Math.PI) / 180;
              return (
                <div key={n.label} className="absolute" style={{ left: `${50 + R * Math.cos(rad)}%`, top: `${50 + R * Math.sin(rad)}%`, transform: "translate(-50%,-50%)" }}>
                  {/* counter-rotate so labels stay upright */}
                  <div className="animate-orbit-rev [animation-duration:40s] [animation-direction:reverse]">
                    <motion.div whileHover={{ scale: 1.15 }} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                      <n.icon size={12} className="text-lime" /> {n.label}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-bg px-5 py-3 text-center shadow-[0_0_50px_rgba(163,243,70,0.25)]"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Core</p>
            <p className="font-display text-sm font-semibold">Full Stack</p>
          </motion.div>
        </motion.div>
      </div>
      <p className="section mt-10 font-mono text-[11px] uppercase tracking-[0.4em] text-muted/60">Full stack development</p>
    </section>
  );
}
