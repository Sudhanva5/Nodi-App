"use client";
import { useCallback, useState } from "react";
import NodiApp, { ScreenKey } from "@/components/NodiApp";

const NOTES: Record<ScreenKey, { n: string; title: string; why: string[] }> = {
  home: { n: "01", title: "Home · My reports", why: [
    "One job above the fold: 'See a problem' flips through road, streetlights, water and footpaths, with a single 'Report a problem' button under it. The yellow camera button in the dock does the same thing from anywhere.",
    "'Check if it's fixed' comes first, with a pulsing dot. Only the citizen can close a complaint, which fixes Sahaaya's fake 'Resolved' problem.",
    "The report cards are compact, and each one shows its status, due date and a thin 5-step progress bar.",
    "Tapping the profile photo opens your ward, a link to your ward on Sahaaya, and accessibility settings: language, bigger text, read aloud and reduce motion.",
  ] },
  capture: { n: "02a", title: "Report · Camera first", why: [
    "The app opens straight into the camera, so there's no form or category to pick first. Photo, video and voice use the same controls as the iOS Camera app.",
    "In voice mode you hold and speak, like WhatsApp. It's the easiest path for elders and anyone who can't read well.",
    "'Only if it's safe to stop' reminds drivers and riders to report safely.",
  ] },
  confirm: { n: "02b", title: "Report · One confirm sheet", why: [
    "The AI and GPS fill in the category, location and ward. The user just checks and sends, so there's no step-by-step wizard.",
    "If the AI guesses wrong, the category is a chip you can change. A wrong guess never blocks sending.",
    "Duplicate check: '3 neighbours reported this' merges the new report into theirs, so the city gets one stronger complaint, not four weak ones.",
    "The voice note works in any language, with a live transcript and translation for the engineer.",
  ] },
  sending: { n: "02c", title: "Trust loader", why: [
    "The wait becomes proof. The loader shows three real steps: attached, delivered to the ward, letter emailed.",
    "The 'Powered by Namma Yatri + GBA' line borrows trust from a brand people already use daily.",
  ] },
  success: { n: "02d", title: "Sent, with a promise", why: [
    "It gives a complaint number, the named office it went to, and an expected fix date based on each category's service deadline.",
    "The formal letter can be opened and shared. It turns an app tap into an official record.",
    "Updates go to WhatsApp, where elders already are.",
  ] },
  detail: { n: "03", title: "Track · Proof, then you confirm", why: [
    "A plain-language headline tells you the status, and a Listen button reads it aloud.",
    "The before and after photos, plus a matched post from verified @GBA_office on X, are the official proof.",
    "'Is it actually fixed?' If the answer is no, the complaint reopens and goes back to GBA with a new deadline.",
    "The timeline names real people (the engineer) and has verified badges you can tap for an explanation.",
  ] },
  nearby: { n: "04", title: "Nearby · Citizen-style live map", why: [
    "A dark map with glowing pins for each category. The number on a pin shows how many neighbours support that complaint.",
    "The ward scorecard (fixed on time, average days, open now) holds the authority publicly accountable.",
    "'Support' adds your name to an existing complaint, so you don't have to file a new one.",
    "The 'Official updates' tab shows verified GBA posts from X, linked to the complaints they close.",
  ] },
};

const JUMPS: { k: ScreenKey; label: string }[] = [
  { k: "home", label: "01 Home" }, { k: "capture", label: "02 Report" }, { k: "confirm", label: "Confirm" }, { k: "success", label: "Sent" }, { k: "detail", label: "03 Track" }, { k: "nearby", label: "04 Nearby" },
];

export default function Page() {
  const [jump, setJump] = useState<{ key: ScreenKey; n: number }>();
  const [cur, setCur] = useState<ScreenKey>("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const onScreen = useCallback((k: ScreenKey) => setCur(k), []);
  const note = NOTES[cur];
  return (
    <main className="stage">
      <aside className="panel">
        <div className="p-brand">
          <img src="/img/logo.png" alt="Nodi logo" />
          <div><h1>Nodi</h1><span>ನೋಡಿ · "look" in Kannada</span></div>
        </div>
        <p className="p-tag">Snap it. Send it. See it fixed.<br /><em>A civic complaint prototype for Namma Yatri.</em></p>
        <div className="p-jumps">
          {JUMPS.map((j) => (
            <button key={j.k} className={cur === j.k || (j.k === "capture" && cur === "sending") ? "on" : ""} onClick={() => setJump({ key: j.k, n: Date.now() })}>{j.label}</button>
          ))}
        </div>
        <div className="p-theme">
          <button className={theme === "dark" ? "on" : ""} onClick={() => setTheme("dark")}>Dark</button>
          <button className={theme === "light" ? "on" : ""} onClick={() => setTheme("light")}>Light</button>
        </div>
        <div className="p-note" key={cur}>
          <span className="p-n">{note.n}</span>
          <h2>{note.title}</h2>
          <ul>{note.why.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
        <div className="p-try">
          <b>Try this</b>
          <ol>
            <li>Tap <em>Report a problem</em>, then the shutter, then <em>Send to GBA</em>.</li>
            <li>Open the pothole card, then <em>No, still there</em>.</li>
            <li>Toggle <em>Aa</em> and <em>ಕ</em> on Home.</li>
            <li>On Nearby, drag the sheet, tap pins, tap <em>Support</em>.</li>
          </ol>
        </div>
        <a className="p-link" href="/case-study">Read the case study: flow, trade-offs, metrics →</a>
      </aside>
      <div className="device-wrap">
        <div className="device">
          <div className="island" />
          <div className="device-screen"><NodiApp jump={jump} onScreen={onScreen} theme={theme} onTheme={setTheme} /></div>
        </div>
      </div>
    </main>
  );
}
