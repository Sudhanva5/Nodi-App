# Nodi: frictionless civic complaints for Bengaluru

Namma Yatri Product Design Assignment (A). Prototype: `/` in this project. This write-up: `/case-study`.

## Summary

Nodi (ನೋಡಿ, Kannada for "look") is a Namma Yatri app for reporting a broken civic thing the moment you see it and watching it get fixed. You look, you snap, and the city has to look too. Reporting is one photo plus one confirm sheet: the app fills in the category, location, ward and duplicates for you. Tracking works like a food delivery tracker, with five plain-language stages. The part I care most about is trust. Every complaint gets a formal letter to the ward engineer, official proof of work pulled from the authority's verified X account, and only the citizen can mark a complaint as fixed. The whole flow is designed so a 68-year-old who reads Kannada and dislikes typing can finish it as easily as a 29-year-old commuter.

## The problem, and what research told me

The brief says existing civic apps are slow, confusing and opaque. Desk research on Bengaluru backs that up, and points at one failure bigger than the rest: people stop believing the status.

- **Complaints get closed without being fixed.** The Times of India reported that BBMP Sahaaya 2.0 marks complaints as resolved without action ([TOI, Nov 2024](https://timesofindia.indiatimes.com/articleshow/115392024.cms)). An earlier snapshot counted about 1.7 lakh complaints with about 5,900 still unresolved ([TOI](https://timesofindia.indiatimes.com/articleshow/87321254.cms)).
- **Escalation is noise to citizens.** One r/bangalore thread describes 23 days and six escalation SMSes (AE to AEE to EE to SE) with nothing fixed ([Reddit](https://www.reddit.com/r/bangalore/comments/rvouyn/)). Another calls the app "a big SCAM" ([Reddit](https://www.reddit.com/r/bangalore/comments/1s2gkoe/)). A counter-signal matters too: one person who raised about 50 pothole complaints in a year says most were resolved ([Reddit](https://www.reddit.com/r/bangalore/comments/1h3y0a8/)). Persistence works. The system just hides that from you.
- **The current app is hard to use.** The Namma Bengaluru app, which now hosts Sahaaya, sits at 2.0 stars on the App Store. The top complaint is that there is no back button ([App Store](https://apps.apple.com/in/app/namma-bengaluru/id6755224744)).
- **The authority changed, the name didn't.** BBMP was dissolved and the Greater Bengaluru Authority (GBA) with five city corporations took over from September 2025 ([The Hindu](https://www.thehindu.com/news/cities/bangalore/more-wards-same-workforce-gba-corporations-struggle-to-deliver-on-the-ground)). People still say "BBMP", so Nodi accepts both words in search and voice.
- **Officials already post proof on X.** @GBA_office posts photos of pothole repair work ([x.com/GBA_office](https://x.com/GBA_office)). The BWSSB chairman's account asks citizens to tweet because app tickets "seem useless". Citizens also call out staged photos as eyewash ([example](https://x.com/ChristinMP_/status/1851480269359923241)). So X proof helps, but it can't be the only proof.
- **Elders need voice, big type and fewer choices.** A systematic review of app design for older adults points to voice, text-to-speech and task simplification ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12350549)). Work on WhatsApp use in South Asia shows low-literacy, multilingual users lean on familiar, multimodal interfaces ([ACM SIGACCESS 2024](https://dl.acm.org/doi/10.1145/3663547.3746389)).
- **Namma Yatri has a reason to build this.** It is zero-commission, open source and publishes open data ([nammayatri.in/open](https://nammayatri.in/open)), and it runs on ONDC and Beckn. Its roughly 7.7 lakh drivers ([nammayatri.in](https://nammayatri.in)) spend all day on the roads Nodi is about.

## Who it's for

These are proto-personas built from the research above. I'd validate them in the first round of testing.

| Person | Situation | What they need |
|---|---|---|
| Priya, 29, commuter, Koramangala | Sees a pothole on the way to work and has about 20 seconds. | No forms. Snap, send, get back to her day. |
| Ramesh, 68, retired, Jayanagar | Kannada-first, uses WhatsApp and UPI, reads with glasses, dislikes typing. | To speak instead of type, to see big text, and to know a real person got it. |
| Manjunath, 41, Namma Yatri auto driver (future) | Hits the same potholes every day. | One tap from the driver app, without stopping the ride. |
| Assistant Engineer, GBA ward office (secondary) | Receives complaints from many channels. | Clean, deduplicated, geo-tagged tickets with photos. Out of scope for this prototype. |

## Assumptions and trade-offs

| Assumption | Trade-off I accepted | How I'd reduce the risk |
|---|---|---|
| There is no Sahaaya API on day one. | A Nodi ops team emails a formal letter to the ward engineer and logs the ticket on Sahaaya or 1533 by hand. That costs ops money but lets us launch without waiting on government IT. | Start with one city corporation and push for an API or MoU once the volume makes the case. |
| The user is already signed in through their Namma Yatri account, so there is no login wall. | Easier reporting means more spam risk. | Phone-linked accounts, EXIF and GPS checks on photos, rate limits per person. |
| AI can guess the category from the photo. | It will sometimes guess wrong. | The guess is an editable chip, never a blocker. We track how often people change it. |
| Reports appear on a public map. | Public posting raises privacy concerns. | Reporters are anonymous by default. Faces and number plates are blurred automatically. |
| Officials post work updates on X. | Scraping X is brittle and breaks its terms at scale. | Use the official API or a partner feed, with a person verifying each match. X is proof, not the source of truth. |
| One confirm sheet instead of a multi-step form. | Less room for detail up front. | Smart defaults plus an optional voice note. Detail can be added later from the tracking screen. |

## Core user flow

1. On Home, tap the big yellow **Report a problem** button.
2. The camera opens straight away, with Photo, Video and Voice only modes.
3. Snap. In the background, Nodi guesses the category ("Pothole, looks large"), reads GPS and turns it into a landmark and ward, and checks for duplicates nearby.
4. One confirm sheet shows the photo, the category chip, the location, and an optional hold-to-speak voice note in any language. If 14 neighbours already reported the same pothole, the sheet offers to add your voice to theirs instead of creating a new ticket.
5. Tap **Send**. A short loader shows who is handling it: "Powered by Namma Yatri, delivered to GBA Ward 151".
6. The success screen shows the ticket number (NODI-24519), confirms that a formal letter went to the Assistant Engineer for Ward 151, gives the expected fix date from the SLA, and says updates will come on WhatsApp.
7. Tracking moves through five stages: Reported, Letter sent, Assigned, Work done, You confirm.
8. When the authority marks work done, Nodi shows the after-photo and the matching post from @GBA_office, then asks you: "Is it actually fixed?"
9. Yes closes it as Fixed. No reopens it, escalates it to the next engineer up (AEE), and asks neighbours to check.

```mermaid
flowchart TD
    A[Home] -->|Report a problem| B[Camera: Photo / Video / Voice]
    B -->|Snap| C{Auto-fill}
    C --> C1[Category guess]
    C --> C2[GPS to landmark + ward]
    C --> C3{Duplicate nearby?}
    C3 -->|Yes| D1[Add your voice to existing report]
    C3 -->|No| D2[New report]
    D1 --> E[Confirm sheet]
    D2 --> E
    E -->|Send| F[Loader: Powered by Namma Yatri, delivered to GBA]
    F --> G[Success: ticket, letter sent, expected date]
    G --> H[1. Reported]
    H --> I[2. Letter sent to AE, Ward 151]
    I --> J[3. Assigned: engineer + SLA date]
    J --> K[4. Work done: after-photo + @GBA_office post]
    K --> L{5. Is it actually fixed?}
    L -->|Yes| M[Fixed, closed by citizen]
    L -->|No| N[Reopen]
    N --> O[Escalate to AEE + ask neighbours to verify]
    O --> J
    L -->|No reply for 72h + 2 neighbour confirmations| M
```

## Key design decisions

1. **Camera first, questions later.**
   Why: the moment of seeing the problem is the moment of motivation. Every screen before the camera is a place to drop off. The photo also answers most of the questions a form would ask.

2. **One confirm sheet, not a wizard.**
   Why: a four-step form feels like paperwork. One sheet with smart defaults means the typical path is snap, glance, send. Everything on the sheet can be edited, and nothing on it is required.

3. **The category is a guess shown as a chip.**
   Why: people don't think in department names. "Pothole" is shown with a quiet "looks large", and one tap changes it. If the AI is wrong, the user fixes it in a second instead of getting stuck.

4. **Duplicates become "add your voice".**
   Why: 14 separate tickets for one pothole help nobody. Joining an existing report gives the citizen the same tracking, gives the engineer one clean ticket, and a count that shows how many people care.

5. **Tracking looks like a delivery tracker.**
   Why: every smartphone user in Bengaluru already reads a Swiggy or Namma Yatri ride tracker without thinking. Five stages in plain words ("Letter sent", not "Forwarded to JE") are easy to read from across a room.

6. **Only the citizen can close a complaint.**
   Why: fake closures are the single biggest reason people stop trusting Sahaaya. Moving the close button to the person who reported it changes the incentive. The 72-hour plus two-neighbour rule stops tickets from staying open forever when someone stops replying.

7. **A formal letter goes out with every complaint.**
   Why: a named letter to a named engineer, with a date, is something a ward office has to answer. It also gives the citizen a document to point at if things stall.

8. **Official proof appears in the timeline, labelled with its source.**
   Why: an after-photo from a verified @GBA_office post, marked "Pulled from X", is stronger than a status change. Labelling where it came from keeps us honest when the post is vague or staged, and that is why the citizen still has the final word.

9. **Dark map for Nearby, light screens for everything else.**
   Why: the Citizen-style dark map makes coloured category pins readable at a glance and feels like a live view of the neighbourhood. Reading and tracking screens stay light with high contrast, which is easier for older eyes.

10. **Nearby shows authority action, not only problems.**
   Why: a map of only potholes is depressing and makes reporting feel pointless. A ward scorecard and a feed of recent fixes show that reports lead somewhere, which is what gets someone to report the next one.

## Trust system

Trust is the product. Each piece below answers the question "did anyone actually do anything?"

- **Powered-by loader.** When you tap Send, you see who is carrying your complaint: Namma Yatri, then GBA Ward 151. It takes about a second and replaces a spinner with a name.
- **Formal letter.** A PDF letter is emailed to the Assistant Engineer for the ward and the ticket is logged on Sahaaya or 1533. The citizen can open the letter from the timeline.
- **Verified badges.** Official accounts and engineers get a verified check. Tapping it opens a short sheet explaining what verified means and who checked it.
- **X proof.** When @GBA_office posts about work at that location, the post shows up in the timeline with its photo, a verified badge and a "Pulled from X" label.
- **Citizen-only closure.** Nothing is "Fixed" until the person who reported it says so, or until 72 hours of silence plus two neighbours confirm it.
- **Named people and dates.** Every stage shows who owns it and when it's expected. SLAs by type: pothole 3 days, garbage 1 day, streetlight 2 days, water leak 1 day.

## Designing for elders

Ramesh is the person I designed for. If he can do it, Priya can do it faster.

- **Big text toggle (Aa)** on the Home screen. One tap scales the whole app, without digging through Settings.
- **Voice everywhere.** Hold to speak on the confirm sheet, in Kannada, English or Hindi. There's also a Voice only mode for when a photo isn't possible.
- **Listen button** on every status update. The app reads the update aloud.
- **Kannada and English** switch from the Home screen (ಕ / EN). Search and voice understand "BBMP" as well as "GBA".
- **One decision per screen.** Each screen has one obvious primary action. Secondary options are text links.
- **Touch targets of 44pt or more**, following Apple's Human Interface Guidelines, with the main buttons much larger.
- **WhatsApp updates**, because that is where elders already read messages. They don't need to open the app to know what happened.
- **A way to reach a person.** The 1533 helpline is one tap away on the tracking screen.

## MVP and future

| Now (MVP) | Next | Later |
|---|---|---|
| Camera-first report with photo, video or voice | GBA officer console for ward engineers | One-tap pothole reporting from the Namma Yatri driver app, then accelerometer detection |
| AI category guess and GPS-to-ward routing | Automatic sync with Sahaaya and the X API | WhatsApp bot and IVR reporting for feature phones |
| Duplicate detection and "add your voice" | Automatic escalation ladder (AE, AEE, EE) | RTI letter generator for complaints that stall |
| Five-stage tracker with named owners and dates | Ward scorecards on the Nearby map | Routing to BESCOM and BWSSB |
| Automatic formal letter to the ward engineer | Offline queue for poor network | Public open-data API, in line with Namma Yatri's open data |
| WhatsApp and push updates | | |
| Citizen confirm and reopen | | |
| Nearby map with "Support" | | |
| Kannada and English, big text, Listen | | |
| Verified badges and X proof matched by ops | | |

## How I'd measure success

All targets below are my starting goals for a pilot, not measured numbers. I'd reset them after the first month of real data.

**North star: citizen-verified resolutions per week.** It only moves when a problem is reported, routed, fixed and confirmed by the person who saw it, so no single team can game it.

**Reporting funnel**
- Camera opened to report submitted: 80% or more.
- Median time from tapping Report to Send: under 30 seconds.
- AI category accepted without edits: 85% or more.
- Completion rate for users aged 60+ roughly equal to users under 40.

**Outcomes**
- Share of complaints fixed within SLA.
- Median days to fix, by category.
- Reopen rate. It should be visible early (it means we're catching fake closures) and then trend down.
- Closures backed by official proof: 70% or more.
- Satisfaction rating after a fix.

**Trust and engagement**
- "Support" count per issue, which also measures how well deduplication works.
- People who file a second report within 60 days.
- Open rate of WhatsApp status updates.

**Business, for Namma Yatri**
- Nodi users who install or open the Namma Yatri app.
- Brand trust and NPS in Bengaluru.
- Cost per complaint compared with a 1533 call.
- A partnership or MoU with GBA, and a shared open-data dashboard.
- Driver engagement once driver reporting launches.
- Pothole data improving ETA and routing for rides.

**Guardrails**
- Share of spam or false reports.
- Duplicate tickets that slip through.
- Privacy incidents, such as an unblurred face or number plate.
- Authority SLA breach rate. If this climbs, citizens stop trusting the dates we show.

## Risks and open questions

- **Will GBA engage?** Without a partner inside the authority, Nodi is a very polite complaint forwarder. The letter and X proof work without one, but a pilot MoU with one city corporation would change a lot.
- **The ops cost of the bridge.** Logging tickets by hand and matching X posts doesn't scale forever. I'd need to know how many reports per day one ops person can handle before API work becomes urgent.
- **Staged proof.** An official photo can still be misleading. Citizen confirmation covers this, but it also means we need a clear, calm way to say "not fixed" that doesn't feel like a fight with the government.
- **Neighbour confirmation can be gamed.** Two confirmations is a guess. It needs abuse checks and a look at real data.
- **Voice notes in mixed languages.** Transcribing Kannada, English and Hindi mixed in one sentence is hard. The engineer may need to hear the audio, not just read the text.
- **Silence after 72 hours.** Auto-closing a complaint when the reporter goes quiet could feel like the old problem coming back. It needs testing with real users.

## What I'd test first

A moderated usability round with 10 people in Bengaluru: 5 people aged 60 or older (at least 3 who prefer Kannada) and 5 daily commuters under 40. Sessions happen on a phone, outdoors where possible, because that's where reports actually happen.

Tasks:
1. Report the pothole in this photo. I'd measure time to Send, where they hesitate, and whether they notice and trust the category guess.
2. You already reported this. Find out what's happening with it. Can they tell which stage it's at and who owns it?
3. The city says it's fixed, but it isn't. What do you do? Do they find "No, not fixed" and understand what happens next?
4. Elders only: do the same report without typing anything, using big text and voice.

What I'd watch for: whether the camera opening straight away feels fast or startling, whether "Letter sent" means anything to people, whether a verified X post raises trust or reads as government PR, and whether the Listen button gets used without prompting.

The success bar for round one: at least 8 of 10 people report the pothole without help, and elders finish at close to the same rate as commuters. If elders fall behind, voice and big text move ahead of everything else on the roadmap.
