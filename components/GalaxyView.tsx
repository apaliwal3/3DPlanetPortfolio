"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { Rocket } from "lucide-react";
import Planet3D from "@/components/Planet3D";
import { PROJECTS, type Project } from "@/lib/data";
import { useState } from "react";

type Props = {
  onSelectProject: (p: Project) => void;
};

// Orbital parameters for each planet (diagonal arrangement)
const ORBITAL_PARAMS = [
  { semiMajor: 180, eccentricity: 0.08, startAngle: -Math.PI / 4, period: 50 },           // Top-right
  { semiMajor: 240, eccentricity: 0.12, startAngle: Math.PI / 4, period: 65 },            // Bottom-right  
  { semiMajor: 300, eccentricity: 0.15, startAngle: (3 * Math.PI) / 4, period: 80 },      // Bottom-left
  { semiMajor: 360, eccentricity: 0.18, startAngle: (-3 * Math.PI) / 4, period: 95 },     // Top-left
];

// Calculate elliptical orbit position
function getEllipticalPosition(angle: number, semiMajor: number, eccentricity: number) {
  const semiMinor = semiMajor * Math.sqrt(1 - eccentricity * eccentricity);
  const x = semiMajor * Math.cos(angle);
  const y = semiMinor * Math.sin(angle);
  return { x, y };
}

export default function GalaxyView({ onSelectProject }: Props) {
  const [time, setTime] = useState(0);
  
  // Animate orbits
  useAnimationFrame((t, delta) => {
    setTime(prev => prev + delta / 1000); // Convert to seconds
  });

  return (
    <motion.div
      key="galaxy"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center overflow-visible"
    >
      {/* ── Decorative elliptical orbit paths ── */}
      {ORBITAL_PARAMS.map((params, i) => {
        const semiMinor = params.semiMajor * Math.sqrt(1 - params.eccentricity * params.eccentricity);
        return (
          <div
            key={i}
            className="absolute border border-white/5 pointer-events-none"
            style={{
              width: params.semiMajor * 2,
              height: semiMinor * 2,
              borderRadius: '50%',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%)`,
            }}
          />
        );
      })}

      {/* ── Orbiting Planets with Elliptical Orbits ── */}
      {PROJECTS.map((project, idx) => {
        const params = ORBITAL_PARAMS[idx] || ORBITAL_PARAMS[0];
        // Calculate current angle based on time and orbital period
        const angle = params.startAngle + (time / params.period) * Math.PI * 2;
        const { x: px, y: py } = getEllipticalPosition(angle, params.semiMajor, params.eccentricity);

        return (
          <motion.div
            key={project.id}
            className="absolute flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              x: px, 
              y: py, 
              opacity: 1, 
              scale: 1 
            }}
            transition={{
              opacity: { delay: 0.1 + idx * 0.12, duration: 0.4 },
              scale: { delay: 0.1 + idx * 0.12, type: "spring", stiffness: 200 },
              x: { type: "tween", duration: 0 },
              y: { type: "tween", duration: 0 },
            }}
          >
            <Planet3D
              project={project}
              onClick={() => onSelectProject(project)}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + idx * 0.12 }}
              className="text-[10px] tracking-widest font-bold text-white/40 whitespace-nowrap uppercase pointer-events-none"
            >
              {project.name}
            </motion.p>
          </motion.div>
        );
      })}

      {/* ── Control-Centre Sun ── */}
      <motion.div
        className="absolute flex flex-col items-center gap-2 z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, type: "spring" }}
      >
        {/* Pulse glow */}
        <motion.div
          className="absolute rounded-full bg-emerald-500/10"
          animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 80, height: 80 }}
        />
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-sky-600 to-blue-900 flex items-center justify-center"
          style={{
            boxShadow:
              "0 0 40px rgba(16,185,129,0.6), 0 0 80px rgba(16,185,129,0.3), inset -6px -6px 20px rgba(0,0,0,0.5)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <Rocket size={26} className="text-white" />
        </motion.div>
        <p className="text-[8px] tracking-widest uppercase text-emerald-500/60 uppercase">
          Control Center
        </p>
      </motion.div>

      {/* ── Hint ── */}
      <motion.p
        className="absolute bottom-8 text-[8px] tracking-widest uppercase text-white/20 uppercase pointer-events-none"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Select a planet to inspect
      </motion.p>
    </motion.div>
  );
}
