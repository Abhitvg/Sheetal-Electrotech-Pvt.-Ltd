"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface EngineeringModeContextType {
  isEngineeringMode: boolean;
  toggleEngineeringMode: () => void;
}

const EngineeringModeContext = createContext<EngineeringModeContextType | undefined>(undefined);

export function EngineeringModeProvider({ children }: { children: ReactNode }) {
  const [isEngineeringMode, setIsEngineeringMode] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const savedMode = localStorage.getItem("sheetal-engineering-mode");
    if (savedMode === "true") {
      setIsEngineeringMode(true);
      document.body.classList.add("engineering-mode");
    }
  }, []);

  const toggleEngineeringMode = () => {
    setIsEngineeringMode(prev => {
      const newState = !prev;
      if (newState) {
        document.body.classList.add("engineering-mode");
      } else {
        document.body.classList.remove("engineering-mode");
      }
      localStorage.setItem("sheetal-engineering-mode", String(newState));
      return newState;
    });
  };

  return (
    <EngineeringModeContext.Provider value={{ isEngineeringMode, toggleEngineeringMode }}>
      {children}
    </EngineeringModeContext.Provider>
  );
}

export function useEngineeringMode() {
  const context = useContext(EngineeringModeContext);
  if (context === undefined) {
    throw new Error("useEngineeringMode must be used within an EngineeringModeProvider");
  }
  return context;
}
