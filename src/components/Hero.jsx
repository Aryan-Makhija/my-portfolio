"use client";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, Briefcase, Layers, Terminal, ArrowDown } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const code = [
  [{ t: "// shipping products, not demos", c: "text-muted" }],
  [{ t: "const ", c: "text-fg" }, { t: "engineer", c: "text-fg" }, { t: " = {", c: "text-fg" }],
  [{ t: "  role: ", c: "text-lime" }, { t: '"Full Stack Developer"', c: "text-lime" }, { t: ",", c: "text-fg" }],
  [{ t: "  stack: ", c: "text-lime" }, { t: '["Next.js", "Node", "Postgres"]', c: "text-lime" }, { t: ",", c: "text-fg" }],
  [{ t: "  focus: ", c: "text-lime" }, { t: '["APIs", "caching", "RAG"]', c: "text-lime" }, { t: ",", c: "text-fg" }],
  [{ t: "  async ", c: "text-cyan-code" }, { t: "build(idea) {", c: "text-cyan-code" }],
  [{ t: "    return await ", c: "text-violet-code" }, { t: "ship(idea)", c: "text-violet-code" }],
  [{ t: "  },", c: "text-cyan-code" }],
  [{ t: "}", c: "text-fg" }],
];

export default function Hero() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 1.28]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.92], [1, 0.88, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.85], [0, 18]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section id="home" ref={wrapRef} className="relative h-[155vh] sm:h-[165vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ scale, opacity, filter }}
          className="relative w-full origin-center will-change-transform"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(163,243,70,0.16),transparent_65%)]" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[320px] w-[320px] animate-drift rounded-full bg-lime/[0.07] blur-[120px] sm:h-[420px] sm:w-[420px]" />

          <motion.div variants={container} initial="hidden" animate="show" className="section grid gap-3 pt-24 pb-16 sm:gap-4 sm:pt-28 md:pb-20 lg:grid-cols-12">
            <motion.div variants={item} className="card relative flex flex-col justify-center p-5 sm:p-8 lg:col-span-7 lg:row-span-2 lg:p-10">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-lime sm:mb-5 sm:text-[11px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Open to product roles
              </span>
              <p className="font-mono text-xs text-muted sm:text-sm">
                <span className="text-cyan-code">$</span> <span className="text-lime">whoami</span> — Aryan Makhija
              </p>
              <h1 className="mt-3 font-display text-[2.35rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Full Stack
                <br />
                <span className="text-lime">Developer</span>
              </h1>
              <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
                I build scalable web applications, intelligent products and reliable backend systems.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-lime">
                  View My Work <ArrowUpRight size={15} />
                </a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-ghost">
                  <Mail size={15} /> Contact Me
                </a>
              </div>
            </motion.div>

            <motion.div variants={item} className="card min-w-0 overflow-hidden lg:col-span-5 lg:row-span-2">
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5 sm:py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#b3343c]" />
                <span className="h-3 w-3 rounded-full bg-[#6cae3a]" />
                <span className="ml-1 font-mono text-xs text-muted">developer.ts</span>
              </div>
              <div className="overflow-x-auto px-4 py-4 font-mono text-[11px] leading-[1.95] sm:px-5 sm:py-5 sm:text-[13px]">
                {code.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 0.45 }}
                    className="flex whitespace-pre"
                  >
                    <span className="mr-4 w-3 select-none text-right text-white/20">{i + 1}</span>
                    <span>{line.map((s, j) => <span key={j} className={s.c}>{s.t}</span>)}</span>
                  </motion.div>
                ))}
                <span className="ml-7 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-lime" />
              </div>
            </motion.div>

            <motion.div variants={item} className="card flex items-center justify-between p-4 sm:p-5 lg:col-span-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Focus</p>
                <p className="mt-1 font-display text-lg font-semibold sm:text-xl">Full Stack Developer</p>
              </div>
              <Briefcase size={20} className="shrink-0 text-lime" />
            </motion.div>

            <motion.div variants={item} className="card relative p-4 sm:p-5 lg:col-span-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <Layers size={14} className="text-cyan-code" /> Core stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Next.js", "Node.js", "PostgreSQL", "Redis"].map((s) => <span key={s} className="chip-lime">{s}</span>)}
              </div>
              <span className="absolute -top-5 right-4 hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70 sm:flex">
                <Terminal size={11} className="text-lime" /> Build passing
              </span>
            </motion.div>

            <motion.a
              variants={item}
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.03, rotate: -0.6 }}
              className="group relative flex items-start justify-between rounded-2xl bg-lime p-4 text-bg sm:p-5 lg:col-span-3"
            >
              <p className="font-display text-lg font-semibold leading-tight sm:text-xl">
                Let&apos;s build
                <br />
                something real
              </p>
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              <span className="absolute -top-5 right-2 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70 sm:block">Latency 42ms</span>
            </motion.a>
          </motion.div>

          <motion.div
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            Scroll <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
