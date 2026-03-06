"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import Planet3D from "@/components/Planet3D";
import type { Project } from "@/lib/data";

type Props = {
  project: Project;
  onBack: () => void;
};

export default function ProjectView({ project, onBack }: Props) {
  return (
    <motion.div
      key="project"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-8 md:px-20"
    >
      {/* Left — large planet with orbital rings */}
      <div className="flex-shrink-0 relative flex items-center justify-center">
        {/* Primary ring */}
        <motion.div
          className="absolute rounded-full border border-white/15"
          style={{ width: 340, height: 340 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500"
            style={{ boxShadow: "0 0 8px rgba(16,185,129,0.9)" }}
          />
        </motion.div>
        {/* Secondary dashed ring */}
        <motion.div
          className="absolute rounded-full border border-dashed border-white/8"
          style={{ width: 376, height: 376 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <Planet3D project={project} large />
      </div>

      {/* Right — project details */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="max-w-md space-y-6"
      >
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-white/40 hover:text-emerald-500 transition-colors uppercase"
        >
          <ChevronLeft size={12} />
          System Map
        </button>

        {/* Project name */}
        <div>
          <p className="text-[10px] tracking-widest font-extrabold text-teal-600 uppercase mb-1">
            Project File
          </p>
          <h2 className="text-3xl md:text-4xl font-black italic tracking-wider uppercase text-white uppercase">
            {project.name}
          </h2>
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-emerald-600 to-transparent" />

        {/* Description */}
        <p className="text-sm text-white/55 leading-relaxed tracking-wide">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-[8px] tracking-wider uppercase uppercase border border-emerald-500/30 text-white/70 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-1">
          <ActionBtn
            label="Launch Site"
            icon={<ExternalLink size={11} />}
            primary
          />
          <ActionBtn label="Source Code" icon={<Github size={11} />} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ActionBtn({
  label,
  icon,
  primary = false,
}: {
  label: string;
  icon: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-2 px-5 py-2 text-[11px] font-bold tracking-wider uppercase rounded-sm border transition-all duration-200 ${
        primary
          ? "bg-emerald-600/15 border-emerald-600/50 text-emerald-300 hover:bg-emerald-600/25 hover:border-emerald-500"
          : "border-emerald-500/30 text-white/70 hover:text-white/80 hover:border-white/20"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
