"use client";
import { useEffect } from "react";
import posthog from "posthog-js";

// Project API key is public by design (safe in client code).
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_xJH7hMbXs8DVAVwtueW9TmBCJqLZrQr8B45zu95nnQjA";

export default function Analytics() {
  useEffect(() => {
    const path = window.location.pathname;
    // The looping demo clips embedded in the case study run on autopilot: don't track them.
    if (path.startsWith("/demo")) return;
    if (window.location.hostname === "localhost" && !process.env.NEXT_PUBLIC_POSTHOG_DEV) return;
    if (posthog.__loaded) return;

    posthog.init(KEY, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      person_profiles: "identified_only",
    });
    posthog.register({ app: "nodi", surface: path.startsWith("/case-study") ? "case_study" : "prototype" });

    // Prototype interactions come in as window events from the app.
    const onNodi = (e: Event) => {
      const d = (e as CustomEvent).detail as string;
      const map: Record<string, string> = { incident: "nearby_incident_opened", official: "nearby_official_updates_viewed", setting: "setting_changed" };
      if (map[d]) posthog.capture(map[d]);
    };
    const onScreen = (e: Event) => posthog.capture("prototype_screen_viewed", { screen: (e as CustomEvent).detail });
    const onTask = (e: Event) => posthog.capture("prototype_task_completed", (e as CustomEvent).detail);
    window.addEventListener("nodi", onNodi);
    window.addEventListener("nodi-screen", onScreen);
    window.addEventListener("nodi-task", onTask);
    return () => {
      window.removeEventListener("nodi", onNodi);
      window.removeEventListener("nodi-screen", onScreen);
      window.removeEventListener("nodi-task", onTask);
    };
  }, []);
  return null;
}
