"use client";
// Infinite marquee strip of big lime numbers (between Engineering and Contact)
const items = [
  { v: "0+", l: "DSA Problems" },
  { v: "3+", l: "Full Stack Projects" },
  { v: "1+", l: "Years Development" },
  { v: "Multiple", l: "Technologies" },
];

export default function Stats() {
  const row = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] py-20">
      <div className="flex w-max animate-marquee gap-24 pr-24 hover:[animation-play-state:paused]">
        {[...row, ...row].map((s, i) => (
          <div key={i} className="shrink-0">
            <p className="font-display text-6xl font-bold text-lime md:text-7xl">{s.v}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent" />
    </section>
  );
}
