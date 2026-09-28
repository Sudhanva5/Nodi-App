"use client";
import { useState } from "react";
import { Camera, ChevronRight, ChevronLeft, Check, ArrowUpRight, Type, Languages, Volume2, Sparkles, MessageCircle, MapPin, Search } from "lucide-react";
import { Ward, WARDS } from "@/lib/data";
import { Lang } from "@/lib/i18n";

export type Prefs = { big: boolean; lang: Lang; readAloud: boolean; calm: boolean; whatsapp: boolean };

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} className={"switch" + (on ? " on" : "")} onClick={() => onChange(!on)}>
      <span />
    </button>
  );
}

export default function Profile({ ward, onWard, prefs, setPrefs, onClose }: {
  ward: Ward; onWard: (w: Ward) => void; prefs: Prefs; setPrefs: (p: Prefs) => void; onClose: () => void;
}) {
  const [view, setView] = useState<"main" | "ward">("main");
  const [q, setQ] = useState("");
  const kn = prefs.lang === "kn";
  const set = (k: keyof Prefs, v: Prefs[keyof Prefs]) => setPrefs({ ...prefs, [k]: v });

  return (
    <div className="modal-scrim profile-scrim" onClick={onClose}>
      <div className="profile" onClick={(e) => e.stopPropagation()}>
        <div className="pf-bar">
          {view === "ward" ? (
            <button className="pf-back" onClick={() => setView("main")}><ChevronLeft size={20} /> {kn ? "ಹಿಂದೆ" : "Back"}</button>
          ) : <span className="grabber" />}
          <b className="pf-bartitle">{view === "ward" ? (kn ? "ನಿಮ್ಮ ವಾರ್ಡ್" : "Your ward") : ""}</b>
          <button className="pf-done" onClick={onClose}>{kn ? "ಮುಗಿದಿದೆ" : "Done"}</button>
        </div>

        {view === "main" ? (
          <div className="pf-scroll">
            <div className="pf-id">
              <div className="pf-photo">
                <img src="/img/ramesh.jpg" alt="Ramesh K." />
                <button className="pf-edit" aria-label="Change photo"><Camera size={14} /></button>
              </div>
              <h2>Ramesh K.</h2>
              <p>+91 98xxx x4521</p>
              <div className="pf-stats">
                <div><b>12</b><span>{kn ? "ನೀವು ದೂರಿತ್ತದ್ದು" : "Reported"}</span></div>
                <div><b>9</b><span>{kn ? "ಸರಿಯಾದದ್ದು" : "Fixed"}</span></div>
                <div><b>41</b><span>{kn ? "ಬೆಂಬಲಿಸಿದ್ದು" : "Supported"}</span></div>
              </div>
            </div>

            <div className="pf-label">{kn ? "ವಾರ್ಡ್" : "Ward"}</div>
            <div className="pf-group">
              <button className="pf-row" onClick={() => setView("ward")}>
                <span className="pf-ic"><MapPin size={17} /></span>
                <span className="pf-main"><b>{kn ? ward.kn : ward.name}{ward.id === "151" ? " · Ward 151" : ""}</b><span>{ward.corp}</span></span>
                <span className="pf-val">{kn ? "ಬದಲಿಸಿ" : "Change"}</span><ChevronRight size={16} className="pf-chev" />
              </button>
              <a className="pf-row" href="https://bbmp.gov.in" target="_blank" rel="noreferrer">
                <span className="pf-ic sahaaya">S</span>
                <span className="pf-main"><b>{kn ? "ಸಹಾಯ ಆ್ಯಪ್‌ನಲ್ಲಿ ವಾರ್ಡ್ ವಿವರ" : "Ward details on Sahaaya"}</b><span>{kn ? "ಅಧಿಕಾರಿಗಳು, ಸಹಾಯವಾಣಿ, ತೆರೆದ ದೂರುಗಳು" : `Officers, helplines, ${ward.open} open complaints`}</span></span>
                <ArrowUpRight size={16} className="pf-chev" />
              </a>
            </div>

            <div className="pf-label">{kn ? "ಸುಲಭ ಬಳಕೆ" : "Accessibility"}</div>
            <div className="pf-group">
              <div className="pf-row">
                <span className="pf-ic"><Languages size={17} /></span>
                <span className="pf-main"><b>{kn ? "ಭಾಷೆ" : "Language"}</b></span>
                <div className="pf-seg">
                  <button className={!kn ? "on" : ""} onClick={() => set("lang", "en")}>English</button>
                  <button className={kn ? "on" : ""} onClick={() => set("lang", "kn")}>ಕನ್ನಡ</button>
                </div>
              </div>
              <div className="pf-row">
                <span className="pf-ic"><Type size={17} /></span>
                <span className="pf-main"><b>{kn ? "ದೊಡ್ಡ ಅಕ್ಷರ" : "Bigger text"}</b><span>{kn ? "ಎಲ್ಲಾ ಪರದೆಗಳಲ್ಲಿ" : "Easier to read on every screen"}</span></span>
                <Toggle on={prefs.big} onChange={(v) => set("big", v)} label="Bigger text" />
              </div>
              <div className="pf-row">
                <span className="pf-ic"><Volume2 size={17} /></span>
                <span className="pf-main"><b>{kn ? "ಅಪ್‌ಡೇಟ್ ಓದಿ ಹೇಳಿ" : "Read updates aloud"}</b><span>{kn ? "ದೂರು ತೆರೆದಾಗ" : "When you open a complaint"}</span></span>
                <Toggle on={prefs.readAloud} onChange={(v) => set("readAloud", v)} label="Read updates aloud" />
              </div>
              <div className="pf-row">
                <span className="pf-ic"><Sparkles size={17} /></span>
                <span className="pf-main"><b>{kn ? "ಕಡಿಮೆ ಚಲನೆ" : "Reduce motion"}</b><span>{kn ? "ಅನಿಮೇಶನ್ ನಿಲ್ಲಿಸಿ" : "Turns off animations"}</span></span>
                <Toggle on={prefs.calm} onChange={(v) => set("calm", v)} label="Reduce motion" />
              </div>
            </div>

            <div className="pf-label">{kn ? "ಅಪ್‌ಡೇಟ್‌ಗಳು" : "Updates"}</div>
            <div className="pf-group">
              <div className="pf-row">
                <span className="pf-ic"><MessageCircle size={17} /></span>
                <span className="pf-main"><b>{kn ? "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ" : "Updates on WhatsApp"}</b><span>+91 98xxx x4521</span></span>
                <Toggle on={prefs.whatsapp} onChange={(v) => set("whatsapp", v)} label="WhatsApp updates" />
              </div>
            </div>
            <p className="pf-foot">Nodi v1.0 · {kn ? "ಮುಕ್ತ ಮೂಲ, ಜಾಹೀರಾತು ಇಲ್ಲ" : "Open source, no ads, your data is never sold"}</p>
          </div>
        ) : (
          <div className="pf-scroll">
            <div className="pf-search"><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={kn ? "ವಾರ್ಡ್ ಹುಡುಕಿ" : "Search ward or area"} /></div>
            <button className="pf-locate" onClick={() => { onWard(WARDS[0]); setView("main"); }}><MapPin size={16} /> {kn ? "ನನ್ನ ಸ್ಥಳ ಬಳಸಿ" : "Use my current location"}</button>
            <div className="pf-group">
              {WARDS.filter((w) => (w.name + w.kn).toLowerCase().includes(q.toLowerCase())).map((w) => (
                <button key={w.id} className="pf-row" onClick={() => { onWard(w); setView("main"); }}>
                  <span className="pf-main"><b>{kn ? w.kn : w.name}</b><span>{w.corp}</span></span>
                  {w.id === ward.id && <Check size={18} className="pf-check" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
