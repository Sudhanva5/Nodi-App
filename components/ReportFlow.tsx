"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Zap, RefreshCw, MapPin, Sparkles, ChevronRight, Check, FileText, MessageCircle, Plus, Lock, Play, Camera, Video, Image as ImageIcon, Mic } from "lucide-react";
import { Category, CATEGORIES, Report } from "@/lib/data";
import { Lang } from "@/lib/i18n";
import { CatBadge, CatIcon, StatusBar, NyMark, GbaSeal } from "./ui";

type Mode = "photo" | "video" | "voice";
export type Attachment = { type: "photo" | "video" | "voice"; src?: string; dur?: string };

/* ---------------- Capture ---------------- */
export function Capture({ initialMode, onClose, onCaptured }: { initialMode: Mode; onClose: () => void; onCaptured: (m: Mode) => void }) {
  const [mode, setMode] = useState<Mode>(initialMode === "video" ? "video" : "photo");
  const [flash, setFlash] = useState(false);
  const [rec, setRec] = useState(false);
  const [secs, setSecs] = useState(0);
  useEffect(() => { if (!rec) return; const i = setInterval(() => setSecs((s) => s + 1), 1000); return () => clearInterval(i); }, [rec]);
  useEffect(() => { if (rec && mode === "video" && secs >= 4) { setRec(false); onCaptured("video"); } }, [secs, rec, mode, onCaptured]);

  const shoot = () => {
    if (mode === "photo") { setFlash(true); setTimeout(() => onCaptured("photo"), 380); }
    if (mode === "video") { if (!rec) { setSecs(0); setRec(true); } else { setRec(false); onCaptured("video"); } }
  };

  return (
    <div className="screen capture">
      <StatusBar dark />
      <div className="viewfinder">
        <img src="/img/water.jpg" alt="" className="vf-img" />
        <div className="vf-shade" />
        <div className="brackets"><i /><i /><i /><i /></div>
        <div className="vf-hint">{rec ? <span className="recdot">REC 0:0{secs}</span> : "Point at the problem"}</div>
      </div>
      {flash && <div className="flash" />}

      <div className="cap-top">
        <button className="glassbtn" onClick={onClose} aria-label="Close"><X size={22} /></button>
        <span className="safe-pill">Only if it's safe to stop</span>
        <button className="glassbtn" aria-label="Flash"><Zap size={20} /></button>
      </div>

      <div className="cap-bottom">
        <div className="modes">
          {(["video", "photo"] as Mode[]).map((m) => (
            <button key={m} className={m === mode ? "on" : ""} onClick={() => { setRec(false); setMode(m); }}>{m.toUpperCase()}</button>
          ))}
        </div>
        <div className="shutter-row">
          <div className="gallery-thumb"><img src="/img/pothole.jpg" alt="Gallery" /></div>
          <button className={"shutter" + (mode === "video" ? " video" : "") + (rec ? " rec" : "")} onClick={shoot} aria-label="Capture"><span /></button>
          <button className="glassbtn lg" aria-label="Flip camera"><RefreshCw size={22} /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Confirm (one page, smart defaults) ---------------- */
type Att = { type: "photo" | "video" | "voice"; src?: string; dur?: string };
const EXTRA: Att[] = [
  { type: "video", src: "/img/water.jpg", dur: "0:09" },
  { type: "photo", src: "/img/pothole.jpg" },
  { type: "video", src: "/img/water.jpg", dur: "0:06" },
];
const VOICE_TEXT = "Water has been flowing since morning and the footpath is under water.";

export function Confirm({ mode, lang, onBack, onSend }: { mode: Mode; lang: Lang; onBack: () => void; onSend: (cat: Category, media: Att[], note: string) => void }) {
  const [scanning, setScanning] = useState(true);
  const [cat, setCat] = useState<Category>("water");
  const [picker, setPicker] = useState(false);
  const [adder, setAdder] = useState(false);
  const [media, setMedia] = useState<Att[]>([mode === "video" ? { type: "video", src: "/img/water.jpg", dur: "0:04" } : { type: "photo", src: "/img/water.jpg" }]);
  const [note, setNote] = useState("");
  const [rec, setRec] = useState<"idle" | "rec" | "done">("idle");
  const [vs, setVs] = useState(0);
  useEffect(() => { const t = setTimeout(() => setScanning(false), 1500); return () => clearTimeout(t); }, []);
  useEffect(() => { if (rec !== "rec") return; const i = setInterval(() => setVs((x) => x + 1), 1000); return () => clearInterval(i); }, [rec]);
  const add = (type: "photo" | "video") => {
    const pool = EXTRA.filter((x) => x.type === type);
    const next = pool[media.filter((m) => m.type === type).length % pool.length] ?? EXTRA[0];
    setMedia((m) => [...m, { ...next }]); setAdder(false);
  };
  const micDown = () => { setVs(0); setRec("rec"); };
  const micUp = () => { if (rec !== "rec") return; setRec("done"); setNote((n) => (n ? n + " " : "") + VOICE_TEXT); };
  const visual = media.filter((m) => m.type !== "voice");

  return (
    <div className="screen confirm">
      <div className="confirm-media">
        <img src="/img/water.jpg" alt="Your photo" />
        <StatusBar dark />
        <div className="media-top">
          <button className="glassbtn" onClick={onBack} aria-label="Retake"><X size={20} /></button>
          {mode === "video" && <span className="safe-pill"><Play size={12} fill="#fff" /> 0:04 video</span>}
          <span />
        </div>
        {scanning && (
          <div className="scan"><div className="scanline" /><span className="scan-label"><Sparkles size={14} /> Looking at your photo…</span></div>
        )}
      </div>

      <div className="confirm-sheet">
        <div className="cs-scroll">
          <h2 className="cs-title">{scanning ? "Almost there" : "Check and send"}</h2>
          <p className="cs-sub">We filled this in for you. Change anything that looks wrong.</p>

          <div className="dsec">
            <button className="drow" onClick={() => setPicker(true)} disabled={scanning}>
              <span className="field-ic"><CatBadge cat={cat} size={36} accent={!scanning} /></span>
              <span className="field-main">
                <span className="field-label">What is it?</span>
                <span className={"field-val" + (scanning ? " skel" : "")}>{scanning ? "\u00a0" : (lang === "kn" ? CATEGORIES[cat].kn : CATEGORIES[cat].label)}{!scanning && cat === "water" && <span className="ai-tag"><Sparkles size={10} /> Auto-detected</span>}</span>
              </span>
              <span className="drow-act">Change</span>
            </button>
            <div className="drow">
              <span className="field-ic"><span className="catbadge" style={{ width: 36, height: 36 }}><MapPin size={18} /></span></span>
              <span className="field-main">
                <span className="field-label">Where</span>
                <span className="field-val">80 Feet Rd, Sony World Jn.</span>
                <span className="field-hint">Koramangala · Ward 151 · South City Corp.</span>
              </span>
              <span className="drow-act">Edit</span>
            </div>
          </div>

          <div className="dsec">
            <div className="dsec-head"><b>Photos and videos</b><span>{visual.length} added</span></div>
            <div className="attach-row">
              {visual.map((m, i) => (
                <span key={i} className={"att" + (m.type === "video" ? " vid" : "")}>
                  <img src={m.src} alt="" />
                  {m.type === "video" && <><span className="att-play"><Play size={10} fill="currentColor" /></span><em>{m.dur}</em></>}
                  {i > 0 && <button className="att-x" onClick={() => setMedia((all) => all.filter((x) => x !== m))} aria-label="Remove"><X size={11} /></button>}
                </span>
              ))}
              <button className="att-add" onClick={() => setAdder(true)} aria-label="Add a photo or video"><Plus size={22} /></button>
            </div>
          </div>

          <div className="dsec">
            <div className="dsec-head"><b>Additional details</b><span>Optional</span></div>
            <div className={"notebox" + (rec === "rec" ? " rec" : "")}>
              {rec === "rec" ? (
                <div className="nb-rec"><span className="recdot" /> <span className="wave mini live">{Array.from({ length: 22 }).map((_, i) => <span key={i} style={{ animationDelay: `${(i % 6) * 0.1}s` }} />)}</span><span className="nb-rect">0:0{Math.min(vs, 9)} · release to stop</span></div>
              ) : (
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Write it here, or hold the mic and say it. Any language." />
              )}
              <div className="nb-foot">
                <button className={"nb-mic" + (rec === "rec" ? " on" : "")} onPointerDown={micDown} onPointerUp={micUp} onPointerLeave={micUp} aria-label="Hold to speak"><Mic size={18} /></button>
              </div>
            </div>
          </div>

          <p className="privacy"><Lock size={13} /> Your name stays private. Faces and number plates are blurred on the public map.</p>
        </div>
        <div className="cs-footer">
          <button className="primary" disabled={scanning} onClick={() => onSend(cat, rec === "done" ? [...media, { type: "voice", dur: "0:0" + Math.max(3, Math.min(vs, 9)) }] : media, note.trim())}>
            {lang === "kn" ? "GBA ಗೆ ಕಳುಹಿಸಿ" : "Send to GBA"}
          </button>
        </div>
      </div>

      {adder && (
        <div className="modal-scrim" onClick={() => setAdder(false)}>
          <div className="picker" onClick={(e) => e.stopPropagation()}>
            <span className="grabber" />
            <h3>Add a photo or video</h3>
            <div className="addopts">
              <button onClick={() => add("video")}><span><Video size={20} /></span>Record a video</button>
              <button onClick={() => add("photo")}><span><Camera size={20} /></span>Take another photo</button>
              <button onClick={() => add("photo")}><span><ImageIcon size={20} /></span>Choose from gallery</button>
            </div>
          </div>
        </div>
      )}

      {picker && (
        <div className="modal-scrim" onClick={() => setPicker(false)}>
          <div className="picker" onClick={(e) => e.stopPropagation()}>
            <span className="grabber" />
            <h3>What did you see?</h3>
            <div className="catgrid">
              {(Object.keys(CATEGORIES) as Category[]).map((c) => (
                <button key={c} className={"catcell" + (c === cat ? " on" : "")} onClick={() => { setCat(c); setPicker(false); }}>
                  <span className="catcell-ic"><CatIcon cat={c} size={22} /></span>
                  <span>{lang === "kn" ? CATEGORIES[c].kn : CATEGORIES[c].label}</span>
                  {c === cat && <Check size={16} className="cc-check" strokeWidth={2.6} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Sending (trust loader) ---------------- */
export function Sending({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const done = useRef(onDone); done.current = onDone;
  useEffect(() => {
    const ts = [setTimeout(() => setStep(1), 650), setTimeout(() => setStep(2), 1300), setTimeout(() => setStep(3), 1950), setTimeout(() => done.current(), 2700)];
    return () => ts.forEach(clearTimeout);
  }, []);
  const steps = ["Photo and exact location attached", "Delivered to GBA Ward 151 office", "Formal letter emailed to the Asst. Engineer"];
  return (
    <div className="screen sending">
      <StatusBar dark />
      <div className="send-center">
        <div className="send-logo"><img src="/img/logo.png" alt="Nodi" /><span className="ring" /><span className="ring r2" /></div>
        <div className="overline">NODI-24611</div>
        <h2>Sending your complaint</h2>
        <div className="send-progress"><span style={{ width: `${Math.min(100, (step / 3) * 100)}%` }} /></div>
        <ul className="send-steps">
          {steps.map((s, i) => (
            <li key={s} className={i < step ? "done" : i === step ? "now" : ""}>
              <span className="sdot">{i < step ? <Check size={14} strokeWidth={3.4} /> : <i />}</span>{s}
            </li>
          ))}
        </ul>
      </div>
      <div className="send-trust">
        <div className="trust-label">Powered by</div>
        <div className="trust-logos">
          <span className="tl"><NyMark size={20} /> Namma Yatri</span>
          <span className="tl-sep" />
          <span className="tl"><GbaSeal size={26} /> Greater Bengaluru Authority</span>
        </div>
        <div className="trust-fine">Open-source · No ads · Your data is never sold</div>
      </div>
    </div>
  );
}

/* ---------------- Success ---------------- */
export function Success({ report, onTrack, onDone, onLetter }: { report: Report; onTrack: () => void; onDone: () => void; onLetter: () => void }) {
  return (
    <div className="screen success">
      <StatusBar />
      <div className="succ-body">
        <div className="succ-check"><span className="ring" /><Check size={40} strokeWidth={2.6} /></div>
        <div className="overline">Complaint sent</div>
        <h1>GBA has it.</h1>
        <p className="succ-sub">GBA aims to fix water leaks within <b>1 day</b>, so expect it by <b>{report.expected}</b>.</p>
        <div className="ticket">
          <div className="ticket-row"><span>Complaint no.</span><b className="mono">{report.id}</b></div>
          <div className="ticket-row"><span>Sent to</span><b>Asst. Engineer, Ward 151</b></div>
          <div className="ticket-row"><span>Photos and videos</span><b>Attached to the letter</b></div>
        </div>
        <button className="lettercard" onClick={onLetter}>
          <span className="lc-ic"><FileText size={20} strokeWidth={1.9} /></span>
          <span className="lc-main"><b>Formal letter sent</b><span>Signed copy, with your photo and location</span></span>
          <ChevronRight size={18} />
        </button>
        <div className="wa-row"><MessageCircle size={16} strokeWidth={2} /> Updates on WhatsApp · +91 98xxx x4521</div>
      </div>
      <div className="succ-foot">
        <button className="primary" onClick={onTrack}>Track my complaint</button>
        <button className="textbtn" onClick={onDone}>Done</button>
      </div>
    </div>
  );
}

/* ---------------- Formal letter ---------------- */
export function Letter({ report, onClose }: { report: Report; onClose: () => void }) {
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="lettersheet" onClick={(e) => e.stopPropagation()}>
        <div className="ls-head"><span className="grabber" /><div className="ls-bar"><b>Formal letter</b><button className="textbtn sm" onClick={onClose}>Done</button></div></div>
        <div className="paper">
          <div className="paper-top"><GbaSeal size={34} /><div><b>Complaint regarding public utility</b><span>Ref: GBA/W151/2026/{report.id.slice(-4)} · 27 Sep 2026</span></div></div>
          <p><b>To,</b><br />The Assistant Engineer,<br />Ward 151 (Koramangala), Bengaluru South City Corporation,<br />Greater Bengaluru Authority.</p>
          <p><b>Subject:</b> {CATEGORIES[report.cat].label} at {report.place}</p>
          <p>Respected Sir/Madam,</p>
          <p>I wish to bring to your notice a {CATEGORIES[report.cat].label.toLowerCase()} at the above location, reported today at 9:38 AM. Geo-tagged photographs and videos of the issue are attached.</p>
          <p>As per the ward's service standard, this is expected to be resolved within {CATEGORIES[report.cat].sla} day(s). I request you to kindly take action and update the status on the Sahaaya portal.</p>
          <div className="paper-photo"><img src={report.photo} alt="" /><span>12.9349° N, 77.6232° E · 27 Sep 2026, 9:38 AM</span></div>
          <p>Yours sincerely,<br /><b>Ramesh K.</b> (resident, Ward 151)<br />Sent through the Nodi app</p>
        </div>
      </div>
    </div>
  );
}
