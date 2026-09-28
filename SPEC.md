# Nodi — product spec (source of truth for prototype + case study)

**Name:** Nodi (ನೋಡಿ, Kannada for "look"). You look, you snap, and the city has to look too.
**Tagline:** Snap it. Send it. See it fixed.
**Maker:** A Namma Yatri (Moving Tech) product. Open, citizen-first, Kannada + English.
**Brand:** Namma Yatri yellow #FCC32C on ink #111111. Logo = yellow map pin with an eye cut-out. iOS HIG: SF Pro (system font), grouped backgrounds #F2F2F7, 44pt min targets, sheets with detents, tab bar.
**Authority:** Greater Bengaluru Authority (GBA, formerly BBMP; BBMP dissolved Sep 2025, now 5 city corporations). Users still say "BBMP", so voice/search accepts both. Demo ward: Ward 151 Koramangala, Bengaluru South City Corporation. Real X handle for official proof: @GBA_office. Helpline 1533.

## Research signals (cite in case study)
- Sahaaya 2.0 / Namma Bengaluru app: complaints marked "Resolved" without work (TOI Nov 2024, articleshow/115392024.cms); Reddit r/bangalore: 23 days + 6 escalation SMS, no fix. Namma Bengaluru app 2.0★ on App Store (no back button, plain UI).
- ~1.7 lakh complaints logged, ~5,900 unresolved at one snapshot (TOI).
- @GBA_office posts photo updates of pothole works; @chairmanbwssb asks people to tweet because app tickets "seem useless". Citizens call out staged "eyewash" photos.
- Elderly/low-literacy Indian users rely on WhatsApp, voice, big type, one decision per screen (PMC systematic review; ACM SIGACCESS 2024).
- Namma Yatri: zero-commission, open-source, open data (nammayatri.in/open), ONDC/Beckn; ~7.7 lakh drivers who are on the roads all day.

## Users
1. **Priya, 29, commuter, Koramangala.** Sees a pothole on the way to work. Has 20 seconds. Wants zero forms.
2. **Ramesh, 68, retired, Jayanagar.** Kannada-first, WhatsApp + UPI user, dislikes typing, reads with glasses. Wants to speak, see big text, and know a real person got it.
3. **Manjunath, 41, Namma Yatri auto driver (future).** Hits the same potholes daily; one-tap report from driver app.
4. **Ward engineer (AE), GBA (secondary, out of prototype scope).** Needs clean, deduplicated, geo-tagged tickets.

## Core flow (prototype)
Home → big "Report a problem" → Camera (Photo / Video / Voice only) → Snap → system auto-fills: category (AI "Pothole, looks large"), GPS + landmark + ward, duplicate check ("14 neighbours reported this nearby, add your voice") → **one confirm sheet** (photo, category chip editable, location, optional hold-to-speak voice note in any language, Send) → Sending loader with trust logos ("Powered by Namma Yatri · Delivered to GBA Ward 151") → Success (ticket NODI-24519, formal letter emailed to AE Ward 151, expected fix date by SLA, updates on WhatsApp) → Track.
No login wall: user is already signed in via Namma Yatri account (phone number known).

## Tracking stages (5, plain language)
1. **Reported** — you sent it (photo, location).
2. **Letter sent** — formal complaint letter (PDF) emailed to Asst. Engineer, Ward 151 + logged on Sahaaya/1533 by Nodi ops.
3. **Assigned** — named engineer/contractor, expected date (SLA: pothole 3 days, garbage 1 day, streetlight 2 days, water leak 1 day).
4. **Work done** — official proof: after-photo + matched post from verified @GBA_office on X (blue/gold verified check, "Pulled from X" label).
5. **You confirm** — "Is it actually fixed?" Yes → Fixed ✓. No → auto re-open + escalate to AEE, neighbours asked to verify.
Rule: only citizens can close a complaint. Silent after 72h + 2 neighbour confirmations = auto-close.

## Screens (3–4 hi-fi)
1. Home / My reports (active reports with progress + "Needs your confirmation" card, big Report button, Aa big-text + ಕ/EN toggle).
2. Report: camera → confirm sheet → sending (trust loader) → success.
3. Report detail / tracking timeline with verified official proof + confirm fixed.
4. Nearby map (dark Citizen-style map, glowing category pins, filter chips, bottom sheet with nearby issues, "Me too", ward scorecard, official action feed).

## Metrics
- **North star:** citizen-verified resolutions per week.
- Funnel: camera open → submitted ≥ 80%; median time-to-report < 30 s; AI category accepted without edit ≥ 85%; 60+ users completion parity with <40.
- Outcome: % resolved within SLA; median days to fix; reopen rate (fake-closure catch) trending down; % closures with official proof ≥ 70%; post-fix CSAT.
- Trust/engagement: "me too" per issue (dedup), second report within 60 days, WhatsApp update open rate.
- Business (Namma Yatri): Nodi → NY super-app installs/cross-sell, brand trust/NPS in Bengaluru, cost per complaint vs 1533 call centre, GBA partnership/MoU + open-data dashboard, driver engagement, road-quality data improving ETA/routing.
- Guardrails: spam/false report %, duplicate tickets created, privacy incidents (faces/plates blurred), authority SLA breach rate.

## MVP vs future
MVP: camera-first report (photo/video/voice), AI category + GPS ward routing, dedupe + me too, 5-stage tracker, auto formal letter, WhatsApp/push updates, citizen confirm/reopen, nearby map, Kannada/English, big text, verified official badges, X post matching with human ops in the loop.
Future: GBA officer console, automated X/Sahaaya sync via APIs, auto escalation ladder (AE→AEE→EE), Namma Yatri driver one-tap/accelerometer pothole detection, ward scorecards, WhatsApp bot + IVR reporting for feature phones, offline queue, RTI letter generator, BESCOM/BWSSB routing, public open-data API.

## Assumptions & trade-offs
- No Sahaaya API on day 1 → Nodi ops/email bridge + formal letter. Trade-off: ops cost vs speed to launch.
- Report-first, no login wall (NY account) → spam risk; mitigated by phone-linked account, EXIF/GPS check, rate limits.
- AI category can be wrong → shown as an editable chip, never a blocker.
- Public map → reporter anonymous by default, faces/plates auto-blurred.
- X scraping is brittle/against ToS at scale → start with official API/partner feed + human verification; X is proof, not the source of truth.
- One confirm sheet instead of a multi-step wizard → fewer fields, relies on smart defaults.
