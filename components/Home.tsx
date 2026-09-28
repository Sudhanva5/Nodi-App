"use client";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Report, CATEGORIES, Ward } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { CatIcon, StageBar, StatusDot, StatusBar, FlipText } from "./ui";

const FLIP_EN = ["on the road?", "with streetlights?", "with water?", "on footpaths?"];
const HERO_IMGS = ["/img/pothole2.jpg", "/img/streetlight.jpg", "/img/water.jpg", "/img/footpath.jpg"];

/** Splits into graphemes (safe for Kannada) and fades each one in or out with a stagger. */
function Letters({ text, phase }: { text: string; phase: "in" | "out" }) {
  const seg = typeof Intl !== "undefined" && "Segmenter" in Intl
    ? Array.from(new (Intl as unknown as { Segmenter: new (l: string, o: { granularity: string }) => { segment: (s: string) => Iterable<{ segment: string }> } }).Segmenter("kn", { granularity: "grapheme" }).segment(text), (x) => x.segment)
    : Array.from(text);
  return (
    <span className={"letters " + phase} key={text + phase} aria-label={text}>
      {seg.map((ch, i) => <span key={i} aria-hidden style={{ animationDelay: `${i * 22}ms` }}>{ch === " " ? "\u00a0" : ch}</span>)}
    </span>
  );
}
const FLIP_KN = ["ರಸ್ತೆಯಲ್ಲಿ", "ಬೀದಿ ದೀಪದಲ್ಲಿ", "ನೀರಿನಲ್ಲಿ", "ಫುಟ್‌ಪಾತ್‌ನಲ್ಲಿ"];
const IMPACT_EN = ["12,045 streetlights fixed", "8,310 garbage dumps cleared", "21,780 potholes filled", "3,402 water leaks stopped"];
const IMPACT_KN = ["12,045 ಬೀದಿ ದೀಪಗಳು ಸರಿ", "8,310 ಕಸದ ರಾಶಿ ತೆರವು", "21,780 ರಸ್ತೆ ಗುಂಡಿ ಮುಚ್ಚಲಾಗಿದೆ", "3,402 ನೀರು ಸೋರಿಕೆ ನಿಂತಿದೆ"];

export default function Home({ reports, lang, ward, onProfile, onReport, onOpen }: {
  reports: Report[]; lang: Lang; ward: Ward; onProfile: () => void;
  onReport: (mode?: "photo" | "video" | "voice") => void; onOpen: (id: string) => void;
}) {
  const t = tr(lang);
  const kn = lang === "kn";
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  useEffect(() => {
    let alive = true; const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      timers.push(setTimeout(() => { if (!alive) return; setPhase("out");
        timers.push(setTimeout(() => { if (!alive) return; setIdx((i) => (i + 1) % FLIP_EN.length); setPhase("in"); cycle(); }, 520));
      }, 2600));
    };
    cycle();
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);
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

        <button className="vfhero" onClick={() => onReport("photo")} aria-label={t("Report a problem")}>
          {HERO_IMGS.map((src, k) => <img key={src} src={src} alt="" className={"vfh-img" + (k === idx ? " on" : "")} />)}
          <span className="vfh-shade" />
          <span className="vfh-brackets"><i /><i /><i /><i /></span>
          <span className="vfh-live"><i />{kn ? "ಕ್ಯಾಮೆರಾ" : "Camera"}</span>
          <span className="vfh-q">
            {kn ? (<><Letters text={FLIP_KN[idx]} phase={phase} /><br />ಸಮಸ್ಯೆ ಕಾಣಿಸಿತೇ?</>)
                : (<>See a problem<br /><Letters text={FLIP_EN[idx]} phase={phase} /></>)}
          </span>
          <span className="vfh-bottom">
            <span className="vfh-shutter"><span /></span>
            <span className="vfh-cta">{kn ? "ಫೋಟೋ ತೆಗೆದು GBA ಗೆ ಕಳುಹಿಸಿ" : "Tap to snap it. We'll take it to GBA."}</span>
          </span>
        </button>

        {needsCheck.length > 0 && (
          <section className="block">
            <div className="blockhead"><h2 className="title"><span className="pulse-dot" />{t("Check if it's fixed")}</h2></div>
            <div className="stack">
              {needsCheck.map((r) => (
                <button key={r.id} className="checkcard" onClick={() => onOpen(r.id)}>
                  <div className="checkcard-imgs">
                    <figure><img src={r.photo} alt="Before" /><figcaption>{t("Before")}</figcaption></figure>
                    <figure><img src={r.after} alt="After" /><figcaption>{t("After")}</figcaption></figure>
                  </div>
                  <div className="checkcard-body">
                    <div className="cc-text">
                      <div className="cc-title">{r.title}</div>
                      <div className="cc-sub">{t("GBA says the work is done.")}</div>
                    </div>
                    <span className="cc-cta">{t("Take a look")}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="block">
          <div className="blockhead">
            <h2 className="title">{t("My reports")} <span className="count">{others.length}</span></h2>
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

        <p className="trustline"><ShieldCheck size={12} /> {t("Every report reaches your ward office as a formal letter.")}</p>

        <footer className="manifesto">
          <h2 className="mf-big">{kn ? <>ಬೆಂಗಳೂರನ್ನು<br />ಮತ್ತೆ<br />ಅದ್ಭುತಗೊಳಿಸೋಣ.</> : <>Let&apos;s make<br />Bengaluru<br />great again.</>}</h2>
          <p className="mf-sub">{kn ? "2026 ರಲ್ಲಿ ಆರಂಭವಾದಾಗಿನಿಂದ, " : "Since launch in 2026, "}<FlipText items={kn ? IMPACT_KN : IMPACT_EN} interval={2600} className="mf-flip" /></p>
        </footer>
        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}
