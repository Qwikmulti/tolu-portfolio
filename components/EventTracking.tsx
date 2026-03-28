"use client";
import { useEffect } from "react";

type EventName =
  | "download_guide_click"
  | "join_community_click"
  | "youtube_visit"
  | "subscribe_submit"
  | "contact_submit"
  | "whatsapp_click";

export function trackEvent(event: EventName, properties?: Record<string, string | number | boolean>) {
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics] Event:", event, properties);
  }
  // Plausible
  // (window as any).plausible?.(event, { props: properties });
  // GA4
  // if (typeof window.gtag !== "undefined") {
  //   window.gtag("event", event, properties);
  // }
}

export function EventTracking() {
  useEffect(() => {
    // Add data attributes to trackable elements
    const trackable = document.querySelectorAll("[data-track]");
    trackable.forEach((el) => {
      el.addEventListener("click", () => {
        const eventName = el.getAttribute("data-track") as EventName;
        if (eventName) trackEvent(eventName);
      });
    });
  }, []);

  return null;
}
