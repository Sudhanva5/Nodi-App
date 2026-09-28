"use client";
import { Camera, ChevronRight, Mic, Video, ShieldCheck, Type, MapPin } from "lucide-react";
import { Report, CATEGORIES } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import { CatBadge, StageBar, StatusPill, StatusBar, NyMark } from "./ui";

export default function Home({ reports, lang, big, onToggleBig, onToggleLang, onReport, onOpen }: {
  reports: Report[]; lang: Lang; big: boolean;
  onToggleBig: () => void; onToggleLang: () => void;
  onReport: (mode?: "photo" | "video" | "voice") => void; onOpen: (id: string) => void;
}) {
  const t = tr(lang);
  const needsCheck = reports.filter((r) => r.stage === 3 && !r.reopened);
  const others = reports.filter((r) => !(r.stage === 3 && !r.reopened));
  return (
    <div className="screen home">
      <StatusBar />
      <div className="scroll">
        <header className="home-head">
          <div className="brandrow">
            <img src="/img/logo.png" alt="" className="applogo" />
            <div>
              <div className="eyebrow"><MapPin size={12} strokeWidth={2.6} /> Koramangala · Ward 151</div>
              <h1 className="largetitle">{t("Namaskara")}, Ramesh</h1>
            </div>
          </div>
          <div className="headbtns">
            <button className={"roundbtn" + (big ? " on" : "")} onClick={onToggleBig} aria-label="Bigger text"><Type size={18} strokeWidth={2.4} /></button>
            <button className={"roundbtn lang" + (lang === "kn" ? " on" : "")} onClick={onToggleLang} aria-label="Switch language">{lang === "kn" ? "EN" : "ಕ"}</button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-q">{t("See a problem on the road?")}</div>
          <button className="bigcta" onClick={() => onReport("photo")}>
            <span className="bigcta-ic"><Camera size={26} strokeWidth={2.4} /></span>
            <span>{t("Report a problem")}</span>
          </button>
          <div className="hero-alt">
            <button onClick={() => onReport("voice")}><Mic size={17} strokeWidth={2.4} /> {lang === "kn" ? "ಮಾತನಾಡಿ" : "Just speak"}</button>
            <button onClick={() => onReport("video")}><Video size={17} strokeWidth={2.4} /> {lang === "kn" ? "ವಿಡಿಯೋ" : "Video"}</button>
          </div>
          <p className="hero-sub">{t("Photo, video or just speak. Takes 20 seconds.")}</p>
        </section>

        {needsCheck.length > 0 && (
          <section>
            <h2 className="sectitle"><span className="dot pulse" />{t("Needs your check")}</h2>
            {needsCheck.map((r) => (
              <button key={r.id} className="checkcard" onClick={() => onOpen(r.id)}>
                <div className="checkcard-imgs">
                  <img src={r.photo} alt="Before" />
                  <img src={r.after} alt="After" />
                  <span className="ba b">{t("Before")}</span><span className="ba a">{t("After")}</span>
                </div>
                <div className="checkcard-body">
                  <div className="cc-title">{r.title}</div>
                  <div className="cc-sub">{t("GBA says it's done. Is it?")}</div>
                  <span className="cc-btn">{t("Check now")} <ChevronRight size={16} strokeWidth={2.6} /></span>
                </div>
              </button>
            ))}
          </section>
        )}

        <section>
          <h2 className="sectitle">{t("My reports")} <span className="count">{others.length}</span></h2>
          <div className="group">
            {others.map((r) => (
              <button key={r.id} className="rrow" onClick={() => onOpen(r.id)}>
                <div className="rthumb"><img src={r.photo} alt="" /><span className="rthumb-cat"><CatBadge cat={r.cat} size={24} /></span></div>
                <div className="rmain">
                  <div className="rtop"><span className="rtitle">{r.title}</span></div>
                  <div className="rplace">{r.place}</div>
                  <StageBar stage={r.stage} reopened={r.reopened} compact />
                  <div className="rmeta">
                    <StatusPill stage={r.stage} reopened={r.reopened} lang={lang} />
                    <span className="rexp">{r.stage === 4 ? (lang === "kn" ? "ಮುಗಿದಿದೆ" : "Closed by you") : `${t("Expected by")} ${r.expected}`}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="chev" />
              </button>
            ))}
          </div>
        </section>

        <div className="trustnote">
          <ShieldCheck size={18} strokeWidth={2.3} />
          <span>{t("Every report goes as a formal letter to your ward office.")}</span>
        </div>
        <div className="poweredby"><NyMark size={12} /> A Namma Yatri initiative · Open & free forever</div>
        <div style={{ height: 110 }} />
      </div>
    </div>
  );
}

export const catLabel = (c: keyof typeof CATEGORIES, lang: Lang) => (lang === "kn" ? CATEGORIES[c].kn : CATEGORIES[c].label);
