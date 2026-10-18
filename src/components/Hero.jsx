"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, Briefcase, Layers, Terminal, ArrowDown } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const code = [
  [{ t: "// shipping products, not demos", c: "text-muted opacity-80" }],
  [{ t: "const ", c: "text-fg" }, { t: "engineer", c: "text-fg" }, { t: " = {", c: "text-fg" }],
  [{ t: '  role: "', c: "text-fg" }, { t: "Full Stack Developer", c: "text-lime" }, { t: '",', c: "text-fg" }],
  [{ t: '  stack: ["', c: "text-fg" }, { t: "Next.js", c: "text-lime" }, { t: '", "', c: "text-fg" }, { t: "Node", c: "text-lime" }, { t: '", "', c: "text-fg" }, { t: "Postgres", c: "text-lime" }, { t: '"],', c: "text-fg" }],
  [{ t: '  focus: ["', c: "text-fg" }, { t: "APIs", c: "text-lime" }, { t: '", "', c: "text-fg" }, { t: "caching", c: "text-lime" }, { t: '", "', c: "text-fg" }, { t: "RAG", c: "text-lime" }, { t: '"],', c: "text-fg" }],
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

  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.9, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.85], [0, 12]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section id="home" ref={wrapRef} className="relative h-[120vh] md:h-[155vh] w-full">
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden py-6 sm:py-8">
        <motion.div
          style={{ scale, opacity, filter }}
          className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 origin-center will-change-transform"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute inset-x-0 -top-20 h-[400px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(163,243,70,0.14),transparent_70%)]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-[260px] w-[260px] animate-drift rounded-full bg-lime/[0.06] blur-[100px] sm:h-[350px] sm:w-[350px]" />

          {/* Hero Bento Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-3 pt-20 pb-8 sm:gap-3.5 sm:pt-24 lg:grid-cols-12 lg:pt-20"
          >
            {/* Main Intro Card */}
            <motion.div
              variants={item}
              className="card relative flex flex-col justify-between p-5 sm:p-6 lg:col-span-7 lg:p-7"
            >
              <div>
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-lime sm:mb-4 sm:text-[11px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                  Open to product roles
                </span>
                <p className="font-mono text-xs text-muted sm:text-sm">
                  <span className="text-cyan-code">$</span> <span className="text-lime">whoami</span> — Aryan Makhija
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Full Stack <span className="text-lime">Developer</span>
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                  I build scalable web applications, intelligent products, and reliable backend systems.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-lime text-xs sm:text-sm py-2 px-4"
                >
                  View My Work <ArrowUpRight size={14} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-ghost text-xs sm:text-sm py-2 px-4"
                >
                  <Mail size={14} /> Contact Me
                </a>
              </div>
            </motion.div>

            {/* Terminal / Code Snippet Card */}
            <motion.div
              variants={item}
              className="card min-w-0 overflow-hidden flex flex-col justify-between lg:col-span-5"
            >
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/20 px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#b3343c]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#6cae3a]" />
                <span className="ml-1 font-mono text-[11px] text-muted">developer.ts</span>
              </div>
              <div className="overflow-x-auto p-3.5 font-mono text-[11px] leading-[1.7] sm:text-[12px]">
                {code.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    className="flex whitespace-pre"
                  >
                    <span className="mr-3 w-3 select-none text-right text-white/20">{i + 1}</span>
                    <span>
                      {line.map((s, j) => (
                        <span key={j} className={s.c}>
                          {s.t}
                        </span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                <span className="ml-6 inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-lime" />
              </div>
            </motion.div>

            {/* Stat / Role Card */}
            <motion.div
              variants={item}
              className="card flex items-center justify-between p-3.5 sm:p-4 lg:col-span-3"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Focus</p>
                <p className="mt-0.5 font-display text-base font-semibold sm:text-lg">Full Stack Developer</p>
              </div>
              <Briefcase size={18} className="shrink-0 text-lime" />
            </motion.div>

            {/* Core Stack Card */}
            <motion.div
              variants={item}
              className="card relative flex flex-col justify-center p-3.5 sm:p-4 lg:col-span-6"
            >
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  <Layers size={13} className="text-cyan-code" /> Core stack
                </p>
                <span className="hidden items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted/70 sm:flex">
                  <Terminal size={10} className="text-lime" /> Build passing
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Next.js", "Node.js", "PostgreSQL", "Redis"].map((s) => (
                  <span key={s} className="chip-lime text-[11px] py-1 px-2.5">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA Accent Card */}
            <motion.a
              variants={item}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.02 }}
              className="group relative flex items-center justify-between rounded-xl bg-lime p-3.5 text-bg sm:p-4 lg:col-span-3"
            >
              <div>
                <p className="font-display text-base font-bold leading-tight sm:text-lg">
                  Let&apos;s build <br />
                  something real
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-2 hidden flex-col items-center gap-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted md:flex"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            Scroll <ArrowDown size={12} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}