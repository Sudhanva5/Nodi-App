"use client";
import { useCallback, useEffect, useState } from "react";
import { Home as HomeIc, Camera, Map } from "lucide-react";
import { INITIAL_REPORTS, Report, Category, CATEGORIES, WARDS, Ward } from "@/lib/data";
import { Lang, tr } from "@/lib/i18n";
import Home from "./Home";
import Detail, { VerifiedSheet } from "./Detail";
import Nearby from "./Nearby";
import Profile, { Prefs } from "./Profile";
import { Capture, Confirm, Sending, Success, Letter } from "./ReportFlow";

export type ScreenKey = "home" | "capture" | "confirm" | "sending" | "success" | "detail" | "nearby";
type Mode = "photo" | "video" | "voice";
type Flow = null | "capture" | "confirm" | "sending" | "success";

const NEW_ID = "NODI-24611";

function makeNew(cat: Category, voice: boolean): Report {
  return {
    id: NEW_ID, cat,
    title: cat === "water" ? "Water leak on 80 Feet Rd" : `${CATEGORIES[cat].label} on 80 Feet Rd`,
    place: "80 Feet Rd, near Sony World Jn.", ward: "Ward 151 · Koramangala",
    photo: "/img/water.jpg", stage: 1,
    statusLine: "Your ward office has the formal letter. An engineer will be assigned soon.",
    expected: "Mon, 28 Sep", reportedAgo: "just now", meToo: 3,
    timeline: [
      { when: "Today, 9:39 AM", kind: "letter", title: "Formal letter sent", body: "Emailed to the Ward 151 office and logged on Sahaaya. Ref GBA/W151/2026/4611." },
      { when: "Today, 9:38 AM", kind: "neighbours", title: "Added to 3 neighbours' report", body: "They reported the same problem today, so it's now one complaint from 4 people." },
      { when: "Today, 9:38 AM", kind: "you", title: "You reported this", body: voice ? "Photo, location and a Kannada voice note sent." : "Photo and location sent." },
    ],
  };
}

export default function NodiApp({ jump, onScreen }: { jump?: { key: ScreenKey; n: number }; onScreen?: (k: ScreenKey) => void }) {
  const [tab, setTab] = useState<"home" | "nearby">("home");
  const [flow, setFlow] = useState<Flow>(null);
  const [mode, setMode] = useState<Mode>("photo");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [prefs, setPrefs] = useState<Prefs>({ big: false, lang: "en", readAloud: false, calm: false, whatsapp: true });
  const [ward, setWard] = useState<Ward>(WARDS[0]);
  const [profile, setProfile] = useState(false);
  const { lang, big } = prefs;
  const [letterFor, setLetterFor] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const t = tr(lang);

  const screen: ScreenKey = flow ?? (detailId ? "detail" : tab);
  useEffect(() => { onScreen?.(screen); }, [screen, onScreen]);
  useEffect(() => { if (!toast) return; const x = setTimeout(() => setToast(null), 2600); return () => clearTimeout(x); }, [toast]);

  const ensureNew = useCallback(() => setReports((rs) => rs.some((r) => r.id === NEW_ID) ? rs : [makeNew("water", true), ...rs]), []);

  useEffect(() => {
    if (!jump) return;
    setLetterFor(null); setVerified(false); setProfile(false);
    switch (jump.key) {
      case "home": setFlow(null); setDetailId(null); setTab("home"); break;
      case "nearby": setFlow(null); setDetailId(null); setTab("nearby"); break;
      case "capture": setMode("photo"); setFlow("capture"); break;
      case "confirm": setMode("photo"); setFlow("confirm"); break;
      case "sending": setFlow("sending"); break;
      case "success": ensureNew(); setFlow("success"); break;
      case "detail":
        setReports((rs) => rs.map((r) => r.id === "NODI-24519" ? INITIAL_REPORTS[0] : r));
        setFlow(null); setDetailId("NODI-24519"); break;
    }
  }, [jump, ensureNew]);

  const update = (id: string, fn: (r: Report) => Report) => setReports((rs) => rs.map((r) => (r.id === id ? fn(r) : r)));
  const detail = reports.find((r) => r.id === detailId);
  const newReport = reports.find((r) => r.id === NEW_ID);

  return (
    <div className={"nodi" + (big ? " big" : "") + (prefs.calm ? " calm" : "")} lang={lang === "kn" ? "kn" : "en"}>
      {screen === "home" && (
        <Home reports={reports} lang={lang} ward={ward} onProfile={() => setProfile(true)}
          onReport={(m) => { setMode(m ?? "photo"); setFlow("capture"); }}
          onOpen={(id) => setDetailId(id)} />
      )}
      {screen === "nearby" && <Nearby lang={lang} onVerified={() => setVerified(true)} extraMeToo={newReport ? { n2: 1 } : {}} />}
      {screen === "detail" && detail && (
        <Detail report={detail} lang={lang} autoRead={prefs.readAloud} onBack={() => setDetailId(null)} onLetter={() => setLetterFor(detail.id)} onVerified={() => setVerified(true)}
          onConfirm={() => {
            update(detail.id, (r) => ({ ...r, stage: 4, statusLine: "Closed by you. 14 neighbours were told it's fixed.", timeline: [{ when: "Today, 12:05 PM", kind: "fixed", title: "You confirmed it is fixed", body: "Closed. 14 neighbours were told." }, ...r.timeline] }));
            setToast("Thank you. Complaint closed.");
          }}
          onReopen={() => {
            update(detail.id, (r) => ({ ...r, stage: 2, reopened: true, expected: "Tue, 29 Sep", statusLine: "Sent to the Asst. Executive Engineer with a new deadline of Tue, 29 Sep. We've asked 2 neighbours to check it too.", timeline: [{ when: "Today, 12:05 PM", kind: "reopen", title: "Reopened and escalated", body: "You said it's not fixed. Sent to M. Prakash, Asst. Executive Engineer, with a new deadline." }, ...r.timeline] }));
            setToast("Reopened and escalated");
          }} />
      )}

      {(screen === "home" || screen === "nearby") && (
        <div className="dock">
          <nav className="tabpill" aria-label="Tabs">
            <button className={screen === "home" ? "on" : ""} onClick={() => setTab("home")}><HomeIc size={22} /><span>{t("Home")}</span></button>
            <button className={screen === "nearby" ? "on" : ""} onClick={() => setTab("nearby")}><Map size={22} /><span>{t("Nearby")}</span></button>
          </nav>
          <button className="fab" onClick={() => { setMode("photo"); setFlow("capture"); }} aria-label={t("Report a problem")}><Camera size={24} /></button>
        </div>
      )}

      {flow === "capture" && <div className="modal-screen"><Capture initialMode={mode} onClose={() => setFlow(null)} onCaptured={(m) => { setMode(m); setFlow("confirm"); }} /></div>}
      {flow === "confirm" && <div className="modal-screen"><Confirm mode={mode} lang={lang} onBack={() => setFlow("capture")} onSend={(cat, voice) => { setReports((rs) => [makeNew(cat, voice), ...rs.filter((r) => r.id !== NEW_ID)]); setFlow("sending"); }} /></div>}
      {flow === "sending" && <div className="modal-screen"><Sending onDone={() => { ensureNew(); setFlow("success"); }} /></div>}
      {flow === "success" && newReport && (
        <div className="modal-screen"><Success report={newReport} onLetter={() => setLetterFor(NEW_ID)} onDone={() => { setFlow(null); setDetailId(null); setTab("home"); }} onTrack={() => { setFlow(null); setDetailId(NEW_ID); }} /></div>
      )}

      {letterFor && <Letter report={reports.find((r) => r.id === letterFor)!} onClose={() => setLetterFor(null)} />}
      {verified && <VerifiedSheet onClose={() => setVerified(false)} />}
      {profile && <Profile ward={ward} onWard={(w) => { setWard(w); setToast(`Ward set to ${w.name}`); }} prefs={prefs} setPrefs={setPrefs} onClose={() => setProfile(false)} />}
      {toast && <div className="toast">{toast}</div>}
      <div className="homeind" />
    </div>
  );
}
