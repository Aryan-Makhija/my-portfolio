"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: "01", year: "2024", title: "Started Development", text: "Fundamentals first: JavaScript, the DOM, HTTP and building small full stack apps end to end.", tags: ["JavaScript", "React", "Git"] },
  { n: "02", year: "2025", title: "Full Stack Projects", text: "Shipped real products with authentication, relational data models and deployed environments.", tags: ["Next.js", "PostgreSQL", "Tailwind"] },
  { n: "03", year: "2025", title: "Advanced Backend", text: "Focused on API design, caching, rate limiting, background jobs and observability.", tags: ["Node.js", "Redis", "Docker"] },
  { n: "04", year: "2026", title: "AI / RAG / System Design", text: "Retrieval pipelines, vector search, agentic workflows and designing systems that scale.", tags: ["RAG", "LLM APIs", "System Design"] },
];

export default function Journey() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".j-head > *", { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 80);

          const tween = gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
            },
          });

          gsap.utils.toArray(".j-card").forEach((card) => {
            gsap.fromTo(card, { borderColor: "rgba(255,255,255,0.07)" }, {
              borderColor: "rgba(163,243,70,0.55)",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 65%", end: "left 35%", scrub: true },
            });
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={root} className="relative flex flex-col justify-center overflow-hidden py-20 md:h-screen md:py-0">
      <div className="section j-head">
        <p className="eyebrow">Journey</p>
        <h2 className="h2 mt-4 max-w-[14ch]">Progressing through the stack, year by year.</h2>
      </div>

      <div className="relative mt-10 md:mt-14">
        <div className="absolute left-0 top-[18px] hidden h-px w-full bg-white/[0.07] md:block" />
        <div ref={bar} className="absolute left-0 top-[18px] hidden h-px w-full origin-left scale-x-0 bg-lime md:block" />

        <div ref={track} className="flex w-full flex-col gap-8 px-5 md:w-max md:flex-row md:gap-6 md:px-10">
          {steps.map((s) => (
            <div key={s.n} className="w-full shrink-0 md:w-[78vw] md:max-w-[420px] lg:w-[30vw]">
              <div className="mb-5 flex items-center gap-4 md:mb-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-lime/40 bg-bg font-mono text-[11px] text-lime">{s.n}</span>
                <span className="h-px flex-1 bg-white/[0.07]" />
              </div>
              <div className="j-card card min-h-[180px] border p-5 sm:min-h-[210px] sm:p-7">
                <p className="font-mono text-xs text-cyan-code">{s.year}</p>
                <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="chip rounded-md">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
