"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Code, ExternalLink, Check, FolderGit2, X, ArrowUpRight } from "lucide-react";

// Top 3 Featured Projects (for the cinematic scroll section)
const featuredProjects = [
  {
    name: "Vitalens",
    summary: "AI-powered health diagnosis and wellness platform.",
    problem: "People collect health data everywhere but never get one clear, trustworthy read on what it means.",
    features: [
      "Symptom analysis with structured AI output",
      "Longitudinal vitals dashboard",
      "Typed schema validation across the stack",
      "Role-aware auth and session handling",
    ],
    stack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Gemini AI", "Zod", "Clerk"],
    accent: "mint",
    glow: "rgba(163,243,70,0.18)",
    image: "/projects/vitalens.png",
    github: "#",
    demo: "#",
  },
  {
    name: "EduAI",
    summary: "AI-powered online learning platform.",
    problem: "Course content is static, so learners stall the moment they hit something they don't understand.",
    features: [
      "AI tutor grounded in course material",
      "Adaptive learning paths and progress state",
      "Streaming responses with graceful fallbacks",
      "Instructor content pipeline",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "LLM APIs", "Tailwind"],
    accent: "violet",
    glow: "rgba(139,92,246,0.20)",
    image: "/projects/eduai.png",
    github: "#",
    demo: "#",
  },
  {
    name: "DocuMind.ai",
    summary: "Multi-tenant document intelligence platform with conversational RAG.",
    problem: "Users struggle to extract precise insights across large unstructured documentation repositories.",
    features: [
      "Conversational RAG pipeline",
      "Pinecone vector search & Cohere reranking",
      "Docker containerization & Redis rate limiting",
      "Secure multi-tenant workspace isolation",
    ],
    stack: ["Next.js", "Python", "Pinecone", "LangChain", "Docker", "Redis"],
    accent: "cyan",
    glow: "rgba(20,184,166,0.18)",
    image: "/projects/documind.png",
    github: "#",
    demo: "#",
  },
];

// All Projects (Shown inside the modal view)
const allProjects = [
  ...featuredProjects,
  {
    name: "Nexus Chat",
    summary: "Real-time messaging application with presence indicators.",
    problem: "Keeping chat states synchronized across multiple concurrent users without latency overhead.",
    features: ["Real-time contact stack ordering", "Presence indicators", "Socket.io event management"],
    stack: ["React", "Node.js", "Express", "Socket.io", "MongoDB"],
    image: "/projects/nexus.png",
    github: "#",
    demo: "#",
  },
  {
    name: "ShopVerse",
    summary: "Multi-vendor e-commerce platform with animated workflows.",
    problem: "Standard e-commerce templates lack fluid micro-interactions and fast catalog filtering.",
    features: ["Animated navigation headers", "Vendor dashboard analytics", "Cart state management"],
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/projects/shopverse.png",
    github: "#",
    demo: "#",
  },
];

const accentGlow = {
  mint: "bg-lime/15",
  violet: "bg-purple-500/15",
  cyan: "bg-cyan-500/15",
};

// Internal Project Card Render Component (Featured)
function ProjectContent({ project, compact = false }) {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <div
      className={`grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] ${
        compact ? "md:grid-cols-[0.9fr_1.1fr] md:gap-7 lg:grid-cols-[1.05fr_1fr] lg:gap-10" : ""
      }`}
    >
      <motion.div
        key={`${project.name}-image`}
        initial={{ opacity: 0, scale: 0.94, y: 25, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.04, y: -25, filter: "blur(12px)" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative order-1 overflow-hidden rounded-xl border border-white/10 bg-[#0b0c12] shadow-2xl"
      >
        {imageLoaded ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.name} interface`}
            loading="lazy"
            onError={() => setImageLoaded(false)}
            className={`h-full w-full object-cover object-top ${compact ? "md:aspect-[1.18/1]" : "aspect-[16/10]"}`}
          />
        ) : (
          <div className="grid aspect-[16/10] h-full w-full grid-cols-[18%_1fr] gap-3 bg-[#08090d] p-4">
            <div className="space-y-2 border-r border-white/5 pr-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-2.5 rounded bg-white/[0.06]" />
              ))}
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 rounded-lg bg-white/[0.05]" />
                ))}
              </div>
              <div className="h-24 rounded-lg bg-gradient-to-r from-lime/20 via-lime/5 to-transparent border border-lime/10" />
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        key={`${project.name}-copy`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="order-2"
      >
        <h3 className={`font-display text-3xl font-bold tracking-tight text-white ${compact ? "md:text-3xl lg:text-4xl" : "sm:text-4xl"}`}>
          {project.name}
        </h3>
        <p className={`mt-2 text-base text-zinc-400 ${compact ? "md:mt-1.5 md:text-sm" : ""}`}>
          {project.summary}
        </p>

        <p className={`mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-lime ${compact ? "md:mt-3" : ""}`}>
          Problem
        </p>
        <p className={`mt-1.5 text-sm leading-relaxed text-zinc-300 ${compact ? "md:mt-1 md:text-xs" : ""}`}>
          {project.problem}
        </p>

        <p className={`mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-lime ${compact ? "md:mt-3" : ""}`}>
          Key features
        </p>
        <ul className={`mt-2 grid gap-2 sm:grid-cols-2 ${compact ? "md:mt-1.5 md:gap-1.5" : ""}`}>
          {project.features.map((feature) => (
            <li key={feature} className={`flex items-start gap-2 text-sm text-zinc-400 ${compact ? "md:text-xs" : ""}`}>
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-6 flex flex-wrap gap-2 ${compact ? "md:mt-4 md:gap-1.5" : ""}`}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className={`mt-7 flex flex-wrap gap-3 ${compact ? "md:mt-5" : ""}`}>
          <a
            href={project.github}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-white/10"
          >
            <Code className="h-4 w-4" /> Code
          </a>
          <a
            href={project.demo}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-lime/20 transition-all hover:opacity-90"
          >
            Live Demo <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIndex(Math.min(featuredProjects.length - 1, Math.floor(value * featuredProjects.length)));
  });

  const active = featuredProjects[index];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section id="projects" className="relative py-16 md:py-0">
      {/* MOBILE LAYOUT */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-lime">Selected work</p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
              Products, not portfolio filler.
            </h2>
          </div>
        </div>

        <div className="mt-10 space-y-16">
          {featuredProjects.map((project, idx) => (
            <div key={project.name} className="border-b border-white/10 pb-16 last:border-0 last:pb-0">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                {String(idx + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
              </p>
              <ProjectContent project={project} />
            </div>
          ))}
        </div>

        {/* View All Projects Trigger (Mobile) */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-lime/30 bg-lime/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-lime transition-all hover:bg-lime/20"
          >
            <FolderGit2 size={16} /> View All Projects ({allProjects.length})
          </button>
        </div>
      </div>

      {/* DESKTOP LAYOUT (Sticky Frame Scroll) */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${featuredProjects.length * 120}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-4">
          <motion.div
            key={active.accent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`pointer-events-none absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl ${
              accentGlow[active.accent]
            }`}
          />

          <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-lime">Selected work</p>
                <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Products, not portfolio filler.
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* View All Projects Trigger Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 backdrop-blur-md transition-all hover:border-lime/40 hover:bg-lime/10 hover:text-lime"
                >
                  <FolderGit2 size={14} className="text-lime" /> All Projects ({allProjects.length})
                </button>

                {/* Progress Indicators */}
                <div className="flex shrink-0 items-center gap-2" aria-label={`Project ${index + 1} of ${featuredProjects.length}`}>
                  {featuredProjects.map((project, projectIndex) => (
                    <span
                      key={project.name}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        projectIndex === index ? "w-10 bg-lime" : "w-4 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-8">
              <AnimatePresence mode="wait">
                <ProjectContent key={active.name} project={active} compact />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ALL PROJECTS MODAL ARCHIVE */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl sm:p-6 lg:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-white/10 bg-[#0c0d14] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/40">
                <div className="flex items-center gap-2.5">
                  <FolderGit2 size={18} className="text-lime" />
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                    Complete Project Archive <span className="text-zinc-500 font-mono text-sm">({allProjects.length})</span>
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Grid Body */}
              <div className="grid-scroll flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {allProjects.map((proj, i) => (
                  <div
                    key={proj.name}
                    className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-lime/30 hover:bg-white/[0.04]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-zinc-500">0{i + 1}</span>
                        <div className="flex items-center gap-1.5">
                          {proj.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h4 className="mt-3 font-display text-xl font-bold text-white group-hover:text-lime transition-colors">
                        {proj.name}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                        {proj.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                      <a
                        href={proj.github}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        <Code size={14} /> Source
                      </a>
                      <a
                        href={proj.demo}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-lime hover:underline"
                      >
                        Live Preview <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/10 px-6 py-3.5 bg-black/40 text-center font-mono text-[11px] text-zinc-500">
                Press ESC or click close to return to portfolio.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}