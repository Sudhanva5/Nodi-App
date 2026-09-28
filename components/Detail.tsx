"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, Share, Volume2, VolumeX, Square, FileText, Check, RotateCcw, Camera, AlertTriangle, MapPin, Play, Pause, Maximize2, Mic } from "lucide-react";
import { Report, STAGES, OFFICIAL_POSTS, TimelineItem } from "@/lib/data";

type Media = NonNullable<TimelineItem["media"]>[number];
import { Lang, tr } from "@/lib/i18n";
import { StatusBar, StageBar, Verified, useSpeak, Tweet } from "./ui";


export default function Detail({ report, lang, autoRead, onBack, onConfirm, onReopen, onLetter, onVerified }: {
  report: Report; lang: Lang; autoRead?: boolean; onBack: () => void; onConfirm: () => void; onReopen: () => void; onLetter: () => void; onVerified: () => void;
}) {
  const t = tr(lang);
  const hasProof = !!report.after;
  const [view, setView] = useState<"before" | "after">(hasProof ? "after" : "before");
  const [askNo, setAskNo] = useState(false);
  const [viewer, setViewer] = useState<{ items: Media[]; index: number } | null>(null);
  const { speak, speaking } = useSpeak();
  const post = OFFICIAL_POSTS[0];
  const needsCheck = report.stage === 3 && !report.reopened;
  const headline = report.reopened
    ? "Reopened and sent back to GBA."
    : report.stage === 4 ? "The issue is resolved." : report.stage === 3 ? "GBA has marked this as done." : report.stage === 2 ? "An engineer is on it." : "Your ward office has the letter.";
  const listen = () => speak(`${report.title}. ${headline} ${report.statusLine}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (autoRead) listen(); }, []);

  return (
    <div className="screen detail enter">
      <div className="d-hero">
        <img src={view === "after" && report.after ? report.after : report.photo} alt="" key={view} className="fadein" />
        <div className="d-hero-shade" />
        <div className="pblur" aria-hidden><i /><i /><i /><i /><i /></div>
        <StatusBar dark />
        <div className="d-nav">
          <button className="glassbtn" onClick={onBack} aria-label="Back"><ChevronLeft size={24} /></button>
          <button className="glassbtn" aria-label="Share"><Share size={19} /></button>
        </div>
        {hasProof && (
          <div className="ba-seg">
            <button className={view === "before" ? "on" : ""} onClick={() => setView("before")}>{t("Before")}</button>
            <button className={view === "after" ? "on" : ""} onClick={() => setView("after")}>{t("After")}</button>
          </div>
        )}
        <div className="d-hero-cap">
          <span className="d-id mono">{report.id}</span>
          <h1>{report.title}</h1>
          <div className="d-place"><MapPin size={12} /> {report.place}</div>
        </div>
      </div>

      <div className="scroll d-scroll">
        <section className={"statuscard" + (report.reopened ? " warn" : report.stage === 4 ? " done" : "")}>
          <div className="sc-top">
            <h2 className="sc-head">{headline}</h2>
            <button className={"listen" + (speaking ? " on" : "")} onClick={listen} aria-label={speaking ? "Stop reading" : t("Listen")}>{speaking ? <Square size={13} fill="currentColor" /> : <Volume2 size={17} />}</button>
          </div>
          {report.statusLine && <p className="sc-line">{report.statusLine}</p>}
          <StageBar stage={report.stage} reopened={report.reopened} />
          <div className="sc-steps">{STAGES.map((s, i) => <span key={s.en} className={i <= report.stage ? "on" : ""}>{s[lang]}</span>)}</div>
        </section>

        {needsCheck && (
          <section className="confirmbox">
            <h3>{t("Is it actually fixed?")}</h3>
            <p>Only you can close this. If it isn&apos;t fixed, it goes back to GBA.</p>
            <div className="cb-btns">
              <button className="yes" onClick={onConfirm}><Check size={20} /> {t("Yes, it's fixed")}</button>
              <button className="no" onClick={() => setAskNo(true)}><AlertTriangle size={18} /> {t("No, still there")}</button>
            </div>
          </section>
        )}

        {hasProof && (
          <section className="xpost">
            <div className="xp-label"><span>GBA&apos;s post on Twitter</span></div>
            <Tweet d={{ name: post.name, handle: post.handle, avatar: "/img/gba-logo.png", text: post.text, photo: post.photo, time: "11:42 AM · Sep 27, 2026", likes: 212, replies: 14, url: "https://x.com/GBA_office" }} />
          </section>
        )}

        <section>
          <h2 className="tl-heading">{lang === "kn" ? "ಟೈಮ್‌ಲೈನ್" : "Timeline"}</h2>
          <ol className="timeline">
            {report.timeline.map((e, i) => (
              <li key={i} className={"tl-" + e.kind + (i === 0 ? " latest" : "")}>
                <span className="tl-dot" />
                <div className="tl-body">
                  <div className="tl-row"><span className="tl-stage">{e.title}</span><span className="tl-time">{e.when}</span></div>
                  {e.body && <p className="tl-text">{e.body}</p>}
                  {e.thumb && <img src={e.thumb} alt="" className="tl-thumb" />}
                  {e.media && (
                    <div className="tl-media">
                      {e.media.map((m, k) => m.type === "voice" ? (
                        <button key={k} className="tl-voice" onClick={() => setViewer({ items: e.media!, index: k })} aria-label="Play voice note"><Play size={12} fill="currentColor" /><i className="tl-wave">{Array.from({ length: 14 }).map((_, j) => <b key={j} style={{ height: 4 + ((j * 7) % 12) }} />)}</i>{m.dur}</button>
                      ) : (
                        <button key={k} className={"tl-mthumb" + (m.type === "video" ? " vid" : "")} onClick={() => setViewer({ items: e.media!, index: k })} aria-label={m.type === "video" ? "Play video" : "View photo"}>
                          <img src={m.src} alt="" />
                          {m.type === "video" && <><span className="tl-play"><Play size={12} fill="currentColor" /></span><em>{m.dur}</em></>}
                        </button>
                      ))}
                    </div>
                  )}
                  {e.kind === "letter" && <button className="tl-link" onClick={onLetter}><FileText size={13} /> View letter</button>}
                </div>
              </li>
            ))}
          </ol>
        </section>
        <div style={{ height: 40 }} />
      </div>

      {viewer && <MediaSheet items={viewer.items} index={viewer.index} onIndex={(i) => setViewer({ ...viewer, index: i })} onClose={() => setViewer(null)} />}

      {askNo && (
        <div className="modal-scrim" onClick={() => setAskNo(false)}>
          <div className="alertsheet" onClick={(e) => e.stopPropagation()}>
            <span className="grabber" />
            <div className="as-ic"><RotateCcw size={26} /></div>
            <h3>Sorry about that. We&apos;ll reopen it.</h3>
            <p>It goes back to GBA with a new deadline. A fresh photo helps.</p>
            <button className="primary" onClick={() => { setAskNo(false); onReopen(); }}><Camera size={19} /> Add photo and reopen</button>
            <button className="textbtn" onClick={() => { setAskNo(false); onReopen(); }}>Reopen without photo</button>
          </div>
        </div>
      )}
    </div>
  );
}


export function VerifiedSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="alertsheet" onClick={(e) => e.stopPropagation()}>
        <span className="grabber" />
        <div className="as-ic gov"><img src="/img/gba-logo.png" alt="" className="gbalogo" style={{ width: 44, height: 44 }} /></div>
        <h3>Verified GBA official</h3>
        <p>This person works for the Greater Bengaluru Authority. We check every official against GBA&apos;s staff list before we show their updates.</p>
        <button className="primary" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}

/* ---------- Media viewer (bottom sheet) ---------- */
const toSecs = (d?: string) => { const [m, s] = (d ?? "0:10").split(":").map(Number); return m * 60 + s; };
const fmt = (n: number) => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, "0")}`;

function MediaSheet({ items, index, onIndex, onClose }: { items: Media[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const m = items[index];
  const total = toSecs(m.dur);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [muted, setMuted] = useState(false);
  useEffect(() => { setPlaying(false); setPos(0); }, [index]);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos((p) => { if (p + 0.25 >= total) { setPlaying(false); return total; } return p + 0.25; }), 250);
    return () => clearInterval(t);
  }, [playing, total]);
  const label = m.type === "photo" ? "Photo" : m.type === "video" ? "Video" : "Voice note";
  const pct = total ? (pos / total) * 100 : 0;
  const seek = (e: React.PointerEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); setPos(Math.max(0, Math.min(total, ((e.clientX - r.left) / r.width) * total))); };

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="mediasheet" onClick={(e) => e.stopPropagation()}>
        <div className="ms-bar">
          <span className="grabber" />
          <b>{label} <span>{index + 1} of {items.length}</span></b>
          <button className="pf-done" onClick={onClose}>Done</button>
        </div>

        <div className="ms-stage">
          {m.type === "photo" && <img src={m.src} alt="" className="ms-photo" />}
          {m.type === "video" && (
            <div className="ms-video">
              {!playing && pos === 0 && <button className="ms-bigplay" onClick={() => setPlaying(true)} aria-label="Play"><Play size={30} fill="currentColor" /></button>}
              <div className="ms-controls">
                <button onClick={() => { if (pos >= total) setPos(0); setPlaying((p) => !p); }} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button>
                <span className="ms-t">{fmt(pos)}</span>
                <div className="ms-scrub" onPointerDown={seek}><i style={{ width: `${pct}%` }} /><b style={{ left: `${pct}%` }} /></div>
                <span className="ms-t">{fmt(total)}</span>
                <button onClick={() => setMuted((x) => !x)} aria-label={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
                <button aria-label="Full screen"><Maximize2 size={17} /></button>
              </div>
            </div>
          )}
          {m.type === "voice" && (
            <div className="ms-voice">
              <span className="ms-mic"><Mic size={26} /></span>
              <div className="ms-vwave">{Array.from({ length: 42 }).map((_, j) => <b key={j} className={(j / 42) * 100 < pct ? "on" : ""} style={{ height: 8 + ((j * 13) % 34) }} />)}</div>
              <div className="ms-vrow">
                <button className="ms-vplay" onClick={() => { if (pos >= total) setPos(0); setPlaying((p) => !p); }} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button>
                <span className="ms-t">{fmt(pos)} / {fmt(total)}</span>
              </div>
              <p className="ms-trans">"ಬೆಳಗ್ಗೆಯಿಂದ ನೀರು ಹರಿಯುತ್ತಿದೆ, ಫುಟ್‌ಪಾತ್ ಮುಳುಗಿದೆ"<span>Water has been flowing since morning, the footpath is under water.</span></p>
            </div>
          )}
        </div>

        {items.length > 1 && (
          <div className="ms-strip">
            {items.map((it, i) => (
              <button key={i} className={"ms-th" + (i === index ? " on" : "")} onClick={() => onIndex(i)} aria-label={it.type}>
                {it.type === "voice" ? <Mic size={18} /> : <img src={it.src} alt="" />}
                {it.type === "video" && <span className="ms-thplay"><Play size={10} fill="currentColor" /></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
