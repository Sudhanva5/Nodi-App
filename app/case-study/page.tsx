import type { Metadata } from "next";
import s from "./case-study.module.css";
import SectionNav from "./SectionNav";
import PhoneClip from "./PhoneClip";

export const metadata: Metadata = {
  title: "Nodi · Case study",
  description: "Introducing Nodi, a free helper app by Namma Yatri for frictionless civic complaints in Bengaluru.",
};

const SECTIONS = [
  { id: "background", label: "Background" },
  { id: "problem", label: "The problem" },
  { id: "assumptions", label: "Assumptions" },
  { id: "report", label: "Reporting" },
  { id: "progress", label: "Tracking progress" },
  { id: "trust", label: "Building trust" },
  { id: "nearby", label: "Nearby" },
  { id: "accessibility", label: "Accessibility" },
  { id: "metrics", label: "Metrics" },
];

const REVIEWS = [
  { img: "/img/reviews/rp.png", name: "R P", text: "lot of bugs 1. At my complaint, it is showing as no data even though there are several complaints. 2. No option from BBMP staff to update evidence before closing the ticket. 3. No option to upload both video and image while raising a complaint. 4. No Notification to user 5. overall app is not maintained at all." },
  { img: "/img/reviews/gagan-rai.png", name: "Gagan Rai", text: "I kept complaining about wet waste vehicle not being arrived and also about 2 roads with potholes and roads full of stones. Same as others mentioned, they close it without any resolution." },
  { img: "/img/reviews/sharath-shanker.png", name: "sharath shanker", text: "I have not seen any visible update since registering an issue about the road condition...there is no timeline shared, no status update." },
  { img: "/img/reviews/tathagata-saha.png", name: "Tathagata Saha", text: "it fails to identify location on the map automatically and complaints raised here not addressed. They simply delete the records as well. I will uninstall app." },
];

const NEWS = [
  { src: "The Hindu, 2019", quote: "What is the use of lodging complaints on the app if they are going to get closed without being resolved?", url: "https://www.thehindu.com/news/cities/bangalore/sahaya-app-of-little-sahaya-complain-citizens/article28264197.ece" },
  { src: "Times of India, 2024", quote: "Bengaluru residents are frustrated as the BBMP Sahaaya 2.0 grievance app marks complaints as resolved without action.", url: "https://timesofindia.indiatimes.com/city/bengaluru/bengalurus-bbmp-sahaaya-20-app-fails-to-address-civic-complaints/articleshow/115392024.cms" },
  { src: "The Hindu, 2026", quote: "The new system will also allow citizens to reopen complaints that they believe have not been satisfactorily resolved.", url: "https://www.thehindu.com/news/cities/bangalore/sahaya-30-gba-to-develop-upgraded-portal-for-civic-grievances/article71448055.ece" },
];

const PROTOTYPE = "/";

export default function CaseStudy() {
  return (
    <div className={s.page}>
      <header className={s.hero} role="img" aria-label="Three screens of the Nodi app: tracking a streetlight, the home screen and the Nearby map">
        <div className={s.heroText}>
          <div className={s.eyebrow}>Namma Yatri · Product design assignment</div>
          <h1>Introducing Nodi: frictionless civic complaints for Bengaluru</h1>
          <a className={s.cta} href={PROTOTYPE} target="_blank" rel="noreferrer">Open the prototype ↗</a>
        </div>
        <div className={s.heroArt} aria-hidden />
      </header>

      <div className={s.meta}>
        <div><span>Role</span><b>Product Designer</b></div>
        <div><span>Platform</span><b>iOS, mobile</b></div>
        <div><span>Status</span><b>Concept and prototype</b></div>
        <div><span>Year</span><b>2026</b></div>
      </div>

      <div className={s.layout}>
        <SectionNav items={SECTIONS} />
        <article className={s.article}>

          <section id="background" className={s.section}>
            <h2 className={s.chapter}>Background</h2>
            <h3>What is Nodi?</h3>
            <p>Nodi (ನೋಡಿ, &quot;look&quot; in Kannada) is a free initiative by Namma Yatri. It is a helper app for Sahaaya, the official complaint app from the city. You spot a problem, send a photo, and Nodi takes it to the right ward office and follows it until it&apos;s fixed.</p>
          </section>

          <section id="problem" className={s.section}>
            <h2 className={s.chapter}>The problem statement</h2>
            <h3>What is Sahaaya?</h3>
            <p>BBMP launched Sahaaya in 2016 and upgraded it to Sahaaya 2.0 in 2020. In 2025 the Greater Bengaluru Authority (GBA) replaced BBMP, and the app now sits inside Namma Bengaluru. People still call it &quot;the BBMP app&quot;.</p>
            <p>People do report problems. The app just doesn&apos;t tell them what happened next, and complaints often get closed without any work being done.</p>
            <div className={s.stat}><b>2.1★</b><span>Namma Bengaluru (Sahaaya 2.0) on Google Play</span></div>
            <h3>What the news says</h3>
            <div className={s.news}>
              {NEWS.map((n) => (
                <a key={n.src} href={n.url} target="_blank" rel="noreferrer" className={s.newsCard}>
                  <p>&quot;{n.quote}&quot;</p><span>{n.src} ↗</span>
                </a>
              ))}
            </div>
            <h3>What people say on the Play Store</h3>
            <div className={s.reviewShots}>
              {REVIEWS.map((r) => (
                <figure key={r.name} className={s.reviewShot}>
                  <img src={r.img} alt={`1-star Google Play review by ${r.name}: ${r.text}`} loading="lazy" />
                </figure>
              ))}
            </div>
            <p className={s.caption}>1-star reviews from the Namma Bengaluru (Sahaaya 2.0) listing on Google Play, June to September 2026.</p>
            <h3>Where Nodi fits</h3>
            <p>Nodi does not replace Sahaaya. Every report still lands in the official system. Nodi adds what Sahaaya is missing: a fast way to report, a clear view of progress, and proof that work actually happened.</p>
            <div className={s.callout}>
              <b>So, the brief for Nodi:</b> make reporting take seconds, show every step of the fix, and only close a complaint when the person who reported it says it&apos;s done.
            </div>
          </section>

          <section id="assumptions" className={s.section}>
            <h2 className={s.chapter}>Assumptions</h2>
            <ul className={s.list}>
              <li><b>Who it&apos;s for.</b> Bengaluru residents aged 18 to 60 who use a smartphone, including people who aren&apos;t comfortable with apps.</li>
              <li><b>Where it runs.</b> A mobile app, so accessibility is built in from day one: light and dark mode, Kannada, and bigger text.</li>
              <li><b>Who sends the letters.</b> A small Nodi team on the backend writes a formal letter to GBA for every report, on behalf of the resident. I haven&apos;t designed the letter process in detail yet.</li>
              <li><b>How GBA&apos;s work shows up.</b> An AI agent watches GBA&apos;s Twitter account and matches their posts to open complaints.</li>
              <li><b>No cross-selling.</b> Nodi is only for civic complaints. It does not promote Namma Yatri rides.</li>
            </ul>
          </section>

          <section id="report" className={s.section}>
            <h2 className={s.chapter}>How Nodi works</h2>
            <div className={s.split}>
              <div>
                <h3>1. The home screen is the camera</h3>
                <p>The top of the home screen looks like a camera viewfinder. The prompt changes letter by letter, from &quot;See a problem on the road?&quot; to streetlights, water and footpaths, and the photo behind it changes with it. So people know what counts as a problem before they tap.</p>
                <p>Tap anywhere on it and the camera opens. The yellow shutter is the only yellow on the page, so it&apos;s clear what to press.</p>
                <p>Nodi fills in the rest: the type of problem, the exact location and the ward. You can add more photos or videos with the + button, and write or speak a note in any language.</p>
                <p>When you send it, the Nodi team writes a formal letter to the ward office on your behalf. You can open and read the letter from the app.</p>
              </div>
              <PhoneClip flow="report" caption="Reporting a water leak, from the camera to the formal letter." />
            </div>
          </section>

          <section id="progress" className={s.section}>
            <div className={s.split}>
              <div>
                <h3>2. See exactly where your complaint is</h3>
                <p>Tap any report to see its progress. Scroll down and it&apos;s all there: the current step, the engineer assigned, a timeline of what happened, and the photos and videos you sent.</p>
                <p>When GBA posts about the work on Twitter, the post shows up right inside the complaint. You can read it in the app, or open it on Twitter and reply to GBA yourself.</p>
                <p>Only you can close a complaint. If it isn&apos;t really fixed, you tap No and it goes back to GBA with a new deadline.</p>
              </div>
              <PhoneClip flow="track" caption="Before and after, GBA's post, the timeline and the video." />
            </div>
            <h3>How GBA&apos;s posts get matched</h3>
            <p>An AI agent reads every post from GBA&apos;s Twitter account. It checks three things: where the work happened, what kind of work it was, and when. If a post matches an open complaint nearby, Nodi adds it to that complaint&apos;s timeline and asks the reporter to confirm.</p>
            <div className={s.flow}>
              <span>GBA posts on Twitter</span><i>→</i><span>AI agent reads place, type and time</span><i>→</i><span>Matches an open complaint</span><i>→</i><span>Resident confirms it&apos;s fixed</span>
            </div>
          </section>

          <section id="trust" className={s.section}>
            <h2 className={s.chapter}>Building trust</h2>
            <p>People have been let down by complaint apps before, so every part of Nodi tries to show that someone is actually working on it.</p>
            <ul className={s.list}>
              <li><b>A formal letter for every report.</b> It turns a tap into an official record with a reference number.</li>
              <li><b>GBA&apos;s own posts as proof.</b> The work is shown the way GBA announced it, not the way we describe it.</li>
              <li><b>Only the resident closes a complaint.</b> This fixes the biggest complaint about Sahaaya.</li>
              <li><b>A running count on the home screen.</b> &quot;Since launch in 2026, 21,780 potholes filled&quot;, cycling through streetlights, garbage and water leaks. These numbers are placeholders for the prototype. They&apos;re a hypothesis that visible results bring people back.</li>
            </ul>
          </section>

          <section id="nearby" className={s.section}>
            <div className={s.split}>
              <div>
                <h3>3. Nearby: see what your neighbours reported</h3>
                <p>Nearby shows every issue reported around you on a live map, with the reporter&apos;s photo on each pin. Tap one to see what it is and what GBA has done about it so far.</p>
                <p>The Official updates tab shows only GBA&apos;s posts. Seeing residents report and GBA respond side by side gives people confidence that the app works.</p>
                <p>Nearby is read-only. It&apos;s there to build confidence, so there&apos;s nothing to act on.</p>
              </div>
              <PhoneClip flow="nearby" caption="The map, an incident, the reported list and GBA's updates." />
            </div>
          </section>

          <section id="accessibility" className={s.section}>
            <div className={s.split}>
              <div>
                <h2 className={s.chapter}>Accessibility</h2>
                <p>Everything lives behind your profile photo on the home screen.</p>
                <ul className={s.list}>
                  <li><b>Kannada</b> across the app, set in Anek Kannada.</li>
                  <li><b>Light and dark mode.</b></li>
                  <li><b>Bigger text</b> for older residents.</li>
                  <li><b>Read aloud</b> for complaint updates, and <b>reduce motion</b>.</li>
                </ul>
              </div>
              <PhoneClip flow="a11y" caption="Light mode, bigger text and Kannada." />
            </div>
          </section>

          <section id="metrics" className={s.section}>
            <h2 className={s.chapter}>How I&apos;d measure success</h2>
            <div className={s.metrics}>
              <div className={s.metric}><span>Engagement</span><b>Complaints per active user</b><p>If people keep reporting, they trust that it works. That is the biggest win.</p></div>
              <div className={s.metric}><span>Outcome</span><b>Resolutions completed through Nodi</b><p>The share of complaints that the resident confirms are fixed.</p></div>
              <div className={s.metric}><span>Business KPI</span><b>Bengaluru&apos;s standing as a smart city</b><p>Faster, visible fixes should help Bengaluru&apos;s reputation as a smart city, which is what the city has always wanted.</p></div>
            </div>
          </section>

          <div className={s.end}>
            <p>Try it yourself.</p>
            <a className={s.cta} href={PROTOTYPE} target="_blank" rel="noreferrer">Open the prototype ↗</a>
          </div>
        </article>
        <div />
      </div>
    </div>
  );
}
