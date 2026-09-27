"use client";

import { useEngineeringMode } from "./EngineeringModeProvider";
import { Terminal, MonitorPlay } from "lucide-react";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { isEngineeringMode, toggleEngineeringMode } = useEngineeringMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={toggleEngineeringMode}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-mono text-xs uppercase tracking-widest ${
          isEngineeringMode 
            ? "bg-paper text-ink border-ink hover:bg-ink hover:text-paper"
            : "glass text-ink border-slate-200 hover:border-accent hover:text-accent shadow-lg"
        }`}
      >
        {isEngineeringMode ? (
          <>
            <MonitorPlay className="w-4 h-4" />
            <span>Beauty Mode</span>
          </>
        ) : (
          <>
            <Terminal className="w-4 h-4" />
            <span>Engineering Mode</span>
          </>
        )}
      </button>
    </div>
  );
}
