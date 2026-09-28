"use client";
import React, { useEffect, useRef, useState } from "react";
import { Construction, Trash2, Lightbulb, Droplets, Waves, TreePine, CircleHelp, Footprints } from "lucide-react";
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
    case "footpath": return <Footprints {...p} />;
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

/** Vertical flip between phrases (hero headline, impact counter). */
export function FlipText({ items, interval = 2200, className }: { items: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  return (
    <span className={"flip " + (className ?? "")} aria-live="polite">
      <span key={i} className="flip-in">{items[i % items.length]}</span>
    </span>
  );
}

export function NyMark({ size = 14 }: { size?: number }) {
  // Namma Yatri style mark: yellow rounded square with black "ny"
  return (
    <span className="nymark" style={{ width: size + 6, height: size + 6, fontSize: size * 0.62 }}>ny</span>
  );
}

export function GbaSeal({ size = 22 }: { size?: number }) {
  return <img src="/img/gba-logo.png" alt="Greater Bengaluru Authority" width={size} height={size} className="gbalogo" style={{ width: size, height: size }} />;
}

/* ---------- Twitter / X embed, matched to the official embed ---------- */
const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-label="X"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const GovCheck = () => (
  <svg viewBox="0 0 22 22" width={17} height={17} aria-label="Verified government account" className="tw-badge"><path fill="#829AAB" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" /></svg>
);

export type TweetData = { name: string; handle: string; avatar: string; text: string; photo?: string; time: string; likes: number; replies: number; url: string };

export function Tweet({ d, cta = "Open on Twitter" }: { d: TweetData; cta?: string }) {
  const parts = d.text.split(/(#\w+|@\w+)/g);
  return (
    <div className="tw">
      <div className="tw-head">
        <img src={d.avatar} alt="" className="tw-av" />
        <div className="tw-names">
          <span className="tw-name">{d.name}<GovCheck /></span>
          <span className="tw-handle">{d.handle} · <a href={d.url} target="_blank" rel="noreferrer">Follow</a></span>
        </div>
        <a className="tw-x" href={d.url} target="_blank" rel="noreferrer"><XLogo /></a>
      </div>
      <p className="tw-text">{parts.map((p, i) => (p.startsWith("#") || p.startsWith("@") ? <span key={i} className="tw-link">{p}</span> : p))}</p>
      {d.photo && <img src={d.photo} alt="" className="tw-media" />}
      <div className="tw-time">{d.time}</div>
      <div className="tw-actions">
        <span className="tw-like"><svg viewBox="0 0 24 24" width="19" height="19"><path fill="#F91880" d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" /></svg>{d.likes}</span>
        <span><svg viewBox="0 0 24 24" width="19" height="19"><path fill="currentColor" d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" /></svg>Reply</span>
        <span><svg viewBox="0 0 24 24" width="19" height="19"><path fill="currentColor" d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z" /></svg>Copy link</span>
      </div>
      <a className="tw-cta" href={d.url} target="_blank" rel="noreferrer">{cta}</a>
    </div>
  );
}
