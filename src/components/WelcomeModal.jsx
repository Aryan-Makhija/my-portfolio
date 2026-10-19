"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Sparkles, Code2 } from "lucide-react";

const welcomeCopy =
  "Hey there! 👋 Welcome to my portfolio! I build automated CLI tools, sleek web apps, and full-stack experiences. Ready to explore?";
const welcomeCharacters = Array.from(welcomeCopy);

// "true"  -> modal was already shown in this browser session
// missing -> first visit, show it
const SEEN_KEY = "portfolioWelcomeSeen";

function TechEmblemAvatar({ reduceMotion }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-xl border border-lime/40 bg-lime/10 shadow-[0_0_35px_rgba(163,243,70,0.25)]"
    >
      <div className="pointer-events-none absolute inset-0 animate-ping rounded-xl border border-lime/20 opacity-25" />
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-lime/30 bg-[#0b1a10] text-lime shadow-inner">
        <Code2 size={26} className="stroke-[2.2]" />
      </div>
      <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-lime" />
      </span>
    </motion.div>
  );
}

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [typedCopy, setTypedCopy] = useState("");
  const reduceMotion = useReducedMotion();

  // 1) First-visit check (runs only in the browser, after mount)
  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(SEEN_KEY) === "true";
      if (!seen) {
        setOpen(true);
        // mark as seen immediately, so a refresh while it is open won't show it again
        window.sessionStorage.setItem(SEEN_KEY, "true");
      }
    } catch {
      // sessionStorage blocked (private mode etc.) -> just show it once per page load
      setOpen(true);
    }
  }, []);

  const handleClose = () => setOpen(false);

  // 2) ESC to close + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // 3) Typewriter effect
  useEffect(() => {
    if (!open) {
      setTypedCopy("");
      return undefined;
    }
    if (reduceMotion) {
      setTypedCopy(welcomeCopy);
      return undefined;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedCopy(welcomeCharacters.slice(0, index).join(""));
      if (index >= welcomeCharacters.length) window.clearInterval(timer);
    }, 20);
    return () => window.clearInterval(timer);
  }, [open, reduceMotion]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-[420px] rounded-xl border border-white/10 bg-[#0d0e13] p-6 text-center shadow-[0_0_80px_-20px_rgba(163,243,70,0.35)] sm:p-7"
            initial={{ scale: 0.9, y: 25, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1.5 text-muted transition hover:bg-white/10 hover:text-fg"
            >
              <X size={16} />
            </button>

            <TechEmblemAvatar reduceMotion={reduceMotion} />

            <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
              <Sparkles size={11} /> Portfolio online
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-fg">
              A little introduction
            </h3>

            <div className="mt-4 min-h-[5.5rem] rounded-lg border border-white/[0.08] bg-card p-4 text-left text-sm leading-relaxed text-fg/90">
              {typedCopy}
              {typedCopy.length < welcomeCopy.length && (
                <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-lime align-middle" />
              )}
            </div>

            <button onClick={handleClose} className="btn-lime mt-5 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold">
              Let&apos;s go! <ArrowRight size={14} />
            </button>
            <p className="mt-3 font-mono text-[10px] text-muted">Press ESC to skip</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}