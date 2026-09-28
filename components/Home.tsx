"use client";
import { Camera, ChevronRight, ShieldCheck } from "lucide-react";
import { Report, CATEGORIES, Ward } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import { CatIcon, StageBar, StatusDot, StatusBar, FlipText } from "./ui";

const FLIP_EN = ["on the road?", "with streetlights?", "with water?", "on footpaths?"];
const FLIP_KN = ["ರಸ್ತೆಯಲ್ಲಿ", "ಬೀದಿ ದೀಪದಲ್ಲಿ", "ನೀರಿನಲ್ಲಿ", "ಫುಟ್‌ಪಾತ್‌ನಲ್ಲಿ"];
const IMPACT_EN = ["12,045 streetlights fixed", "8,310 garbage dumps cleared", "21,780 potholes filled", "3,402 water leaks stopped"];
const IMPACT_KN = ["12,045 ಬೀದಿ ದೀಪಗಳು ಸರಿ", "8,310 ಕಸದ ರಾಶಿ ತೆರವು", "21,780 ರಸ್ತೆ ಗುಂಡಿ ಮುಚ್ಚಲಾಗಿದೆ", "3,402 ನೀರು ಸೋರಿಕೆ ನಿಂತಿದೆ"];

export default function Home({ reports, lang, ward, onProfile, onReport, onOpen }: {
  reports: Report[]; lang: Lang; ward: Ward; onProfile: () => void;
  onReport: (mode?: "photo" | "video" | "voice") => void; onOpen: (id: string) => void;
}) {
  const t = tr(lang);
  const kn = lang === "kn";
  const needsCheck = reports.filter((r) => r.stage === 3 && !r.reopened);
  const others = reports.filter((r) => !(r.stage === 3 && !r.reopened));
  return (
    <div className="screen home">
      <StatusBar />
      <div className="scroll">
        <header className="home-head">
          <div className="hh-text">
            <div className="overline">{kn ? ward.kn : ward.name}{ward.id === "151" ? " · Ward 151" : ""}</div>
            <h1 className="hh-title">{t("Namaskara")}, Ramesh</h1>
          </div>
          <button className="avatarbtn" onClick={onProfile} aria-label="Profile and settings">
            <img src="/img/ramesh.jpg" alt="" />
          </button>
        </header>

        <section className="hero">
          <div className="hero-glow" />
          <h2 className="hero-q">
            {kn ? (<><FlipText items={FLIP_KN} className="accent" /><br />ಸಮಸ್ಯೆ ಕಾಣಿಸಿತೇ?</>)
                : (<>See a problem<br /><FlipText items={FLIP_EN} className="accent" /></>)}
          </h2>
          <p className="hero-sub">{kn ? "ಫೋಟೋ ಅಥವಾ ವಿಡಿಯೋ ಕಳುಹಿಸಿ, ನಾವು ಸರಿ ಮಾಡಿಸುತ್ತೇವೆ." : "Attach photos or videos, and we'll get them fixed."}</p>
          <button className="primary" onClick={() => onReport("photo")}>
            <Camera size={19} /> {t("Report a problem")}
          </button>
        </section>

        {needsCheck.length > 0 && (
          <section className="block">
            <div className="blockhead"><h2 className="title"><span className="pulse-dot" />{t("Needs your check")}</h2></div>
            <div className="stack">
              {needsCheck.map((r) => (
                <button key={r.id} className="checkcard" onClick={() => onOpen(r.id)}>
                  <div className="checkcard-imgs">
                    <figure><img src={r.photo} alt="Before" /><figcaption>{t("Before")}</figcaption></figure>
                    <figure><img src={r.after} alt="After" /><figcaption>{t("After")}</figcaption></figure>
                  </div>
                  <div className="checkcard-body">
                    <div className="cc-title">{r.title}</div>
                    <div className="cc-sub">{t("GBA says it's done. Is it?")}</div>
                    <span className="btn-secondary">{t("Check now")}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="block">
          <div className="blockhead">
            <h2 className="title">{t("My reports")}</h2>
            <button className="viewall">{kn ? "ಎಲ್ಲಾ ನೋಡಿ" : "View all"} <ChevronRight size={15} /></button>
          </div>
          <div className="stack">
            {others.map((r) => (
              <button key={r.id} className="rcard" onClick={() => onOpen(r.id)}>
                <div className="rcard-photo">
                  <img src={r.photo} alt="" />
                  <span className="photo-ic" aria-label={CATEGORIES[r.cat].label}><CatIcon cat={r.cat} size={13} /></span>
                </div>
                <div className="rcard-body">
                  <div className="rtitle">{r.title}</div>
                  <div className="rplace"><StatusDot stage={r.stage} reopened={r.reopened} lang={lang} /><span>{r.stage === 4 ? (kn ? "ನೀವು ಮುಚ್ಚಿದ್ದೀರಿ" : "Closed by you") : `${kn ? "ನಿರೀಕ್ಷಿತ" : "Due"} ${r.expected}`}</span></div>
                  <StageBar stage={r.stage} reopened={r.reopened} compact />
                </div>
                <ChevronRight size={16} className="rchev" />
              </button>
            ))}
          </div>
        </section>

        <p className="trustline"><ShieldCheck size={12} /> {t("Every report goes as a formal letter to your ward office.")}</p>

        <footer className="manifesto">
          <h2 className="mf-big">{kn ? <>ಬೆಂಗಳೂರನ್ನು<br />ಮತ್ತೆ<br />ಅದ್ಭುತಗೊಳಿಸೋಣ.</> : <>Let&apos;s make<br />Bengaluru<br />great again.</>}</h2>
          <p className="mf-sub">{kn ? "ಆರಂಭದಿಂದ, " : "Since launch, "}<FlipText items={kn ? IMPACT_KN : IMPACT_EN} interval={2600} className="mf-flip" /></p>
        </footer>
        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}
