"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, Share, Volume2, Square, Phone, MessageCircle, FileText, User, Users, Check, RotateCcw, Camera, AlertTriangle, BadgeCheck } from "lucide-react";
import { Report, STAGES, CATEGORIES, OFFICIAL_POSTS } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import { StatusBar, StageBar, StatusPill, Verified, useSpeak, CatBadge } from "./ui";

export default function Detail({ report, lang, autoRead, onBack, onConfirm, onReopen, onLetter, onVerified }: {
  report: Report; lang: Lang; autoRead?: boolean; onBack: () => void; onConfirm: () => void; onReopen: () => void; onLetter: () => void; onVerified: () => void;
}) {
  const t = tr(lang);
  const [view, setView] = useState<"before" | "after">(report.after && report.stage >= 3 ? "after" : "before");
  const [askNo, setAskNo] = useState(false);
  const { speak, speaking } = useSpeak();
  const post = OFFICIAL_POSTS[0];
  const needsCheck = report.stage === 3 && !report.reopened;
  const headline = report.reopened
    ? "Reopened. We escalated it to the senior engineer."
    : report.stage === 4 ? "Fixed. You confirmed it." : report.stage === 3 ? "GBA has marked this as done." : report.stage === 2 ? "An engineer is on it." : "Your ward office has the letter.";

  const listen = () => speak(`${report.title}. ${headline} ${report.statusLine}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (autoRead) listen(); }, []);

  return (
    <div className="screen detail">
      <div className="d-hero">
        <img src={view === "after" && report.after ? report.after : report.photo} alt="" key={view} className="fadein" />
        <div className="d-hero-shade" />
        <StatusBar dark />
        <div className="d-nav">
          <button className="glassbtn" onClick={onBack} aria-label="Back"><ChevronLeft size={24} strokeWidth={2.6} /></button>
          <button className="glassbtn" aria-label="Share"><Share size={19} strokeWidth={2.4} /></button>
        </div>
        {report.after && report.stage >= 3 && (
          <div className="ba-seg">
            <button className={view === "before" ? "on" : ""} onClick={() => setView("before")}>{t("Before")}</button>
            <button className={view === "after" ? "on" : ""} onClick={() => setView("after")}>{t("After")}</button>
          </div>
        )}
        <div className="d-hero-cap">
          <span className="d-id mono">{report.id}</span>
          <h1>{report.title}</h1>
          <div className="d-place">{report.place} · {report.reportedAgo}</div>
        </div>
      </div>

      <div className="scroll d-scroll">
        <section className={"statuscard" + (report.reopened ? " warn" : report.stage === 4 ? " done" : "")}>
          <div className="sc-top">
            <StatusPill stage={report.stage} reopened={report.reopened} lang={lang} />
            <button className={"listen" + (speaking ? " on" : "")} onClick={listen}>{speaking ? <Square size={14} fill="currentColor" /> : <Volume2 size={17} strokeWidth={2.4} />} {speaking ? "Stop" : t("Listen")}</button>
          </div>
          <h2 className="sc-head">{headline}</h2>
          <p className="sc-line">{report.statusLine}</p>
          <StageBar stage={report.stage} reopened={report.reopened} />
          <div className="sc-steps">{STAGES.map((s, i) => <span key={s.en} className={i <= report.stage ? "on" : ""}>{s[lang]}</span>)}</div>
        </section>

        {needsCheck && (
          <section className="confirmbox">
            <h3>{t("Is it actually fixed?")}</h3>
            <p>Only you can close this complaint. If it isn't fixed, we'll reopen it and send it to the senior engineer.</p>
            <div className="cb-btns">
              <button className="yes" onClick={onConfirm}><Check size={22} strokeWidth={3} /> {t("Yes, it's fixed")}</button>
              <button className="no" onClick={() => setAskNo(true)}><AlertTriangle size={20} strokeWidth={2.5} /> {t("No, still there")}</button>
            </div>
          </section>
        )}

        {report.stage >= 3 && report.cat === "pothole" && (
          <section className="xpost">
            <div className="xp-label"><BadgeCheck size={14} /> GBA's post on X</div>
            <div className="xp-card">
              <div className="xp-head">
                <span className="xp-av"><img src="/img/gba-av.svg" alt="" /></span>
                <div className="xp-who"><b>{post.name} <Verified size={15} onClick={onVerified} /></b><span>{post.handle} · {post.time}</span></div>
                <span className="xp-x">𝕏</span>
              </div>
              <p>{post.text}</p>
              <img src={post.photo} alt="" className="xp-img" />
              <div className="xp-foot"><span>18 m from your report</span><span>Posted today, 11:42 AM</span></div>
            </div>
          </section>
        )}

        <section>
          <h2 className="sectitle">{t("What happened so far")}</h2>
          <ol className="timeline">
            {report.timeline.map((e, i) => (
              <li key={i} className={"tl-" + e.kind + (i === 0 ? " latest" : "")}>
                <span className="tl-dot">{iconFor(e.kind)}</span>
                <div className="tl-body">
                  <div className="tl-title">{e.title}{(e.kind === "assigned" || e.kind === "proof") && <Verified size={14} onClick={onVerified} />}</div>
                  {e.body && <div className="tl-text">{e.body}</div>}
                  {e.kind === "letter" && <button className="tl-link" onClick={onLetter}><FileText size={14} /> View letter</button>}
                  <div className="tl-when">{e.when}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="helprow">
          <button><Phone size={19} strokeWidth={2.4} /><span>Call 1533</span></button>
          <button><MessageCircle size={19} strokeWidth={2.4} /><span>Share on WhatsApp</span></button>
          <button onClick={onLetter}><FileText size={19} strokeWidth={2.4} /><span>Letter</span></button>
        </section>
        <div style={{ height: 40 }} />
      </div>

      {askNo && (
        <div className="modal-scrim" onClick={() => setAskNo(false)}>
          <div className="alertsheet" onClick={(e) => e.stopPropagation()}>
            <span className="grabber" />
            <div className="as-ic"><RotateCcw size={28} strokeWidth={2.4} /></div>
            <h3>Sorry about that. We'll reopen it.</h3>
            <p>We'll send it to the Asst. Executive Engineer with a new deadline and ask 2 neighbours to check it too. A fresh photo helps.</p>
            <button className="primary" onClick={() => { setAskNo(false); onReopen(); }}><Camera size={20} /> Add photo and reopen</button>
            <button className="textbtn" onClick={() => { setAskNo(false); onReopen(); }}>Reopen without photo</button>
          </div>
        </div>
      )}
    </div>
  );
}

function iconFor(k: string) {
  const p = { size: 14, strokeWidth: 3 };
  switch (k) {
    case "you": return <User {...p} />;
    case "letter": return <FileText {...p} />;
    case "assigned": return <User {...p} />;
    case "proof": return <Check {...p} />;
    case "fixed": return <Check {...p} />;
    case "reopen": return <RotateCcw {...p} />;
    case "neighbours": return <Users {...p} />;
    default: return <Check {...p} />;
  }
}

export function VerifiedSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="alertsheet" onClick={(e) => e.stopPropagation()}>
        <span className="grabber" />
        <div className="as-ic gov"><Verified size={40} /></div>
        <h3>Verified government account</h3>
        <p>This badge means the person or account works for the Greater Bengaluru Authority. We check every official against GBA's staff list and its X account before we show their updates.</p>
        <p className="fine">Updates without this badge are from other citizens.</p>
        <button className="primary" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
