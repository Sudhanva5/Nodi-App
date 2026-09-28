"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Search, Navigation, X, MapPin } from "lucide-react";
import { NEARBY, OFFICIAL_POSTS, Category, CATEGORIES, NearbyIssue, STAGES, gbaLog } from "@/lib/data";
import { Lang } from "@/lib/i18n";
import { StatusBar, Sheet, CatIcon, StatusDot, StageBar, Tweet } from "./ui";

const NearbyMap = dynamic(() => import("./NearbyMap"), { ssr: false, loading: () => <div className="leaflet-host" /> });

type Filter = "all" | Category;
const FILTERS: { k: Filter; label: string }[] = [
  { k: "all", label: "All" }, { k: "pothole", label: "Potholes" }, { k: "garbage", label: "Garbage" }, { k: "streetlight", label: "Lights" }, { k: "water", label: "Water" }, { k: "drain", label: "Drains" }, { k: "tree", label: "Trees" }, { k: "footpath", label: "Footpaths" },
];
const HEIGHTS = { low: 170, mid: 340, high: 660 };

export default function Nearby({ lang }: { lang: Lang; onVerified?: () => void; extraMeToo?: Record<string, number> }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [detent, setDetent] = useState<"low" | "mid" | "high">("mid");
  const [tab, setTab] = useState<"reports" | "official">("reports");
  const [sel, setSel] = useState<string | null>(null);
  const [open, setOpen] = useState<NearbyIssue | null>(null);
  const [recenter, setRecenter] = useState(0);

  const issues = useMemo(() => NEARBY.filter((i) => filter === "all" || i.cat === filter), [filter]);
  const openIssue = (i: NearbyIssue) => { setSel(i.id); setOpen(i); };

  return (
    <div className="screen nearby">
      <NearbyMap issues={issues} selected={sel} onSelect={(id) => { const i = NEARBY.find((x) => x.id === id); if (i) openIssue(i); }} recenter={recenter} />
      <div className="nb-top">
        <StatusBar dark />
        <div className="nb-search"><Search size={18} /><span>Koramangala · Ward 151</span><span className="nb-live"><i />Live</span></div>
        <div className="chips">
          {FILTERS.map((f) => (
            <button key={f.k} className={"chip" + (filter === f.k ? " on" : "")} onClick={() => setFilter(f.k)}>
              {f.k !== "all" && <CatIcon cat={f.k as Category} size={14} />}{f.label}
            </button>
          ))}
        </div>
      </div>

      <button className={"recenter" + (detent === "high" ? " hide" : "")} style={{ bottom: HEIGHTS[detent] + 14 }} onClick={() => setRecenter((n) => n + 1)} aria-label="Back to my location"><Navigation size={18} /></button>

      <Sheet detent={detent} onDetent={setDetent} dark heights={HEIGHTS}>
        <div className="nb-area">
          <h2>Koramangala</h2>
          <p>{NEARBY.length} reports in the past 7 days</p>
        </div>
        <div className="segctl">
          <button className={tab === "reports" ? "on" : ""} onClick={() => setTab("reports")}>Reported · {issues.length}</button>
          <button className={tab === "official" ? "on" : ""} onClick={() => setTab("official")}>Official updates</button>
        </div>

        {tab === "reports" ? (
          <div className="rep-list">
            {issues.map((i) => (
              <button key={i.id} className={"rep" + (i.id === sel ? " sel" : "")} onClick={() => openIssue(i)}>
                <div className="rep-main">
                  <div className="rep-where">{i.dist} · {i.place}</div>
                  <div className="rep-title">{i.title}</div>
                  <div className="rep-desc">{i.desc}</div>
                  <div className="rep-meta"><StatusDot stage={i.stage} lang={lang} /><span>Updated {i.ago} ago</span></div>
                </div>
                <div className="rep-thumb"><img src={i.photo} alt="" /><span><CatIcon cat={i.cat} size={12} /></span></div>
              </button>
            ))}
          </div>
        ) : (
          <div className="nb-list">
            {OFFICIAL_POSTS.map((p) => (
              <div key={p.id} className="nb-tweet">
                <Tweet d={{ name: p.name, handle: p.handle, avatar: "/img/gba-logo.png", text: p.text, photo: p.photo || undefined, time: p.time, likes: p.likes, replies: p.matched * 4, url: "https://x.com/GBA_office" }} />
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 120 }} />
      </Sheet>

      {open && <IncidentSheet i={open} lang={lang} onClose={() => { setOpen(null); }} />}
    </div>
  );
}

function IncidentSheet({ i, lang, onClose }: { i: NearbyIssue; lang: Lang; onClose: () => void }) {
  const log = gbaLog(i);
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="incident" onClick={(e) => e.stopPropagation()}>
        <div className="inc-photo">
          <img src={i.photo} alt="" />
          <span className="grabber" />
          <button className="glassbtn inc-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
          <span className="glasschip"><CatIcon cat={i.cat} size={13} /> {lang === "kn" ? CATEGORIES[i.cat].kn : CATEGORIES[i.cat].label}</span>
        </div>
        <div className="inc-body">
          <div className="rep-where"><MapPin size={12} /> {i.dist} · {i.place}</div>
          <h3>{i.title}</h3>
          <p className="inc-desc">{i.desc}</p>
          <div className="inc-status">
            <div className="rep-meta"><StatusDot stage={i.stage} lang={lang} /><span>Updated {i.ago} ago</span></div>
            <StageBar stage={i.stage} />
            <div className="sc-steps">{STAGES.map((s, k) => <span key={s.en} className={k <= i.stage ? "on" : ""}>{s[lang]}</span>)}</div>
          </div>
          <h4 className="inc-h">What GBA has done</h4>
          <ol className="timeline inc-tl">
            {log.map((e, k) => (
              <li key={k} className={k === 0 ? "latest" + (i.stage === 4 ? " tl-fixed" : "") : ""}>
                <span className="tl-dot" />
                <div className="tl-body">
                  <div className="tl-row"><span className="tl-stage">{e.stage}</span><span className="tl-time">{e.when}</span></div>
                  <p className="tl-text">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="inc-note">Reported by a resident. Their name stays private.</p>
        </div>
      </div>
    </div>
  );
}
