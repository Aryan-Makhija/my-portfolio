"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "engineering", label: "Engineering" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= mid) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4"
    >
      <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between rounded-2xl border border-white/[0.06] bg-bg/60 px-3 backdrop-blur-xl sm:px-4">
        <button onClick={() => go("home")} className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime font-display text-lg font-bold text-bg">A</span>
          <span className="truncate font-display text-sm font-semibold">Aryan Makhija</span>
        </button>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <li key={l.id} className="relative">
              <button
                onClick={() => go(l.id)}
                className={`relative z-10 rounded-full px-3 py-2 text-sm transition-colors ${active === l.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </button>
            </li>
          ))}
          <li className="ml-2">
            <a href="#" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm transition hover:border-lime/40">
              <FileText size={14} /> Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-fg xl:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-[1280px] overflow-hidden rounded-2xl border border-white/[0.08] bg-bg/95 p-3 backdrop-blur-xl xl:hidden"
          >
            <ul className="grid gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm ${active === l.id ? "bg-white/[0.06] text-fg" : "text-muted"
                      }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="./resume.pdf"
                  download="Aryan_Makhija_Resume.pdf"
                  className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm transition-all hover:border-lime/40 hover:bg-lime/10 hover:text-lime"
                >
                  <FileText size={14} /> Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
