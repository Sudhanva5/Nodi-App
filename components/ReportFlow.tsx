"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Zap, RefreshCw, Mic, MapPin, Users, Sparkles, ChevronRight, Check, FileText, MessageCircle, Plus, Lock, Play, Pause, Trash2 } from "lucide-react";
import { Category, CATEGORIES, Report } from "@/lib/data";
import { Lang } from "@/lib/i18n";
import { CatBadge, CatIcon, StatusBar, NyMark, GbaSeal } from "./ui";

type Mode = "photo" | "video" | "voice";

/* ---------------- Capture ---------------- */
export function Capture({ initialMode, onClose, onCaptured }: { initialMode: Mode; onClose: () => void; onCaptured: (m: Mode) => void }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [flash, setFlash] = useState(false);
  const [rec, setRec] = useState(false);
  const [secs, setSecs] = useState(0);
  useEffect(() => { if (!rec) return; const i = setInterval(() => setSecs((s) => s + 1), 1000); return () => clearInterval(i); }, [rec]);
  useEffect(() => { if (rec && mode === "video" && secs >= 4) { setRec(false); onCaptured("video"); } }, [secs, rec, mode, onCaptured]);

  const shoot = () => {
    if (mode === "photo") { setFlash(true); setTimeout(() => onCaptured("photo"), 380); }
    if (mode === "video") { if (!rec) { setSecs(0); setRec(true); } else { setRec(false); onCaptured("video"); } }
  };
  const voiceDown = () => { setSecs(0); setRec(true); };
  const voiceUp = () => { if (!rec) return; setRec(false); onCaptured("voice"); };

  return (
    <div className="screen capture">
      <StatusBar dark />
      {mode !== "voice" ? (
        <div className="viewfinder">
          <img src="/img/water.jpg" alt="" className="vf-img" />
          <div className="vf-shade" />
          <div className="brackets"><i /><i /><i /><i /></div>
          <div className="vf-hint">{rec ? <span className="recdot">REC 0:0{secs}</span> : "Point at the problem"}</div>
        </div>
      ) : (
        <div className="voicestage">
          <div className={"voiceorb" + (rec ? " live" : "")}><Mic size={54} strokeWidth={2.2} /></div>
          <div className="voice-title">{rec ? "Listening…" : "Hold the button and tell us what's wrong"}</div>
          <div className="voice-sub">{rec ? `0:0${Math.min(secs, 9)} · release to finish` : "Kannada, English, Hindi or Tamil. We'll find your location."}</div>
          {rec && <div className="wave big">{Array.from({ length: 28 }).map((_, i) => <span key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />)}</div>}
        </div>
      )}
      {flash && <div className="flash" />}

      <div className="cap-top">
        <button className="glassbtn" onClick={onClose} aria-label="Close"><X size={22} strokeWidth={2.5} /></button>
        <span className="safe-pill">Only if it's safe to stop</span>
        <button className="glassbtn" aria-label="Flash"><Zap size={20} strokeWidth={2.4} /></button>
      </div>

      <div className="cap-bottom">
        <div className="modes">
          {(["video", "photo", "voice"] as Mode[]).map((m) => (
            <button key={m} className={m === mode ? "on" : ""} onClick={() => { setRec(false); setMode(m); }}>{m.toUpperCase()}</button>
          ))}
        </div>
        <div className="shutter-row">
          <div className="gallery-thumb"><img src="/img/pothole.jpg" alt="Gallery" /></div>
          {mode === "voice" ? (
            <button className={"shutter mic" + (rec ? " rec" : "")} onPointerDown={voiceDown} onPointerUp={voiceUp} onPointerLeave={voiceUp} aria-label="Hold to speak">
              <Mic size={34} strokeWidth={2.4} />
            </button>
          ) : (
            <button className={"shutter" + (mode === "video" ? " video" : "") + (rec ? " rec" : "")} onClick={shoot} aria-label="Capture"><span /></button>
          )}
          <button className="glassbtn lg" aria-label="Flip camera"><RefreshCw size={22} strokeWidth={2.3} /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Confirm (one sheet, smart defaults) ---------------- */
export function Confirm({ mode, lang, onBack, onSend }: { mode: Mode; lang: Lang; onBack: () => void; onSend: (cat: Category, voice: boolean) => void }) {
  const [scanning, setScanning] = useState(true);
  const [cat, setCat] = useState<Category>("water");
  const [picker, setPicker] = useState(false);
  const [vstate, setVstate] = useState<"idle" | "rec" | "done">(mode === "voice" ? "done" : "idle");
  const [vsecs, setVsecs] = useState(mode === "voice" ? 8 : 0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { const t = setTimeout(() => setScanning(false), 1500); return () => clearTimeout(t); }, []);
  useEffect(() => { if (vstate !== "rec") return; const i = setInterval(() => setVsecs((s) => s + 1), 1000); return () => clearInterval(i); }, [vstate]);
  useEffect(() => { if (!playing) return; const t = setTimeout(() => setPlaying(false), 2500); return () => clearTimeout(t); }, [playing]);

  const down = () => { setVsecs(0); setVstate("rec"); };
  const up = () => { if (vstate === "rec") setVstate("done"); };

  return (
    <div className="screen confirm">
      <div className="confirm-media">
        {mode === "voice" ? (
          <div className="voicehero"><div className="wave still">{Array.from({ length: 36 }).map((_, i) => <span key={i} style={{ height: 8 + ((i * 37) % 30) }} />)}</div></div>
        ) : (
          <img src="/img/water.jpg" alt="Your photo" />
        )}
        <StatusBar dark />
        <div className="media-top">
          <button className="glassbtn" onClick={onBack} aria-label="Retake"><X size={20} strokeWidth={2.5} /></button>
          {mode === "video" && <span className="safe-pill"><Play size={12} fill="#fff" /> 0:04 video</span>}
          <button className="glassbtn addmedia" aria-label="Add another"><Plus size={20} strokeWidth={2.5} /></button>
        </div>
        {scanning && (
          <div className="scan"><div className="scanline" /><span className="scan-label"><Sparkles size={14} /> {mode === "voice" ? "Understanding what you said…" : "Looking at your photo…"}</span></div>
        )}
      </div>

      <div className="confirm-sheet">
        <div className="cs-scroll">
          <h2 className="cs-title">{scanning ? "Almost there" : "Check and send"}</h2>
          <p className="cs-sub">We filled this in for you. Change anything that looks wrong.</p>

          <div className="group tight">
            <button className="field" onClick={() => setPicker(true)} disabled={scanning}>
              <span className="field-ic"><CatBadge cat={cat} size={40} accent={!scanning} /></span>
              <span className="field-main">
                <span className="field-label">What is it</span>
                <span className={"field-val" + (scanning ? " skel" : "")}>{scanning ? "\u00a0" : (lang === "kn" ? CATEGORIES[cat].kn : CATEGORIES[cat].label)}{!scanning && cat === "water" && <span className="ai-tag"><Sparkles size={10} /> Auto-detected</span>}</span>
              </span>
              <span className="field-act">Change</span>
            </button>
            <div className="field">
              <span className="field-ic"><span className="catbadge" style={{ width: 40, height: 40 }}><MapPin size={20} strokeWidth={1.9} /></span></span>
              <span className="field-main">
                <span className="field-label">Where · GPS ±5 m</span>
                <span className="field-val">80 Feet Rd, Sony World Jn.</span>
                <span className="field-hint">Koramangala · Ward 151 · South City Corp.</span>
              </span>
              <span className="field-act">Edit</span>
            </div>
          </div>

          {!scanning && (
            <div className="dupe">
              <div className="avatars"><i>A</i><i>S</i><i>K</i></div>
              <div><b>3 neighbours reported this today.</b> We'll add you to the same complaint so it moves up faster.</div>
            </div>
          )}

          <div className="voicebox">
            {vstate === "done" ? (
              <div className="vnote">
                <button className="vplay" onClick={() => setPlaying((p) => !p)} aria-label="Play voice note">{playing ? <Pause size={18} fill="#111" /> : <Play size={18} fill="#111" />}</button>
                <div className="vnote-main">
                  <div className={"wave mini" + (playing ? " playing" : "")}>{Array.from({ length: 26 }).map((_, i) => <span key={i} style={{ height: 5 + ((i * 53) % 18) }} />)}</div>
                  <div className="vtrans">"ಬೆಳಗ್ಗೆಯಿಂದ ನೀರು ಹರಿಯುತ್ತಿದೆ, ಫುಟ್‌ಪಾತ್ ಮುಳುಗಿದೆ"<span>Water has been flowing since morning, the footpath is under water. · Kannada · 0:0{Math.min(vsecs, 9)}</span></div>
                </div>
                <button className="vdel" onClick={() => { setVstate("idle"); setPlaying(false); }} aria-label="Delete voice note"><Trash2 size={17} /></button>
              </div>
            ) : (
              <button className={"holdspeak" + (vstate === "rec" ? " rec" : "")} onPointerDown={down} onPointerUp={up} onPointerLeave={up}>
                {vstate === "rec" ? (
                  <><span className="recdot" /> <span className="wave mini live">{Array.from({ length: 18 }).map((_, i) => <span key={i} style={{ animationDelay: `${(i % 6) * 0.1}s` }} />)}</span> <span>0:0{Math.min(vsecs, 9)} · release to save</span></>
                ) : (
                  <><Mic size={20} strokeWidth={2.4} /> <span><b>Hold to tell us more</b> <em>Optional · any language</em></span></>
                )}
              </button>
            )}
          </div>

          <p className="privacy"><Lock size={13} /> Your name stays private. Faces and number plates are blurred on the public map.</p>
        </div>
        <div className="cs-footer">
          <button className="primary" disabled={scanning} onClick={() => onSend(cat, vstate === "done")}>
            {lang === "kn" ? "GBA ಗೆ ಕಳುಹಿಸಿ" : "Send to GBA"}
          </button>
        </div>
      </div>

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
        <p className="succ-sub">Water leaks are usually fixed within <b>1 day</b>. Expected by <b>{report.expected}</b>.</p>
        <div className="ticket">
          <div className="ticket-row"><span>Complaint no.</span><b className="mono">{report.id}</b></div>
          <div className="ticket-row"><span>Sent to</span><b>Asst. Engineer, Ward 151</b></div>
          <div className="ticket-row"><span>Neighbours with you</span><b>4 people</b></div>
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
          <p>I wish to bring to your notice a {CATEGORIES[report.cat].label.toLowerCase()} at the above location, reported today at 9:38 AM. 4 residents have raised the same issue. A geo-tagged photograph and a voice description are attached.</p>
          <p>As per the ward's service standard, this is expected to be resolved within {CATEGORIES[report.cat].sla} day(s). I request you to kindly take action and update the status on the Sahaaya portal.</p>
          <div className="paper-photo"><img src={report.photo} alt="" /><span>12.9349° N, 77.6232° E · 27 Sep 2026, 9:38 AM</span></div>
          <p>Yours sincerely,<br /><b>Ramesh K.</b> (resident, Ward 151)<br />via Nodi, a Namma Yatri initiative</p>
        </div>
      </div>
    </div>
  );
}
