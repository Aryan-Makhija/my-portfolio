"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Code, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// swap `image` for real screenshots in /public/projects/*.png
const projects = [
  {
    name: "Vitalens",
    tagline: "AI-powered health diagnosis and wellness platform.",
    problem: "People collect health data everywhere but never get one clear, trustworthy read on what it means.",
    features: ["Symptom analysis with structured AI output", "Longitudinal vitals dashboard", "Typed schema validation across the stack", "Role-aware auth and session handling"],
    stack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Gemini AI", "Zod", "Clerk"],
    glow: "rgba(163,243,70,0.16)",
    image: "/projects/vitalens.png",
  },
  {
    name: "EduAI",
    tagline: "AI-powered online learning platform.",
    problem: "Course content is static, so learners stall the moment they hit something they don't understand.",
    features: ["AI tutor grounded in course material", "Adaptive learning paths and progress state", "Streaming responses with graceful fallbacks", "Instructor content pipeline"],
    stack: ["Next.js", "Node.js", "MongoDB", "LLM APIs", "Tailwind"],
    glow: "rgba(139,92,246,0.18)",
    image: "/projects/eduai.png",
  },
  {
    name: "Project Three",
    tagline: "Placeholder slot — swap in your next shipped product.",
    problem: "Describe the real problem this product solves for its users in one or two sentences.",
    features: ["Key feature one", "Key feature two", "Key feature three", "Key feature four"],
    stack: ["React", "Express", "Redis", "Docker"],
    glow: "rgba(20,184,166,0.16)",
    image: "/projects/three.png",
  },
];

function Screen({ src, name }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0c12] shadow-2xl">
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} onError={() => setOk(false)} className="h-full w-full object-cover object-top" />
      ) : (
        /* fallback mock dashboard */
        <div className="grid h-full grid-cols-[18%_1fr] gap-3 p-3">
          <div className="space-y-2">{[...Array(7)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.06]" />)}</div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">{[...Array(4)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-white/[0.05]" />)}</div>
            <div className="h-28 rounded-lg bg-gradient-to-r from-lime/20 via-lime/5 to-transparent" />
            <div className="grid grid-cols-2 gap-2"><div className="h-16 rounded-lg bg-white/[0.05]" /><div className="h-16 rounded-lg bg-white/[0.05]" /></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const root = useRef(null);
  const [idx, setIdx] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".p-slide");
      const glows = gsap.utils.toArray(".p-glow");
      gsap.set(slides.slice(1), { autoAlpha: 0, y: 60 });
      gsap.set(glows.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2.4,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => setIdx(Math.min(projects.length - 1, Math.round(self.progress * (projects.length - 1)))),
        },
      });

      slides.forEach((_, i) => {
        if (i === 0) return;
        tl.to(slides[i - 1], { autoAlpha: 0, y: -60, scale: 0.97, duration: 0.5 }, i * 1.2 - 0.6)
          .to(glows[i - 1], { autoAlpha: 0, duration: 0.5 }, "<")
          .to(slides[i], { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.25")
          .to(glows[i], { autoAlpha: 1, duration: 0.5 }, "<")
          .to({}, { duration: 0.5 });
      });

      gsap.from(".p-head > *", { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={root} className="relative h-screen overflow-hidden">
      {projects.map((p, i) => (
        <div key={i} className="p-glow pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse at 85% 65%, ${p.glow}, transparent 55%)` }} />
      ))}

      <div className="section flex h-full flex-col justify-center pt-20">
        <div className="mb-6 flex items-start justify-between">
          <h2 className="p-head h2 max-w-[11ch]">Products, not portfolio filler.</h2>
          <div className="mt-4 flex gap-1.5">
            {projects.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-lime" : "w-4 bg-white/15"}`} />
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          {projects.map((p, i) => (
            <article key={p.name} className="p-slide absolute inset-0 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
              <Screen src={p.image} name={p.name} />
              <div>
                <h3 className="font-display text-3xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-lime">Problem</p>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{p.problem}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-lime">Key features</p>
                <ul className="mt-2 grid max-w-lg gap-x-6 gap-y-2 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-muted"><Check size={14} className="mt-0.5 shrink-0 text-lime" />{f}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="chip rounded-md">{s}</span>)}</div>
                <div className="mt-6 flex gap-3">
                  <a href="#" className="btn-ghost !px-5 !py-2.5"><Code size={15} /> GitHub</a>
                  <a href="#" className="btn-lime !px-5 !py-2.5">Live Demo <ExternalLink size={14} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}