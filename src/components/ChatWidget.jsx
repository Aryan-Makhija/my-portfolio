"use client";
import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Bot, CornerDownLeft } from "lucide-react";

const quick = [
  { icon: "⚡", q: "What's Aryan's tech stack?", a: "Next.js, React, Node.js, PostgreSQL, Redis and Tailwind — plus RAG and LLM APIs for AI features." },
  { icon: "🚀", q: "Show top projects", a: "Vitalens (AI health platform) and EduAI (AI learning platform). Scroll to Projects for details." },
  { icon: "📬", q: "How can I contact Aryan?", a: "Use the contact form below, or reach out via GitHub, LinkedIn or email." },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const end = useRef(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const ask = (q, a) => {
    setMsgs((m) => [...m, { from: "me", t: q }]);
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", t: a ?? "Thanks for asking! Connect this to your own /api/chat route to answer live." }]), 600);
  };
  const send = () => { if (!text.trim()) return; ask(text.trim()); setText(""); };

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="mb-1 flex h-[440px] w-[min(92vw,380px)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e13] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-lime/30 bg-lime/10 text-lime"><Bot size={17} /></span>
                <div>
                  <p className="font-display text-sm font-semibold">Aryan&apos;s AI Assistant</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-lime"><span className="h-1.5 w-1.5 rounded-full bg-lime" />online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-fg"><X size={16} /></button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
              <p className="text-fg/90">Hi! Ask me anything about Aryan&apos;s skills, projects or how to get in touch.</p>
              {msgs.length === 0 && (
                <div className="flex flex-col items-start gap-2">
                  {quick.map((c, i) => (
                    <motion.button
                      key={c.q}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      onClick={() => ask(c.q, c.a)}
                      className="rounded-md border border-lime/25 bg-lime/10 px-3 py-1.5 font-mono text-[11px] text-lime transition hover:bg-lime/20"
                    >
                      {c.icon} {c.q}
                    </motion.button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${m.from === "me" ? "ml-auto bg-lime text-bg" : "bg-card text-fg/90"}`}>
                  {m.t}
                </motion.div>
              ))}
              <div ref={end} />
            </div>

            <div className="p-3">
              <div className="relative rounded-xl border border-lime/60 bg-bg p-3 shadow-[0_0_0_3px_rgba(163,243,70,0.07)]">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Ask me anything..."
                  rows={2}
                  className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted/60"
                />
                <button onClick={send} className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-lime text-bg transition hover:scale-105"><CornerDownLeft size={14} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {!open && (
          <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }} className="rounded-full border border-white/10 bg-bg/80 px-4 py-2 font-mono text-[11px] text-lime backdrop-blur">
            Ask AI about my work 💬
          </motion.span>
        )}
        <button onClick={() => setOpen((o) => !o)} aria-label="Toggle chat" className="relative flex h-14 w-14 items-center justify-center rounded-full border border-lime/40 bg-[#0c1409] text-lime">
          {!open && <span className="absolute inset-0 animate-ring rounded-full border border-lime/50" />}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? "x" : "c"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              {open ? <X size={20} /> : <MessageCircle size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
