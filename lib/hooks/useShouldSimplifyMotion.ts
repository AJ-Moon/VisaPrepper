"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function readConnectionSignal(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!connection) return false;
  // Only the most explicit signals: the user turned on Data Saver, or the
  // connection is genuinely very slow. A merely-average "3g" reading isn't
  // enough to withhold the animation — once the (small) JS bundle is
  // loaded, the animation itself is compositor-only and costs nothing more
  // over the network, so this isn't the right place to be conservative.
  return Boolean(connection.saveData) || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
}

const viewportQuery = typeof window !== "undefined" ? window.matchMedia("(max-width: 1023px)") : null;

function subscribe(callback: () => void) {
  viewportQuery?.addEventListener("change", callback);
  return () => viewportQuery?.removeEventListener("change", callback);
}

function getSnapshot() {
  return Boolean(viewportQuery?.matches) || readConnectionSignal();
}

function getServerSnapshot() {
  return true;
}

// Combines prefers-reduced-motion, viewport size, and (where available)
// explicit data-saving signals to decide whether the scroll-driven hero
// should run, or fall back to a plain static layout. The server snapshot is
// "simplify" so the very first paint never risks shipping the heavier
// experience to a device that can't afford it; useSyncExternalStore keeps
// this in sync with resizes without a manual setState-in-effect.
export function useShouldSimplifyMotion() {
  const prefersReducedMotion = useReducedMotion();
  const deviceSignalsSimplify = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return Boolean(prefersReducedMotion) || deviceSignalsSimplify;
}
