"use client";
import { useCallback, useEffect, useState } from "react";
import NodiApp, { ScreenKey } from "@/components/NodiApp";

type TaskKey = "report" | "progress" | "nearby" | "settings";
const TASKS: { k: TaskKey; title: string; how: string }[] = [
  { k: "report", title: "Report a problem", how: "Tap Report a problem, take the photo, add a video with +, write or say a note, then Send to GBA." },
  { k: "progress", title: "Check the progress", how: "Open the pothole under 'Check if it's fixed'. Scroll through the proof, GBA's post and the timeline." },
  { k: "nearby", title: "Explore Nearby", how: "Open Nearby, tap any photo on the map, then switch to Official updates." },
  { k: "settings", title: "Accessibility and personal settings", how: "Tap your photo on Home. Try Light mode, Kannada or bigger text." },
];

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [done, setDone] = useState<Record<TaskKey, boolean>>({ report: false, progress: false, nearby: false, settings: false });
  const tick = useCallback((k: TaskKey) => setDone((d) => (d[k] ? d : { ...d, [k]: true })), []);
  const onScreen = useCallback((k: ScreenKey) => { if (k === "success") tick("report"); if (k === "detail") tick("progress"); }, [tick]);
  useEffect(() => {
    const h = (e: Event) => { const d = (e as CustomEvent).detail; if (d === "incident" || d === "official") tick("nearby"); if (d === "setting") tick("settings"); };
    window.addEventListener("nodi", h); return () => window.removeEventListener("nodi", h);
  }, [tick]);
  const count = Object.values(done).filter(Boolean).length;

  return (
    <main className="stage">
      <aside className="checklist">
        <div className="cl-brand"><img src="/img/logo.png" alt="" /><div><h1>Nodi</h1><span>Interactive prototype</span></div></div>
        <p className="cl-lead">Try these four things. Each one ticks itself off when you do it.</p>
        <div className="cl-progress"><span style={{ width: `${(count / 4) * 100}%` }} /></div>
        <div className="cl-count">{count} of 4 done</div>
        <ol className="cl-list">
          {TASKS.map((t, i) => (
            <li key={t.k} className={done[t.k] ? "done" : ""}>
              <button className="cl-box" role="checkbox" aria-checked={done[t.k]} onClick={() => setDone((d) => ({ ...d, [t.k]: !d[t.k] }))}>
                <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div>
                <b><span className="cl-n">{i + 1}.</span> {t.title}</b>
                <p>{t.how}</p>
              </div>
            </li>
          ))}
        </ol>
      </aside>
      <div className="device-wrap">
        <div className="device">
          <div className="island" />
          <div className="device-screen"><NodiApp onScreen={onScreen} theme={theme} onTheme={setTheme} /></div>
        </div>
      </div>
    </main>
  );
}
