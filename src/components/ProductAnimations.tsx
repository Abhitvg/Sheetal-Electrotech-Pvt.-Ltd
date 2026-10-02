"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function HeroTextFadeUp({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
      {children}
    </motion.div>
  );
}

export function HeroImageScaleIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: .97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .8, delay: .1 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export function FamilyCardFadeUp({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ProductCardFadeUp({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .4, delay }}
    >
      {children}
    </motion.div>
  );
}
