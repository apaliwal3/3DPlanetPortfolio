"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, User } from "lucide-react";
import { SKILLS } from "@/lib/data";

export default function BioView() {
  return (
    <motion.div
      key="bio"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-8 md:px-20 overflow-y-auto py-8"
    >
      {/* ── Left column ── */}
      <div className="flex flex-col items-center gap-6 flex-shrink-0">
        {/* Stylised profile avatar */}
        <div
          className="relative w-40 h-40 rounded-full border border-white/10 overflow-hidden flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg,#0f172a 0%,#020617 50%,#000000 100%)",
            boxShadow:
              "0 0 40px rgba(16,185,129,0.2), inset -10px -10px 30px rgba(0,0,0,0.7)",
          }}
        >
          <User size={60} className="text-slate-700/60" />
          {/* Scan-line sweep */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
            animate={{ y: [-80, 80] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Name / title */}
        <div className="text-center space-y-1">
          <p className="text-[9px] tracking-[0.4em] text-emerald-600 uppercase">
            Pilot Designation
          </p>
          <h2 className="text-xl tracking-[0.3em] text-white font-black italic uppercase">
            Aashit Paliwal
          </h2>
          <p className="text-[8px] tracking-wider uppercase text-white/30 uppercase">
            Full-Stack Engineer
          </p>
        </div>

        {/* Communications panel */}
        <div className="border border-white/8 rounded-sm px-5 py-4 space-y-3 w-52">
          <p className="text-[10px] tracking-wider font-extrabold text-teal-600 uppercase">
            Communications
          </p>
          <CommLink href="mailto:hello@aashit.dev" icon={<Mail size={11} />}>
            hello@aashit.dev
          </CommLink>
          <CommLink href="https://github.com" icon={<Github size={11} />} external>
            github.com/aashit
          </CommLink>
          <CommLink href="https://linkedin.com" icon={<Linkedin size={11} />} external>
            linkedin.com/in/aashit
          </CommLink>
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="flex flex-col gap-7 max-w-lg">
        {/* Captain's Log */}
        <div className="space-y-3">
          <p className="text-[10px] tracking-widest font-extrabold text-teal-600 uppercase">
            Captain&apos;s Log
          </p>
          <p className="text-sm text-white/55 leading-relaxed tracking-wide">
            Stardate 2026. Full-stack engineer navigating the frontier of
            distributed systems, immersive UIs, and AI-native applications. I
            build production-grade software that merges engineering rigour with
            obsessive attention to craft — from zero-latency backends to
            pixel-perfect interfaces that feel alive.
          </p>
          <p className="text-sm text-white/40 leading-relaxed tracking-wide">
            Currently on a mission to compress the gap between idea and deployed
            product — shipping fast, iterating faster, and leaving clean code in
            the wake.
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-emerald-900/60 via-white/5 to-transparent" />

        {/* Skills grid */}
        <div className="space-y-3">
          <p className="text-[10px] tracking-widest font-extrabold text-teal-600 uppercase">
            Tech Stack Inventory
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                className="flex items-center gap-2 border border-white/8 rounded-sm px-3 py-2 hover:border-teal-500/50 hover:bg-emerald-950/30 transition-all duration-200 group"
              >
                <s.icon
                  size={12}
                  className="text-teal-500 group-hover:text-emerald-500 transition-colors flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wide text-white/45 group-hover:text-white/70 transition-colors uppercase">
                  {s.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CommLink({
  href,
  icon,
  children,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-white/50 hover:text-emerald-300 transition-colors"
    >
      <span className="text-teal-500">{icon}</span>
      {children}
    </a>
  );
}
