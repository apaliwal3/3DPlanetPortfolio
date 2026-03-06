import {
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Terminal,
  Zap,
  Shield,
  Box,
  Wifi,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type View = "loading" | "galaxy" | "project" | "bio";

export type Project = {
  id: number;
  name: string;
  description: string;
  tech: string[];
  size: string;
  shadowColor: string;
  colors: string[];
};

export type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
};

export type WarpParticle = {
  id: number;
  angleDeg: number;
  length: number;
  color: string;
  delay: number;
  duration: number;
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "NEXUS PROTOCOL",
    description:
      "A distributed neural-network orchestration platform enabling real-time inter-system communication across quantum-encrypted channels. Built for enterprises requiring ultra-low latency data pipelines at planetary scale.",
    tech: ["Next.js", "TypeScript", "WebSockets", "Redis", "PostgreSQL"],
    size: "w-28 h-28",
    shadowColor: "rgba(16,185,129,0.7)",
    colors: ["#0f2027", "#1a3a4a", "#2c5364", "#1e6f8a", "#38bdf8"],
  },
  {
    id: 2,
    name: "VOID MARKET",
    description:
      "Decentralised commerce protocol leveraging smart contracts for trustless peer-to-peer asset exchange. Supports NFT gating, DAO governance, and multi-chain liquidity bridging across seven networks.",
    tech: ["Solidity", "React", "Ethers.js", "IPFS", "Hardhat"],
    size: "w-24 h-24",
    shadowColor: "rgba(236,72,153,0.7)",
    colors: ["#1a0022", "#3d0048", "#6b0057", "#9d1d6e", "#ec4899"],
  },
  {
    id: 3,
    name: "STELLAR OS",
    description:
      "Lightweight browser-based OS emulator with a fully functional window manager, virtual file system, and an integrated AI terminal assistant powered by a local large-language model running entirely client-side.",
    tech: ["React", "Zustand", "WebAssembly", "LangChain", "Tailwind"],
    size: "w-32 h-32",
    shadowColor: "rgba(251,191,36,0.7)",
    colors: ["#1a1200", "#3d2f00", "#6b5200", "#a07800", "#fbbf24"],
  },
  {
    id: 4,
    name: "PHANTOM API",
    description:
      "High-performance REST & GraphQL gateway with built-in rate limiting, JWT auth, and auto-generated docs. Handles 100k+ requests per second on commodity hardware via zero-copy async I/O.",
    tech: ["Node.js", "GraphQL", "Prisma", "Docker", "Kubernetes"],
    size: "w-24 h-24",
    shadowColor: "rgba(52,211,153,0.7)",
    colors: ["#001a0d", "#003d1a", "#006633", "#008f4a", "#34d399"],
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const SKILLS = [
  { name: "TypeScript", icon: Code2 },
  { name: "React", icon: Layers },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Box },
  { name: "GraphQL", icon: Zap },
  { name: "AWS", icon: Wifi },
  { name: "Rust", icon: Shield },
  { name: "Python", icon: Cpu },
];

// ─── Static randomised values (generated once at module level) ────────────────

export const STARS: Star[] = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  dur: Math.random() * 3 + 2,
  delay: Math.random() * 6,
}));

export const WARP_PARTICLES: WarpParticle[] = Array.from(
  { length: 150 },
  (_, i) => {
    const angle =
      (i / 150) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
    return {
      id: i,
      angleDeg: (angle * 180) / Math.PI,
      length: Math.random() * 80 + 20,
      color: `hsl(${280 + Math.random() * 60},100%,${
        60 + Math.random() * 30
      }%)`,
      delay: Math.random() * 1.8,
      duration: Math.random() * 0.9 + 0.6,
    };
  }
);

export const HUD_MSGS = [
  "INITIALIZING CORE SYSTEMS...",
  "CALIBRATING NAVIGATION ARRAY...",
  "ENGAGING QUANTUM DRIVES...",
  "PREPARING THRUSTERS...",
  "SYNCHRONIZING STAR CHARTS...",
  "SYSTEMS NOMINAL — LAUNCH SEQUENCE READY",
];
