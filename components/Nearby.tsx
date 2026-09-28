"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Search, ThumbsUp, Clock, TrendingUp, BadgeCheck } from "lucide-react";
import { NEARBY, OFFICIAL_POSTS, Category, CATEGORIES, NearbyIssue } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import { StatusBar, Sheet, CatIcon, StatusPill, Verified } from "./ui";

const NearbyMap = dynamic(() => import("./NearbyMap"), { ssr: false, loading: () => <div className="leaflet-host" /> });

type Filter = "all" | Category;
const FILTERS: { k: Filter; label: string }[] = [
  { k: "all", label: "All" }, { k: "pothole", label: "Potholes" }, { k: "garbage", label: "Garbage" }, { k: "streetlight", label: "Lights" }, { k: "water", label: "Water" },
];

export default function Nearby({ lang, onVerified, extraMeToo }: { lang: Lang; onVerified: () => void; extraMeToo: Record<string, number> }) {
  const t = tr(lang);
  const [filter, setFilter] = useState<Filter>("all");
  const [detent, setDetent] = useState<"low" | "mid" | "high">("mid");
  const [tab, setTab] = useState<"issues" | "official">("issues");
  const [sel, setSel] = useState<string | null>(null);
  const [mine, setMine] = useState<Record<string, boolean>>({});

  const issues = useMemo(() => NEARBY
    .map((i) => ({ ...i, meToo: i.meToo + (extraMeToo[i.id] ?? 0) + (mine[i.id] ? 1 : 0) }))
    .filter((i) => filter === "all" || i.cat === filter), [filter, mine, extraMeToo]);
  const ordered = useMemo(() => sel ? [...issues].sort((a, b) => (a.id === sel ? -1 : b.id === sel ? 1 : 0)) : issues, [issues, sel]);

  return (
    <div className="screen nearby">
      <NearbyMap issues={issues} selected={sel} onSelect={(id) => { setSel(id); setTab("issues"); setDetent("mid"); }} />
      <div className="nb-top">
        <StatusBar dark />
        <div className="nb-search"><Search size={18} strokeWidth={2.5} /><span>Koramangala · Ward 151</span><span className="nb-live"><i />Live</span></div>
        <div className="chips">
          {FILTERS.map((f) => (
            <button key={f.k} className={"chip" + (filter === f.k ? " on" : "")} onClick={() => setFilter(f.k)}>
              {f.k !== "all" && <CatIcon cat={f.k as Category} size={14} />}{f.label}
            </button>
          ))}
        </div>
      </div>

      <Sheet detent={detent} onDetent={setDetent} dark heights={{ low: 170, mid: 400, high: 660 }}>
        <div className="scorecard">
          <div className="sc-cell"><b>72%</b><span>fixed on time</span></div>
          <div className="sc-cell"><b>3.4 days</b><span>average fix</span></div>
          <div className="sc-cell"><b>128</b><span>open now</span></div>
          <div className="sc-trend"><TrendingUp size={14} /> Ward 151 is <b>14 pts</b> better than the city average this month</div>
        </div>
        <div className="segctl">
          <button className={tab === "issues" ? "on" : ""} onClick={() => setTab("issues")}>Near you · {issues.length}</button>
          <button className={tab === "official" ? "on" : ""} onClick={() => setTab("official")}>Official updates</button>
        </div>

        {tab === "issues" ? (
          <div className="nb-list">
            <p className="nb-hint">{lang === "kn" ? "ಇದೇ ಸಮಸ್ಯೆ ನೋಡಿದ್ದೀರಾ? ಬೆಂಬಲ ಒತ್ತಿ, ಅದು ವಾರ್ಡ್ ಪಟ್ಟಿಯಲ್ಲಿ ಮೇಲೆ ಹೋಗುತ್ತದೆ." : "Seen the same problem? Tap Support and it moves up the ward's list."}</p>
            {ordered.map((i) => <IssueRow key={i.id} i={i} lang={lang} sel={i.id === sel} mine={!!mine[i.id]} onSel={() => setSel(i.id)} onMeToo={() => setMine((m) => ({ ...m, [i.id]: !m[i.id] }))} t={t} />)}
          </div>
        ) : (
          <div className="nb-list">
            {OFFICIAL_POSTS.map((p) => (
              <div key={p.id} className="xp-card dark">
                <div className="xp-head">
                  <span className="xp-av"><img src="/img/gba-av.svg" alt="" /></span>
                  <div className="xp-who"><b>{p.name} <Verified size={15} onClick={onVerified} /></b><span>{p.handle} · {p.time}</span></div>
                  <span className="xp-x">𝕏</span>
                </div>
                <p>{p.text}</p>
                {p.photo && <img src={p.photo} alt="" className="xp-img" />}
                <div className="xp-foot"><span><BadgeCheck size={13} /> Linked to {p.matched} complaint{p.matched > 1 ? "s" : ""}. Waiting for the reporter{p.matched > 1 ? "s" : ""} to confirm</span></div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 120 }} />
      </Sheet>
    </div>
  );
}

function IssueRow({ i, lang, sel, mine, onSel, onMeToo, t }: { i: NearbyIssue; lang: Lang; sel: boolean; mine: boolean; onSel: () => void; onMeToo: () => void; t: (s: string) => string }) {
  return (
    <div className={"nbrow" + (sel ? " sel" : "")} onClick={onSel}>
      <div className="nb-thumb"><img src={i.photo} alt="" /><span className="nb-cat"><CatIcon cat={i.cat} size={12} /></span></div>
      <div className="nb-main">
        <div className="nb-title">{i.title}</div>
        <div className="nb-sub">{i.place} · {i.dist}</div>
        <div className="nb-meta"><StatusPill stage={i.stage} lang={lang} /><span><Clock size={12} /> {i.ago}</span></div>
      </div>
      <button className={"metoo" + (mine ? " on" : "")} onClick={(e) => { e.stopPropagation(); onMeToo(); }} aria-pressed={mine}>
        <ThumbsUp size={16} strokeWidth={2} fill={mine ? "currentColor" : "none"} />
        <b>{i.meToo}</b>
        <span>{t("Support")}</span>
      </button>
    </div>
  );
}
