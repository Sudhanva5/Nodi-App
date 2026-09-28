"use client";
import React, { useEffect, useRef, useState } from "react";
import { Construction, Trash2, Lightbulb, Droplets, Waves, TreePine, CircleHelp } from "lucide-react";
import { Category, CATEGORIES, STAGES } from "@/lib/data";

export function CatIcon({ cat, size = 18, color }: { cat: Category; size?: number; color?: string }) {
  const p = { size, strokeWidth: 1.9, color: color ?? "currentColor" };
  switch (cat) {
    case "pothole": return <Construction {...p} />;
    case "garbage": return <Trash2 {...p} />;
    case "streetlight": return <Lightbulb {...p} />;
    case "water": return <Droplets {...p} />;
    case "drain": return <Waves {...p} />;
    case "tree": return <TreePine {...p} />;
    default: return <CircleHelp {...p} />;
  }
}

export function CatBadge({ cat, size = 36, accent }: { cat: Category; size?: number; accent?: boolean }) {
  return (
    <span className={"catbadge" + (accent ? " accent" : "")} style={{ width: size, height: size }}>
      <CatIcon cat={cat} size={Math.round(size * 0.52)} />
    </span>
  );
}

export function StatusDot({ stage, reopened, lang = "en" }: { stage: number; reopened?: boolean; lang?: "en" | "kn" }) {
  const label = reopened ? (lang === "kn" ? "ಮರು ತೆರೆಯಲಾಗಿದೆ" : "Reopened") : STAGES[stage][lang];
  const cls = reopened ? "warn" : stage === 4 ? "done" : stage === 3 ? "check" : "prog";
  return <span className={"sdot-label " + cls}><i />{label}</span>;
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={"statusbar" + (dark ? " dark" : "")}>
      <span className="sb-time">9:41</span>
      <span className="sb-right">
        <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.5c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 0 0 8 .7 10.3 10.3 0 0 0 .8 3.6L2 4.9a8.5 8.5 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4.3a6.7 6.7 0 0 0-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3Zm0 3.5c-.6 0-1.1.2-1.5.6L8 11.8l1.5-1.6c-.4-.4-.9-.6-1.5-.6Z" fill="currentColor"/></svg>
        <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".4" fill="none"/><rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".5"/></svg>
      </span>
    </div>
  );
}

/** Government-style verified check (gold/grey like X "government" badge). */
export function Verified({ size = 16, onClick, tone = "gov" }: { size?: number; onClick?: () => void; tone?: "gov" | "blue" }) {
  const fill = tone === "gov" ? "#C9A227" : "#1D9BF0";
  return (
    <button className="verified" onClick={(e) => { e.stopPropagation(); onClick?.(); }} aria-label="Verified official account">
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path fill={fill} d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34Z"/>
        <path fill="#fff" d="m10.54 16.2-3.74-3.74 1.41-1.41 2.26 2.26 5.3-5.8 1.47 1.36z"/>
      </svg>
    </button>
  );
}

export function StageBar({ stage, reopened, compact }: { stage: number; reopened?: boolean; compact?: boolean }) {
  return (
    <div className={"stagebar" + (compact ? " compact" : "")} aria-label={`Step ${stage + 1} of 5`}>
      {STAGES.map((s, i) => (
        <span key={s.en} className={"seg" + (i <= stage ? " on" : "") + (i === stage && stage < 4 ? " now" : "") + (reopened && i === stage ? " warn" : "") + (stage === 4 ? " done" : "")} />
      ))}
    </div>
  );
}

export function StatusPill(props: { stage: number; reopened?: boolean; lang?: "en" | "kn" }) {
  return <StatusDot {...props} />;
}

type Detent = "low" | "mid" | "high";
/** Bottom sheet with detents (HIG). Drag the grabber or tap it to cycle. */
export function Sheet({ detent, onDetent, children, dark, heights = { low: 150, mid: 360, high: 690 } }: {
  detent: Detent; onDetent: (d: Detent) => void; children: React.ReactNode; dark?: boolean; heights?: Record<Detent, number>;
}) {
  const [drag, setDrag] = useState<number | null>(null);
  const start = useRef<{ y: number; h: number } | null>(null);
  const h = drag ?? heights[detent];
  const onDown = (e: React.PointerEvent) => { start.current = { y: e.clientY, h: heights[detent] }; (e.target as HTMLElement).setPointerCapture(e.pointerId); };
  const onMove = (e: React.PointerEvent) => { if (!start.current) return; setDrag(Math.max(110, Math.min(720, start.current.h + (start.current.y - e.clientY)))); };
  const onUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const moved = Math.abs(e.clientY - start.current.y);
    const cur = drag ?? heights[detent];
    start.current = null; setDrag(null);
    if (moved < 6) { onDetent(detent === "low" ? "mid" : detent === "mid" ? "high" : "mid"); return; }
    const entries = Object.entries(heights) as [Detent, number][];
    entries.sort((a, b) => Math.abs(a[1] - cur) - Math.abs(b[1] - cur));
    onDetent(entries[0][0]);
  };
  return (
    <div className={"sheet" + (dark ? " dark" : "") + (drag !== null ? " dragging" : "")} style={{ height: h }}>
      <div className="grabber-zone" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}>
        <span className="grabber" />
      </div>
      <div className="sheet-body">{children}</div>
    </div>
  );
}

export function useSpeak() {
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => () => { if (typeof window !== "undefined") window.speechSynthesis?.cancel(); }, []);
  const speak = (text: string, lang = "en-IN") => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = 0.92;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };
  return { speak, speaking };
}

export function NyMark({ size = 14 }: { size?: number }) {
  // Namma Yatri style mark: yellow rounded square with black "ny"
  return (
    <span className="nymark" style={{ width: size + 6, height: size + 6, fontSize: size * 0.62 }}>ny</span>
  );
}

export function GbaSeal({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-label="GBA">
      <circle cx="20" cy="20" r="19.25" fill="#161616" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="15" fill="none" stroke="#FCC32C" strokeOpacity=".7" strokeWidth="1" strokeDasharray="1.4 1.8" />
      <text x="20" y="23.8" textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing=".5" fill="#F5F5F5" fontFamily="Inter, system-ui">GBA</text>
    </svg>
  );
}
