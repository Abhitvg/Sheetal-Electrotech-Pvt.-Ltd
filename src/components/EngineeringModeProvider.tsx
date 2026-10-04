"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";

interface EngineeringModeContextType {
  isEngineeringMode: boolean;
  toggleEngineeringMode: () => void;
}

const EngineeringModeContext = createContext<EngineeringModeContextType | undefined>(undefined);
const STORAGE_KEY = "sheetal-engineering-mode";
const listeners = new Set<() => void>();

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return false;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function applyBodyClass(enabled: boolean) {
  document.body.classList.toggle("engineering-mode", enabled);
}

function setEngineeringMode(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(enabled));
  applyBodyClass(enabled);
  listeners.forEach((listener) => listener());
}

export function EngineeringModeProvider({ children }: { children: ReactNode }) {
  const isEngineeringMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    applyBodyClass(getSnapshot());

    const handleStorage = () => {
      const enabled = getSnapshot();
      applyBodyClass(enabled);
      listeners.forEach((listener) => listener());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleEngineeringMode = () => {
    setEngineeringMode(!getSnapshot());
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
