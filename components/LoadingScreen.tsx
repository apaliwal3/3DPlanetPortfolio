"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import { WARP_PARTICLES, HUD_MSGS } from "@/lib/data";

type Props = {
  loadProgress: number;
  msgIdx: number;
};

const CORNER_CLASSES = [
  "-top-5 -left-5 border-t border-l",
  "-top-5 -right-5 border-t border-r",
  "-bottom-5 -left-5 border-b border-l",
  "-bottom-5 -right-5 border-b border-r",
] as const;

export default function LoadingScreen({ loadProgress, msgIdx }: Props) {
  return (
    <motion.div
      key="loading"
      className="absolute inset-0 flex items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* ── Warp Drive particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single anchor at viewport centre */}
        <div className="absolute" style={{ top: "50%", left: "50%" }}>
          {WARP_PARTICLES.map((p) => (
            /* Rotation wrapper: Y-axis points radially outward */
            <div
              key={p.id}
              className="absolute"
              style={{
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                transform: `rotate(${p.angleDeg}deg)`,
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  width: "1.5px",
                  height: p.length,
                  background: `linear-gradient(to bottom, transparent 0%, ${p.color} 100%)`,
                  left: "-0.75px",
                  top: 0,
                  transformOrigin: "top center",
                }}
                initial={{ scaleY: 0, opacity: 0, y: 0 }}
                animate={{ scaleY: [0, 1, 1], opacity: [0, 0.85, 0], y: [0, 900] }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeIn",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── HUD Card ── */}
      <div className="relative z-10 flex flex-col items-center gap-7 w-80">
        {/* Corner brackets */}
        {CORNER_CLASSES.map((c, i) => (
          <span key={i} className={`absolute w-5 h-5 border-emerald-600/50 ${c}`} />
        ))}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="text-emerald-500"
        >
          <Rocket size={44} />
        </motion.div>

        <div className="text-center space-y-1">
          <p className="text-[9px] tracking-widest uppercase text-emerald-600 uppercase">
            Cyber-Noir Systems
          </p>
          <h1 className="text-2xl tracking-widest uppercase text-white font-black italic uppercase">
            Portfolio OS
          </h1>
          <p className="text-[10px] tracking-widest font-bold text-emerald-300/50">
            v4.2.0 — CLASSIFIED
          </p>
        </div>

        {/* Cycling status message */}
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] font-bold tracking-wider text-emerald-500/80 text-center"
          >
            {HUD_MSGS[msgIdx]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <span className="text-[8px] tracking-widest text-teal-600 uppercase">
              Sys Load
            </span>
            <span className="text-[9px] tracking-widest text-emerald-300">
              {Math.floor(loadProgress)}%
            </span>
          </div>
          <div className="w-full h-px bg-emerald-950 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-emerald-300"
              style={{ width: `${loadProgress}%` }}
            />
            {/* Shimmer sweep */}
            <motion.div
              className="absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ["-50px", "340px"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
