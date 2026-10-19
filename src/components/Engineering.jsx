"use client";
import { motion } from "framer-motion";
import { Layers, Server, Sparkles, Database, Box, ChevronRight } from "lucide-react";

const flows = [
  { title: "Request lifecycle", sub: "Typed API layer, cache-first reads, indexed queries.", steps: ["Client", "API", "Service", "Cache", "Database"] },
  { title: "Retrieval pipeline", sub: "Chunked embeddings, hybrid retrieval, grounded generation.", steps: ["User Query", "Retrieval", "Vector DB", "LLM", "Response"] },
];
const tags = ["API Design", "Authentication", "Database Design", "Caching", "Rate Limiting", "Background Jobs", "AI / RAG", "Docker", "Scalable Architecture"];
const pillars = [
  { icon: Layers, title: "Full Stack Applications", text: "Product-grade apps from data model to polished interface.", tech: ["Next.js", "React","JavaScript", "Databases"] },
  { icon: Server, title: "Backend & API Development", text: "Clean REST surfaces, validation, auth and predictable errors.", tech: ["Node.js", "Express", "Zod", "RestAPIs", "Authentication", "System Design" ] },
  { icon: Sparkles, title: "AI-Powered Applications", text: "RAG pipelines and agent workflows wired into real products.", tech: ["RAG","Langchain","PineCone", "LLM APIs", "Vectors"] },
  { icon: Database, title: "Database & Architecture", text: "Schema design, indexing, caching and query performance.", tech: ["MongoDb", "PostgresSQL" , "Drizzle","PineCone", "Redis", "SQL"] },
  { icon: Box, title: "Deployment & DevOps", text: "Containerised builds, environments and CI that stays green.", tech: ["Docker","Nginx", "Reverse Proxy","System Desing", "CI/CD"] },
];

// const fade = (i = 0) => ({
//   initial: { opacity: 0, y: 36 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true, margin: "-60px" },
//   transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
// });

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay: delay * 0.1 },
});

export default function Engineering() {
  return (
    <section id="engineering" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-20 h-[280px] w-[280px] rounded-full bg-violet-500/[0.07] blur-[140px] sm:h-[420px] sm:w-[420px]" />
      <div className="section">
        <motion.div {...fade()}>
          <p className="eyebrow">Engineering</p>
          <h2 className="h2 mt-4">More than just UI.</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            The interface is the surface. Underneath sits schema design, caching strategy, auth boundaries and jobs that
            keep running when traffic doesn&apos;t behave.
          </p>
        </motion.div>

        {/* flows */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {flows.map((f, i) => (
            <motion.div key={f.title} {...fade(i)} className="card card-hover p-6">
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{f.sub}</p>
              <div className="mt-5 flex flex-wrap items-center gap-y-2">
                {f.steps.map((s, j) => (
                  <motion.span key={s} className="flex items-center" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.15 }}>
                    <span className="rounded-md border border-white/10 bg-bg px-3 py-1.5 font-mono text-xs">{s}</span>
                    {j < f.steps.length - 1 && <ChevronRight size={12} className="mx-1.5 text-white/25" />}
                  </motion.span>
                ))}
              </div>
              {/* travelling pulse along the pipeline */}
              <div className="relative mt-5 h-px w-full bg-white/[0.08]">
                <motion.span className="absolute left-0 top-0 h-px w-1/4 bg-lime shadow-[0_0_8px_#a3f346]" animate={{ x: ["0%", "300%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* tags */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {tags.map((t, i) => (
            <motion.span key={t} {...fade(i * 0.3)} whileHover={{ y: -3, borderColor: "rgba(163,243,70,0.5)" }} className="chip !px-4 !py-1.5 !text-xs">{t}</motion.span>
          ))}
        </div>

        {/* <motion.div {...fade()} className="mt-16">
          <p className="eyebrow">How I work</p>
          <h3 className="h2 mt-4 max-w-[14ch]">Five ways I ship the value.</h3>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div key={p.title} {...fade(i)} whileHover={{ y: -6 }} className="card card-hover p-5 sm:p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-bg text-lime"><p.icon size={17} /></span>
              <h4 className="mt-8 font-display text-lg font-semibold">{p.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="chip rounded-md">{t}</span>)}</div>
            </motion.div>
          ))}
        </div> */}


          <motion.div {...fade()} className="text-center sm:text-leftm mt-10">
            <p className="eyebrow font-mono text-xs uppercase tracking-[0.2em] text-lime">How I work</p>
            <h3 className="h2 mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Five ways I ship value.
            </h3>
            <p className="mt-2 text-sm text-muted">An intentional engineering framework optimized for production reliability.</p>
          </motion.div>

          {/* Strict 2-Column Grid Layout (5th card spans full width to prevent empty orphan slots) */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {pillars.map((p, i) => {
              // Check if it's the 5th card (index 4) and we have an odd number of cards
              const isLastOddCard = i === 4 && pillars.length % 2 !== 1; // Or simply i === 4 since there are 5 cards

              return (
                <motion.div
                  key={p.title}
                  {...fade(i)}
                  whileHover={{ y: -6 }}
                  className={`card card-hover relative flex flex-col justify-between p-6 overflow-hidden ${i === 4 ? "md:col-span-2 bg-gradient-to-br from-card via-card to-lime/[0.03]" : ""
                    }`}
                >
                  {/* Subtle top-right corner glow on hover/active */}
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime/[0.04] blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-bg text-lime shadow-inner">
                        {p.icon && <p.icon size={18} />}
                      </span>
                      <span className="font-mono text-[11px] text-muted/60">0{i + 1}</span>
                    </div>

                    <h4 className="mt-6 font-display text-xl font-semibold tracking-tight text-fg">
                      {p.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {p.text}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                    {p.tech?.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
 

      </div>
    </section >
  );
}
