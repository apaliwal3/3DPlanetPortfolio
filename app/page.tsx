"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import GalaxyView from "@/components/GalaxyView";
import ProjectView from "@/components/ProjectView";
import BioView from "@/components/BioView";
import TopNav from "@/components/TopNav";
import BottomHUD from "@/components/BottomHUD";
import { STARS, HUD_MSGS, type View, type Project } from "@/lib/data";

export default function Portfolio() {
  const [view, setView] = useState<View>("loading");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  // Loading simulation (~4.5 s)
  useEffect(() => {
    if (view !== "loading") return;

    const progressId = setInterval(() => {
      setLoadProgress((prev) => {
        const next = prev + Math.random() * 2.8 + 0.6;
        if (next >= 100) {
          clearInterval(progressId);
          setTimeout(() => setView("galaxy"), 600);
          return 100;
        }
        return next;
      });
    }, 90);

    const msgId = setInterval(() => {
      setMsgIdx((p) => (p + 1) % HUD_MSGS.length);
    }, 750);

    return () => {
      clearInterval(progressId);
      clearInterval(msgId);
    };
  }, [view]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0f0a14] font-sans font-medium select-none">
      {/* ── Twinkling Starfield ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {STARS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}px`, height: `${s.size}px` }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Radial vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ── Views ── */}
      <AnimatePresence mode="wait">
        {view === "loading" && (
          <LoadingScreen key="loading" loadProgress={loadProgress} msgIdx={msgIdx} />
        )}

        {view !== "loading" && (
          <motion.div
            key="app"
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TopNav view={view} setView={setView} setSelectedProject={setSelectedProject} />

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                {view === "galaxy" && (
                  <GalaxyView
                    key="galaxy"
                    onSelectProject={(p) => {
                      setSelectedProject(p);
                      setView("project");
                    }}
                  />
                )}
                {view === "project" && selectedProject && (
                  <ProjectView
                    key="project"
                    project={selectedProject}
                    onBack={() => setView("galaxy")}
                  />
                )}
                {view === "bio" && <BioView key="bio" />}
              </AnimatePresence>
            </div>

            <BottomHUD />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
