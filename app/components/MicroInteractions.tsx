"use client";
import { useEffect } from "react";

// Add subtle ripple effect to all buttons on click
export function MicroInteractions() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("button, a");
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: ripple 0.6s ease-out forwards;
      `;

      const style = document.createElement("style");
      style.textContent = `
        @keyframes ripple {
          to { width: 300px; height: 300px; opacity: 0; }
        }
      `;
      if (!document.querySelector("#ripple-style")) {
        document.head.appendChild(style);
        style.id = "ripple-style";
      }

      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
