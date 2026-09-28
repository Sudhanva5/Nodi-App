"use client";
import { Camera, ChevronRight, Mic, Video, ShieldCheck, Type } from "lucide-react";
import { Report, CATEGORIES } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import { CatBadge, StageBar, StatusDot, StatusBar, NyMark } from "./ui";

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
          <div>
            <div className="overline">Koramangala · Ward 151</div>
            <h1 className="display">{t("Namaskara")}, Ramesh</h1>
          </div>
          <div className="headbtns">
            <button className={"iconbtn" + (big ? " on" : "")} onClick={onToggleBig} aria-label="Bigger text"><Type size={17} strokeWidth={2} /></button>
            <button className={"iconbtn lang" + (lang === "kn" ? " on" : "")} onClick={onToggleLang} aria-label="Switch language">{lang === "kn" ? "EN" : "ಕ"}</button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-glow" />
          <h2 className="hero-q">{t("See a problem on the road?")}</h2>
          <p className="hero-sub">{t("Photo, video or just speak. Takes 20 seconds.")}</p>
          <button className="primary hero-cta" onClick={() => onReport("photo")}>
            <Camera size={20} strokeWidth={2.2} /> {t("Report a problem")}
          </button>
          <div className="hero-alt">
            <button onClick={() => onReport("voice")}><Mic size={16} strokeWidth={2} /> {lang === "kn" ? "ಮಾತನಾಡಿ" : "Speak instead"}</button>
            <span className="vr" />
            <button onClick={() => onReport("video")}><Video size={16} strokeWidth={2} /> {lang === "kn" ? "ವಿಡಿಯೋ" : "Record video"}</button>
          </div>
        </section>

        <section className="wardstats">
          <div><b>42</b><span>fixed this month</span></div>
          <div><b>72<small>%</small></b><span>on time</span></div>
          <div><b>3.4<small>d</small></b><span>average fix</span></div>
        </section>

        {needsCheck.length > 0 && (
          <section className="block">
            <div className="blockhead"><span className="overline amber"><span className="live-dot" />{t("Needs your check")}</span></div>
            {needsCheck.map((r) => (
              <button key={r.id} className="checkcard" onClick={() => onOpen(r.id)}>
                <div className="checkcard-imgs">
                  <figure><img src={r.photo} alt="Before" /><figcaption>{t("Before")}</figcaption></figure>
                  <figure><img src={r.after} alt="After" /><figcaption>{t("After")}</figcaption></figure>
                </div>
                <div className="checkcard-body">
                  <div>
                    <div className="cc-title">{r.title}</div>
                    <div className="cc-sub">{t("GBA says it's done. Is it?")}</div>
                  </div>
                  <span className="cc-btn">{t("Check now")}</span>
                </div>
              </button>
            ))}
          </section>
        )}

        <section className="block">
          <div className="blockhead"><h2 className="title">{t("My reports")}</h2><span className="count">{others.length}</span></div>
          <div className="list">
            {others.map((r) => (
              <button key={r.id} className="rrow" onClick={() => onOpen(r.id)}>
                <div className="rthumb"><img src={r.photo} alt="" /></div>
                <div className="rmain">
                  <div className="rtitle"><CatBadge cat={r.cat} size={20} /> {r.title}</div>
                  <div className="rstatus">
                    <StatusDot stage={r.stage} reopened={r.reopened} lang={lang} />
                    <span className="rexp">{r.stage === 4 ? (lang === "kn" ? "ನೀವು ಮುಚ್ಚಿದ್ದೀರಿ" : "Closed by you") : `${lang === "kn" ? "ನಿರೀಕ್ಷಿತ" : "Due"} ${r.expected}`}</span>
                  </div>
                  <StageBar stage={r.stage} reopened={r.reopened} compact />
                </div>
                <ChevronRight size={18} strokeWidth={2} className="chev" />
              </button>
            ))}
          </div>
        </section>

        <div className="trustnote">
          <ShieldCheck size={18} strokeWidth={1.8} />
          <span>{t("Every report goes as a formal letter to your ward office.")}</span>
        </div>
        <div className="poweredby"><NyMark size={11} /> A Namma Yatri initiative · Open & free</div>
        <div style={{ height: 118 }} />
      </div>
    </div>
  );
}

export const catLabel = (c: keyof typeof CATEGORIES, lang: Lang) => (lang === "kn" ? CATEGORIES[c].kn : CATEGORIES[c].label);
