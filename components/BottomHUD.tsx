"use client";

import { useState, useEffect } from "react";
import { MapPin, Activity, Wifi } from "lucide-react";

export default function BottomHUD() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":")
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Bottom-left */}
      <div className="fixed bottom-4 left-5 z-50 space-y-1 pointer-events-none">
        <HudLine icon={<MapPin size={9} />} label="SECTOR" value="NX-7 DEEP CORE" />
        <HudLine icon={<Activity size={9} />} label="O₂" value="98.7%" />
        <HudLine icon={<Wifi size={9} />} label="COORDS" value="41.24N // 74.05W" />
      </div>

      {/* Bottom-right */}
      <div className="fixed bottom-4 right-5 z-50 text-right space-y-1 pointer-events-none">
        <HudLine label="LOCAL TIME" value={time || "00:00:00"} right />
        <HudLine label="STATUS" value="ALL SYSTEMS GO" right />
        <HudLine label="BUILD" value="v4.2.0-ALPHA" right />
      </div>
    </>
  );
}

function HudLine({
  icon,
  label,
  value,
  right = false,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  right?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-1 text-[8px] tracking-wider uppercase font-sans font-medium ${
        right ? "justify-end" : ""
      }`}
    >
      {icon && <span className="text-teal-500">{icon}</span>}
      <span className="text-white/20">{label}</span>
      <span className="text-emerald-600/60">{value}</span>
    </p>
  );
}
