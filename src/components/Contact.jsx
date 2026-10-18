"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Users, Mail, Send, Check } from "lucide-react";

const links = [
  { icon: Code, title: "GitHub", sub: "View repositories", href: "https://github.com/Aryan-Makhija" },
  { icon: Users, title: "LinkedIn", sub: "Let's connect", href: "https://linkedin.com/in/aryan-makhija-1a43a6352" },
  { icon: Mail, title: "Email", sub: "aryanmakhija1030@gmail.com", href: "mailto:aryanmakhija1030@gmail.com" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    // TODO: wire to your API route / Resend / Formspree
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    e.target.reset();
  };

  const input = "w-full rounded-lg border border-white/[0.08] bg-bg/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted/50 focus:border-lime/60 focus:shadow-[0_0_0_3px_rgba(163,243,70,0.08)]";
  const label = "mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted";

  return (
    <section id="contact" className="relative overflow-hidden pt-28">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-lime/[0.09] blur-[140px]" />
      <div className="section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <p className="eyebrow">Let&apos;s build something</p>
          <h2 className="h2 mt-4">Have an idea? Let&apos;s build it.</h2>
          <p className="mt-4 text-muted">Open to full stack roles, product engineering teams and ambitious side projects.</p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          <motion.form onSubmit={submit} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={label}>Name</label><input required className={input} placeholder="Your name" /></div>
              <div><label className={label}>Email</label><input required type="email" className={input} placeholder="you@company.com" /></div>
            </div>
            <div className="mt-4"><label className={label}>Message</label><textarea required rows={5} className={`${input} resize-none`} placeholder="What are you building?" /></div>
            <button type="submit" className="btn-lime mt-5">
              {sent ? <>Sent <Check size={14} /></> : <>Send Message <Send size={14} /></>}
            </button>
          </motion.form>

          <div className="space-y-3">
            {links.map((l, i) => (
              <motion.a
                key={l.title}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ x: 6 }}
                className="card card-hover flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-bg text-lime"><l.icon size={18} /></span>
                <div>
                  <p className="font-display text-sm font-semibold">{l.title}</p>
                  <p className="text-xs text-muted">{l.sub}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <footer className="mt-20 flex items-center justify-between border-t border-white/[0.06] py-8 font-mono text-[11px] text-muted">
          <span>© 2026 Aryan Makhija</span>
          <span>Built from scratch</span>
        </footer>
      </div>
    </section>
  );
}