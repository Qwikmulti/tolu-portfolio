"use client";
import { useEffect } from "react";

export function PWAProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.ts").catch(console.error);
    }
  }, []);
  return null;
}