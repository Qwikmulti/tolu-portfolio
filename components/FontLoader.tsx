"use client";
import { useEffect, useState } from "react";

export function FontLoader({ children }: { children: React.ReactNode }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Check if fonts are already loaded (document.fonts.ready)
    document.fonts.ready.then(() => setFontsLoaded(true));

    // Fallback timeout
    const timeout = setTimeout(() => setFontsLoaded(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!fontsLoaded) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
