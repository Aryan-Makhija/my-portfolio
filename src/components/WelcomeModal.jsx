"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";

export default function WelcomeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative w-full max-w-[400px] rounded-3xl border border-white/10 bg-[#0d0e13] p-6 text-center shadow-[0_0_80px_-20px_rgba(163,243,70,0.35)]"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-muted transition hover:text-fg">
              <X size={16} />
            </button>

            {/* avatar */}
            <motion.div
              className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-lime/40 bg-[#0b1a10]"
              animate={{ boxShadow: ["0 0 0 0 rgba(163,243,70,.35)", "0 0 0 16px rgba(163,243,70,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg viewBox="0 0 64 64" className="h-14 w-14">
                <circle cx="32" cy="34" r="18" fill="#f4d2b0" />
                <path d="M14 30c0-14 10-20 20-18 10 2 16 10 16 20-4-6-12-8-18-8s-14 2-18 6z" fill="#3ab4ff" />
                <circle cx="26" cy="35" r="2" fill="#222" />
                <circle cx="38" cy="35" r="2" fill="#222" />
                <path d="M26 42q6 5 12 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </motion.div>

            <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
              <Sparkles size={11} /> Portfolio online
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">A little introduction</h3>

            <div className="mt-5 rounded-xl border border-white/[0.06] bg-card p-4 text-left text-sm leading-relaxed text-fg/90">
              Hey there! 👋 Welcome to my portfolio! I build automated CLI tools, sleek web apps, and full-stack
              experiences. Ready to explore?
            </div>

            <button onClick={onClose} className="btn-lime mt-5 w-full justify-center rounded-lg">
              Let&apos;s go! <ArrowRight size={14} />
            </button>
            <p className="mt-3 font-mono text-[10px] text-muted">Press ESC to skip</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
