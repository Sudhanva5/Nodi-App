import type { ScreenKey } from "@/components/NodiApp";

export const NOTES: Record<ScreenKey, { n: string; title: string; why: string[] }> = {
  home: { n: "01", title: "Home · My reports", why: [
    "One job above the fold: 'See a problem' flips through road, streetlights, water and footpaths, with a single 'Report a problem' button under it. The yellow camera button in the dock does the same thing from anywhere.",
    "'Check if it's fixed' comes first, with a pulsing dot. Only the citizen can close a complaint, which fixes Sahaaya's fake 'Resolved' problem.",
    "The report cards are compact, and each one shows its status, due date and a thin 5-step progress bar.",
    "Tapping the profile photo opens your ward, a link to your ward on Sahaaya, and accessibility settings: language, bigger text, read aloud and reduce motion.",
  ] },
  capture: { n: "02a", title: "Report · Camera first", why: [
    "The app opens straight into the camera, so there's no form or category to pick first. Photo and video use the same controls as the iOS Camera app.",
    "'Only if it's safe to stop' reminds drivers and riders to report safely.",
  ] },
  confirm: { n: "02b", title: "Report · One confirm sheet", why: [
    "The AI and GPS fill in the category, location and ward. The user just checks and sends, so there's no step-by-step wizard.",
    "If the AI guesses wrong, the category is a chip you can change. A wrong guess never blocks sending.",
    "'Add more details' lets people attach more photos or videos from other angles, which gives the engineer a clearer picture before they visit.",
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
  nearby: { n: "04", title: "Nearby · What's happening around you", why: [
    "Inspired by Citizen: a dark live map where reports show up as photo thumbnails, with small icon pins for the rest. It shows at a glance that people nearby are reporting things too.",
    "Tapping any pin or row opens an incident sheet. It's read-only: the photo, the stage, and a short timeline of what GBA has done so far.",
    "'Reported' lists every incident in the ward, newest first, in the same format as Citizen: distance and street, title, one line, and when it was last updated.",
    "'Official updates' shows only GBA's posts on Twitter. Seeing residents report and GBA respond side by side builds trust.",
  ] },
};

