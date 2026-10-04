"use client";

import { useEngineeringMode } from "./EngineeringModeProvider";
import { Terminal, MonitorPlay } from "lucide-react";

export default function ModeToggle() {
  const { isEngineeringMode, toggleEngineeringMode } = useEngineeringMode();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={toggleEngineeringMode}
        aria-pressed={isEngineeringMode}
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
