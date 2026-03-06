"use client";

import { motion } from "framer-motion";
import { Rocket, Github, Linkedin } from "lucide-react";
import type { View, Project } from "@/lib/data";

type Props = {
  view: View;
  setView: (v: View) => void;
  setSelectedProject: (p: Project | null) => void;
};

export default function TopNav({ view, setView, setSelectedProject }: Props) {
  return (
    <div className="flex justify-center pt-5 px-4 z-50 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
      >
        {/* Brand */}
        <button
          onClick={() => {
            setView("galaxy");
            setSelectedProject(null);
          }}
          className="flex items-center gap-2 pr-3 border-r border-white/10 group"
        >
          <Rocket
            size={14}
            className="text-emerald-500 group-hover:text-emerald-300 transition-colors"
          />
          <span className="text-[10px] tracking-[0.3em] text-white/70 group-hover:text-white transition-colors uppercase">
            Portfolio
          </span>
        </button>

        {/* Nav links */}
        <NavBtn
          label="System Map"
          active={view === "galaxy" || view === "project"}
          onClick={() => {
            setView("galaxy");
            setSelectedProject(null);
          }}
        />
        <NavBtn
          label="Pilot Bio"
          active={view === "bio"}
          onClick={() => setView("bio")}
        />

        {/* Social icons */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-white/50 hover:text-white transition-colors"
          >
            <Github size={14} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-white/50 hover:text-white transition-colors"
          >
            <Linkedin size={14} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function NavBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-1 text-[9px] tracking-wider uppercase uppercase transition-colors duration-200 ${
        active ? "text-emerald-300" : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0 h-px bg-emerald-500"
        />
      )}
    </button>
  );
}
