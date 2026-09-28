# How I designed Nodi, a helper app that makes civic complaints in Bengaluru easy to report and easy to trust

Namma Yatri · Product design assignment · Product Designer · iOS · Concept and prototype · 2026

Prototype: `/` · Case study: `/case-study`

## Background

**What is Nodi?** Nodi (ನೋಡಿ, "look" in Kannada) is a free initiative by Namma Yatri. It is a helper app for Sahaaya, the official complaint app from the city. You spot a problem, send a photo, and Nodi takes it to the right ward office and follows it until it's fixed.

Nodi does not replace Sahaaya. Every report still lands in the official system. Nodi adds what Sahaaya is missing: a fast way to report, a clear view of progress, and proof that work actually happened.

**What is Sahaaya?** BBMP launched Sahaaya in 2016 and upgraded it to Sahaaya 2.0 in 2020 ([Indian Express](https://indianexpress.com/article/cities/bangalore/bengaluru-complain-glitches-sahaya-2-app-7653849)). In 2025 the Greater Bengaluru Authority (GBA) replaced BBMP, and the app now sits inside Namma Bengaluru.

## The problem statement

People do report problems. The app just doesn't tell them what happened next, and complaints often get closed without any work being done. The Namma Bengaluru (Sahaaya 2.0) app is rated about 2.1★ on Google Play.

- "What is the use of lodging complaints on the app if they are going to get closed without being resolved?" ([The Hindu, 2019](https://www.thehindu.com/news/cities/bangalore/sahaya-app-of-little-sahaya-complain-citizens/article28264197.ece))
- "Bengaluru residents are frustrated as the BBMP Sahaaya 2.0 grievance app marks complaints as resolved without action." ([Times of India, 2024](https://timesofindia.indiatimes.com/city/bengaluru/bengalurus-bbmp-sahaaya-20-app-fails-to-address-civic-complaints/articleshow/115392024.cms))
- GBA's planned Sahaya 3.0 "will also allow citizens to reopen complaints that they believe have not been satisfactorily resolved." ([The Hindu, 2026](https://www.thehindu.com/news/cities/bangalore/sahaya-30-gba-to-develop-upgraded-portal-for-civic-grievances/article71448055.ece))

Verbatim Play Store reviews:

> "Name sake app. Report any complaint in the app, they will just close it as per their wish. No resolution. Ticket closing option should be given to the person who raised the complaint along with work completion photo..." (Shreyas B S, Aug 2026)

> "I have not seen any visible update since registering an issue about the road condition...there is no timeline shared, no status update..no plan shared with me..." (sharath shanker, Jun 2026)

> "The 'submit' button doesn't work even after we fill up the entire form without skipping anything." (ZH Javali, Jan 2026)

**So, the brief for Nodi:** make reporting take seconds, show every step of the fix, and only close a complaint when the person who reported it says it's done.

## Assumptions

- **Who it's for.** Bengaluru residents aged 18 to 60 who use a smartphone, including people who aren't comfortable with apps.
- **Where it runs.** A mobile app, so accessibility is built in from day one: light and dark mode, Kannada, and bigger text.
- **Who sends the letters.** A small Nodi team on the backend writes a formal letter to GBA for every report, on behalf of the resident.
- **How GBA's work shows up.** An AI agent watches GBA's Twitter account and matches their posts to open complaints.
- **No cross-selling.** Nodi is only for civic complaints. It does not promote Namma Yatri rides.

## How Nodi works

**1. Report a problem with one button.** Tap Report a problem, take a photo or video. Nodi fills in the type, location and ward. Add more with +, and write or speak a note. The Nodi team sends a formal letter to the ward office on your behalf.

**2. See exactly where your complaint is.** The current step, the engineer assigned, a timeline, and your photos and videos. GBA's Twitter post appears inside the complaint; open it on Twitter to reply. Only you can close it. Tap No and it goes back to GBA with a new deadline.

**How GBA's posts get matched.** An AI agent reads every GBA post and checks where, what kind of work, and when. If it matches an open complaint nearby, Nodi adds it to the timeline and asks the reporter to confirm.

## Building trust

- A formal letter for every report.
- GBA's own posts as proof.
- Only the resident closes a complaint.
- A running count on the home screen: "Since launch in 2026, 21,780 potholes filled." These numbers are placeholders, and a hypothesis that visible results bring people back.

## Nearby

A live map of every issue reported around you, with the reporter's photo on each pin. Tap one to see what GBA has done so far. The Official updates tab shows only GBA's posts. Nearby is read-only; it's there to build confidence.

## Accessibility

Kannada (Anek Kannada), light and dark mode, bigger text, read aloud and reduce motion. All behind the profile photo on Home.

## How I'd measure success

- **Engagement:** complaints per active user. If people keep reporting, they trust it works.
- **Outcome:** resolutions completed through Nodi, confirmed by the resident.
- **Business KPI:** Bengaluru's standing as a smart city.
