"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, Share, Volume2, Square, FileText, Check, RotateCcw, Camera, AlertTriangle, MapPin } from "lucide-react";
import { Report, STAGES, OFFICIAL_POSTS } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import { StatusBar, StageBar, Verified, useSpeak, Tweet } from "./ui";


export default function Detail({ report, lang, autoRead, onBack, onConfirm, onReopen, onLetter, onVerified }: {
  report: Report; lang: Lang; autoRead?: boolean; onBack: () => void; onConfirm: () => void; onReopen: () => void; onLetter: () => void; onVerified: () => void;
}) {
  const t = tr(lang);
  const hasProof = !!report.after;
  const [view, setView] = useState<"before" | "after">(hasProof ? "after" : "before");
  const [askNo, setAskNo] = useState(false);
  const { speak, speaking } = useSpeak();
  const post = OFFICIAL_POSTS[0];
  const needsCheck = report.stage === 3 && !report.reopened;
  const headline = report.reopened
    ? "Reopened and sent back to GBA."
    : report.stage === 4 ? "Fixed. You confirmed it." : report.stage === 3 ? "GBA has marked this as done." : report.stage === 2 ? "An engineer is on it." : "Your ward office has the letter.";
  const listen = () => speak(`${report.title}. ${headline} ${report.statusLine}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (autoRead) listen(); }, []);

  return (
    <div className="screen detail enter">
      <div className="d-hero">
        <img src={view === "after" && report.after ? report.after : report.photo} alt="" key={view} className="fadein" />
        <div className="d-hero-shade" />
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
          <h2 className="tl-heading">{t("What happened so far")}</h2>
          <ol className="timeline">
            {report.timeline.map((e, i) => (
              <li key={i} className={"tl-" + e.kind + (i === 0 ? " latest" : "")}>
                <span className="tl-dot" />
                <div className="tl-body">
                  <div className="tl-time">{e.when}</div>
                  <p className="tl-text">{e.title}</p>
                  {e.thumb && <img src={e.thumb} alt="" className="tl-thumb" />}
                  {e.kind === "letter" && <button className="tl-link" onClick={onLetter}><FileText size={13} /> View letter</button>}
                </div>
              </li>
            ))}
          </ol>
        </section>
        <div style={{ height: 40 }} />
      </div>

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
