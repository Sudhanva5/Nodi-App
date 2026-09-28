import Link from "next/link";
import type { ReactNode } from "react";
import s from "./case-study.module.css";
import { NOTES } from "@/lib/notes";

const SCREEN_ORDER = ["home", "capture", "confirm", "sending", "success", "detail", "nearby"] as const;

export const metadata = {
  title: "Nodi case study | Namma Yatri design assignment",
  description:
    "Frictionless civic complaint reporting and tracking for Bengaluru.",
};

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={s.src}>
      {children}
    </a>
  );
}

const research: { title: string; body: ReactNode }[] = [
  {
    title: "Complaints get closed without being fixed",
    body: (
      <>
        The Times of India reported that BBMP Sahaaya 2.0 marks complaints as
        resolved without action (
        <A href="https://timesofindia.indiatimes.com/articleshow/115392024.cms">
          TOI, Nov 2024
        </A>
        ). An earlier snapshot counted about 1.7 lakh complaints with about
        5,900 still unresolved (
        <A href="https://timesofindia.indiatimes.com/articleshow/87321254.cms">
          TOI
        </A>
        ).
      </>
    ),
  },
  {
    title: "Escalation is noise to citizens",
    body: (
      <>
        One r/bangalore thread describes 23 days and six escalation SMSes with
        nothing fixed (
        <A href="https://www.reddit.com/r/bangalore/comments/rvouyn/">Reddit</A>
        ). Another person raised about 50 pothole complaints in a year and says
        most were resolved (
        <A href="https://www.reddit.com/r/bangalore/comments/1h3y0a8/">
          Reddit
        </A>
        ). Persistence works. The system hides that from you.
      </>
    ),
  },
  {
    title: "The current app is hard to use",
    body: (
      <>
        Namma Bengaluru, which now hosts Sahaaya, sits at 2.0 stars. The top
        complaint is that there is no back button (
        <A href="https://apps.apple.com/in/app/namma-bengaluru/id6755224744">
          App Store
        </A>
        ).
      </>
    ),
  },
  {
    title: "The authority changed, the name didn't",
    body: (
      <>
        BBMP was dissolved and the Greater Bengaluru Authority with five city
        corporations took over from September 2025 (
        <A href="https://www.thehindu.com/news/cities/bangalore/more-wards-same-workforce-gba-corporations-struggle-to-deliver-on-the-ground">
          The Hindu
        </A>
        ). People still say BBMP, so Nodi accepts both.
      </>
    ),
  },
  {
    title: "Officials already post proof on X",
    body: (
      <>
        <A href="https://x.com/GBA_office">@GBA_office</A> posts photos of
        pothole repair work. Citizens also call out staged photos (
        <A href="https://x.com/ChristinMP_/status/1851480269359923241">
          example
        </A>
        ), so X proof helps but can't be the only proof.
      </>
    ),
  },
  {
    title: "Elders need voice, big type and fewer choices",
    body: (
      <>
        Research on older adults points to voice, text-to-speech and task
        simplification (
        <A href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12350549">PMC</A>).
        Low-literacy, multilingual users lean on familiar multimodal
        interfaces like WhatsApp (
        <A href="https://dl.acm.org/doi/10.1145/3663547.3746389">
          ACM SIGACCESS 2024
        </A>
        ).
      </>
    ),
  },
  {
    title: "Namma Yatri has a reason to build this",
    body: (
      <>
        Zero-commission, open source, open data (
        <A href="https://nammayatri.in/open">nammayatri.in/open</A>), built on
        ONDC and Beckn. Roughly 7.7 lakh drivers spend all day on the roads
        Nodi is about (<A href="https://nammayatri.in">nammayatri.in</A>).
      </>
    ),
  },
];

const personas = [
  {
    name: "Priya, 29",
    role: "Commuter, Koramangala",
    situation: "Sees a pothole on the way to work and has about 20 seconds.",
    need: "No forms. Snap, send, get back to her day.",
    primary: true,
  },
  {
    name: "Ramesh, 68",
    role: "Retired, Jayanagar",
    situation:
      "Kannada-first, uses WhatsApp and UPI, reads with glasses, dislikes typing.",
    need: "To speak instead of type, see big text, and know a real person got it.",
    primary: true,
  },
  {
    name: "Manjunath, 41",
    role: "Namma Yatri auto driver (future)",
    situation: "Hits the same potholes every day.",
    need: "One tap from the driver app, without stopping the ride.",
    primary: false,
  },
  {
    name: "Assistant Engineer",
    role: "GBA ward office (secondary)",
    situation: "Receives complaints from many channels.",
    need: "Clean, geo-tagged tickets with photos and videos.",
    primary: false,
  },
];

const tradeoffs = [
  [
    "No Sahaaya API on day one.",
    "Nodi ops emails a formal letter and logs the ticket on Sahaaya or 1533 by hand. Costs money, avoids waiting on government IT.",
    "Start with one city corporation, push for an API or MoU once volume makes the case.",
  ],
  [
    "User is signed in through Namma Yatri, so no login wall.",
    "Easier reporting means more spam risk.",
    "Phone-linked accounts, EXIF and GPS checks, rate limits.",
  ],
  [
    "AI can guess the category from the photo.",
    "It will sometimes guess wrong.",
    "The guess is an editable chip, never a blocker. Track edit rate.",
  ],
  [
    "Reports appear on a public map.",
    "Privacy concerns.",
    "Anonymous by default. Faces and plates blurred automatically.",
  ],
  [
    "Officials post work updates on X.",
    "Scraping X is brittle and breaks its terms at scale.",
    "Official API or partner feed, with a person verifying each match. X is proof, not the source of truth.",
  ],
  [
    "One confirm sheet instead of a multi-step form.",
    "Less room for detail up front.",
    "Smart defaults, plus extra photos, videos and an optional note that can be typed or spoken.",
  ],
];

const decisions = [
  [
    "Camera first, questions later.",
    "Seeing the problem is the moment of motivation. Every screen before the camera is a place to drop off, and the photo answers most of what a form would ask.",
  ],
  [
    "One confirm sheet, not a wizard.",
    "A four-step form feels like paperwork. One sheet with smart defaults makes the usual path snap, glance, send.",
  ],
  [
    "The category is a guess shown as a chip.",
    "People don't think in department names. If the AI is wrong, one tap fixes it instead of blocking the report.",
  ],
  [
    "More evidence is one tap away.",
    "A + tile under the first photo adds other angles or a short video, and Additional details takes a typed or spoken note. The engineer knows what they're walking into before the site visit.",
  ],
  [
    "Tracking looks like a delivery tracker.",
    "Everyone in Bengaluru already reads a Swiggy or Namma Yatri tracker. Five stages in plain words are readable from across a room.",
  ],
  [
    "Only the citizen can close a complaint.",
    "Fake closures are the main reason people stop trusting Sahaaya. Moving the close button to the reporter changes the incentive.",
  ],
  [
    "A formal letter goes out with every complaint.",
    "A named letter to a named engineer, with a date, is something a ward office has to answer, and something the citizen can point at.",
  ],
  [
    "Official proof is labelled with its source.",
    "GBA's own post appears as a Twitter-identical embed, with the real GBA logo and an Open on Twitter link. A post you can check is stronger than a status change, and it stays on the complaint even after a reopen.",
  ],
  [
    "One dark system, with a light mode.",
    "Near-black surfaces and a single yellow accent keep the app calm, and photo pins stand out on the dark map. Anyone who reads better on white can switch to light mode in Profile.",
  ],
  [
    "Nearby is read-only and shows both sides.",
    "Reported lists what residents have raised, and Official updates shows only GBA's own posts. Seeing both next to each other is the point. There's nothing to tap except to read, so it can't turn into a complaints forum.",
  ],
];

const trust = [
  [
    "Powered-by loader",
    "On Send you see who carries the complaint: Namma Yatri, then GBA Ward 151, with the real GBA logo. A name instead of a spinner.",
  ],
  [
    "Formal letter",
    "A PDF letter to the ward's Assistant Engineer, plus a Sahaaya or 1533 ticket. Openable from the timeline.",
  ],
  [
    "Verified badges",
    "Official accounts and engineers get a check. Tap it to see what verified means and who checked it.",
  ],
  [
    "GBA's post on Twitter",
    "When @GBA_office posts about that spot, the post shows up on the complaint exactly as it looks on Twitter, with Open on Twitter underneath.",
  ],
  [
    "Citizen-only closure",
    "Nothing is Fixed until the reporter says so. If they say it isn't, the complaint reopens and goes back to GBA with a new deadline.",
  ],
  [
    "Named people and dates",
    "Every stage shows an owner and an expected date. Pothole 3 days, garbage 1, streetlight 2, water leak 1.",
  ],
];

const elders = [
  ["Aa", "Bigger text in Profile, under Accessibility. One switch scales the whole app."],
  ["Mic", "Additional details can be spoken instead of typed. Hold the mic and Nodi types it out."],
  ["Listen", "Every status update can be read aloud, or read automatically when a complaint opens."],
  ["ಕ / EN", "Kannada or English in Profile. Kannada is set in Anek Kannada so it stays easy to read."],
  ["1", "One obvious primary action per screen. Secondary options are text links."],
  ["44pt", "Touch targets of 44pt or more, per Apple's HIG. Main buttons are much larger."],
  ["WhatsApp", "Updates arrive where elders already read messages."],
  ["Motion", "Reduce motion in Profile stops the flipping text and animations."],
];

const roadmap: { label: string; tone: string; items: string[] }[] = [
  {
    label: "Now (MVP)",
    tone: s.now,
    items: [
      "Camera-first report: photo or video",
      "Extra photos and videos, plus a typed or spoken note",
      "AI category guess and GPS-to-ward routing",
      "Five-stage tracker with owners and dates",
      "Automatic formal letter to ward engineer",
      "WhatsApp and push updates",
      "Citizen confirm, reopen sends it back to GBA",
      "Nearby map of reported incidents and GBA posts",
      "Kannada and English, bigger text, read aloud, light and dark",
      "Verified badges, GBA posts matched by ops",
    ],
  },
  {
    label: "Next",
    tone: s.next,
    items: [
      "GBA officer console for ward engineers",
      "Automatic Sahaaya and X API sync",
      "Duplicate detection, so one pothole is one ticket",
      "Alerts for new reports in your ward",
      "Offline queue for poor network",
    ],
  },
  {
    label: "Later",
    tone: s.later,
    items: [
      "Driver one-tap pothole reports, then accelerometer detection",
      "WhatsApp bot and IVR for feature phones",
      "RTI letter generator for stalled complaints",
      "Routing to BESCOM and BWSSB",
      "Public open-data API",
    ],
  },
];

const metricGroups: { title: string; items: [string, string][] }[] = [
  {
    title: "Reporting funnel",
    items: [
      ["Camera opened to submitted", "80%+"],
      ["Median time, Report to Send", "< 30 s"],
      ["AI category accepted as is", "85%+"],
      ["60+ completion vs under 40", "Parity"],
    ],
  },
  {
    title: "Outcomes",
    items: [
      ["Fixed within SLA", "Share"],
      ["Median days to fix", "By category"],
      ["Reopen rate", "Visible, then down"],
      ["Closures with official proof", "70%+"],
      ["Rating after fix", "CSAT"],
    ],
  },
  {
    title: "Trust and engagement",
    items: [
      ["Reports with extra photos or videos", "Share"],
      ["Second report within 60 days", "Share"],
      ["WhatsApp update open rate", "Share"],
    ],
  },
  {
    title: "Business, for Namma Yatri",
    items: [
      ["Nodi users opening Namma Yatri", "Cross-sell"],
      ["Brand trust in Bengaluru", "NPS"],
      ["Cost per complaint vs a 1533 call", "Lower"],
      ["GBA MoU and open-data dashboard", "Signed"],
      ["Pothole data in ETA and routing", "Adopted"],
    ],
  },
  {
    title: "Guardrails",
    items: [
      ["Spam or false reports", "Low"],
      ["Duplicates that slip through", "Low"],
      ["Privacy incidents", "Zero"],
      ["Authority SLA breach rate", "Watch"],
    ],
  },
];

const risks = [
  [
    "Will GBA engage?",
    "Without a partner inside the authority, Nodi is a polite complaint forwarder. A pilot MoU with one city corporation would change a lot.",
  ],
  [
    "Ops cost of the bridge",
    "Manual logging and X matching doesn't scale forever. I need to know how many reports one ops person handles per day.",
  ],
  [
    "Staged proof",
    "Citizen confirmation covers it, but saying \"not fixed\" has to feel calm, not like a fight with the government.",
  ],
  [
    "Mixed-language spoken notes",
    "Kannada, English and Hindi in one sentence is hard to transcribe. Engineers may need the audio as well as the text.",
  ],
  [
    "Reporters who never come back",
    "Only the reporter can close a complaint, so some will sit at Work done forever. I'd test a reminder first, then a neutral close with the proof attached.",
  ],
];

type FlowNode = { t: string; d?: string; kind?: "start" | "auto" | "decision" | "good" | "bad" };

function Node({ n }: { n: FlowNode }) {
  const cls =
    n.kind === "start"
      ? s.nStart
      : n.kind === "auto"
      ? s.nAuto
      : n.kind === "decision"
      ? s.nDecision
      : n.kind === "good"
      ? s.nGood
      : n.kind === "bad"
      ? s.nBad
      : "";
  return (
    <div className={`${s.node} ${cls}`}>
      <strong>{n.t}</strong>
      {n.d ? <span>{n.d}</span> : null}
    </div>
  );
}

function Down({ label }: { label?: string }) {
  return (
    <div className={s.down} aria-hidden="true">
      {label ? <em>{label}</em> : null}
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className={s.flow} role="img" aria-label="Nodi core user flow diagram">
      <div className={s.lane}>
        <div className={s.laneLabel}>Report, about 20 seconds</div>
        <Node n={{ t: "Home", d: "Big yellow Report a problem", kind: "start" }} />
        <Down label="tap" />
        <Node n={{ t: "Camera", d: "Photo or video" }} />
        <Down label="snap" />
        <div className={s.row3}>
          <Node n={{ t: "Category guess", d: "Pothole, looks large", kind: "auto" }} />
          <Node n={{ t: "GPS to ward", d: "5th Cross, Ward 151", kind: "auto" }} />
          <Node n={{ t: "Extra evidence", d: "+ photos, videos, a note" }} />
        </div>
        <Down />
        <Node n={{ t: "One confirm page", d: "Category, location, extras" }} />
        <Down label="send" />
        <Node n={{ t: "Powered-by loader", d: "Namma Yatri, delivered to GBA Ward 151" }} />
        <Down />
        <Node n={{ t: "Sent", d: "NODI-24611, letter sent, expected date", kind: "good" }} />
      </div>

      <div className={s.lane}>
        <div className={s.laneLabel}>Track, days</div>
        <ol className={s.stages}>
          <li><b>1</b>Reported</li>
          <li><b>2</b>Letter sent</li>
          <li><b>3</b>Assigned</li>
          <li><b>4</b>Work done</li>
          <li><b>5</b>You confirm</li>
        </ol>
        <Down />
        <Node n={{ t: "Is it actually fixed?", d: "After photo + GBA post on Twitter", kind: "decision" }} />
        <div className={s.branch}>
          <div className={s.branchCol}>
            <Down label="yes" />
            <Node n={{ t: "Fixed", d: "Closed by the citizen", kind: "good" }} />
            <p className={s.branchNote}>
              Only the reporter can close it.
            </p>
          </div>
          <div className={s.branchCol}>
            <Down label="no" />
            <Node n={{ t: "Reopen", kind: "bad" }} />
            <Down />
            <Node n={{ t: "Back to GBA", d: "New deadline, same timeline", kind: "bad" }} />
            <div className={s.loop}>Back to Assigned</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  return (
    <main className={s.page}>
      <nav className={s.topnav}>
        <Link href="/" className={s.back}>
          Open the prototype
        </Link>
        <span className={s.navMeta}>Namma Yatri, Design Assignment (A)</span>
      </nav>

      <header className={s.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.png" alt="Nodi logo" className={s.logo} />
        <p className={s.kicker}>Case study</p>
        <h1 className={s.h1}>
          Nodi <span className={s.kn}>ನೋಡಿ</span>
        </h1>
        <p className={s.tagline}>Snap it. Send it. See it fixed.</p>
        <p className={s.lede}>
          Nodi, Kannada for &quot;look&quot;, is a Namma Yatri app for reporting
          a broken civic thing the moment you see it and watching it get fixed.
          You look, you snap, and the city has to look too. Reporting is one
          photo plus one confirm sheet. Tracking works like a delivery tracker.
          And only the citizen can mark a complaint as fixed.
        </p>
      </header>

      <section className={s.section}>
        <h2 className={s.h2}>The problem, and what research told me</h2>
        <p>
          The brief says civic apps are slow, confusing and opaque. Research on
          Bengaluru points at one failure bigger than the rest: people stop
          believing the status.
        </p>
        <div className={s.researchGrid}>
          {research.map((r) => (
            <div key={r.title} className={s.researchCard}>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Who it&apos;s for</h2>
        <p className={s.muted}>
          Proto-personas built from the research. I&apos;d validate them in the
          first round of testing.
        </p>
        <div className={s.personaGrid}>
          {personas.map((p) => (
            <div
              key={p.name}
              className={`${s.persona} ${p.primary ? s.personaPrimary : ""}`}
            >
              <div className={s.personaHead}>
                <span className={s.avatar}>{p.name.charAt(0)}</span>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.role}</span>
                </div>
              </div>
              <p>{p.situation}</p>
              <p className={s.need}>{p.need}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Assumptions and trade-offs</h2>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Assumption</th>
                <th>Trade-off accepted</th>
                <th>How I&apos;d reduce the risk</th>
              </tr>
            </thead>
            <tbody>
              {tradeoffs.map((r) => (
                <tr key={r[0]}>
                  <td>{r[0]}</td>
                  <td>{r[1]}</td>
                  <td>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Core user flow</h2>
        <p>
          Snap on Home, one confirm sheet, send. Tracking runs through five
          plain-language stages, and the citizen has the last word.
        </p>
        <FlowDiagram />
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Screen by screen</h2>
        <p>
          What each screen in the prototype is doing, and why. The prototype
          runs in dark and light mode; the reasons are the same in both.
        </p>
        <ol className={s.screens}>
          {SCREEN_ORDER.map((k) => {
            const n = NOTES[k];
            return (
              <li key={k} className={s.screen}>
                <div className={s.screenHead}>
                  <span className={s.screenNum}>{n.n}</span>
                  <h3>{n.title}</h3>
                </div>
                <ul>
                  {n.why.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Key design decisions</h2>
        <ol className={s.decisions}>
          {decisions.map((d, i) => (
            <li key={d[0]}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{d[0]}</strong>
                <p>{d[1]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${s.section} ${s.dark}`}>
        <h2 className={s.h2}>Trust system</h2>
        <p>
          Each piece answers one question: did anyone actually do anything?
        </p>
        <div className={s.trustGrid}>
          {trust.map((t) => (
            <div key={t[0]} className={s.trustCard}>
              <strong>{t[0]}</strong>
              <p>{t[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Designing for elders</h2>
        <p>
          Ramesh is the person I designed for. If he can do it, Priya can do it
          faster.
        </p>
        <ul className={s.elderList}>
          {elders.map((e) => (
            <li key={e[0]}>
              <span className={s.chip}>{e[0]}</span>
              <span>{e[1]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>MVP and future</h2>
        <div className={s.roadmap}>
          {roadmap.map((c) => (
            <div key={c.label} className={`${s.roadCol} ${c.tone}`}>
              <h3>{c.label}</h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>How I&apos;d measure success</h2>
        <div className={s.northStar}>
          <span className={s.nsLabel}>North star</span>
          <strong>Citizen-verified resolutions per week</strong>
          <p>
            It only moves when a problem is reported, routed, fixed and
            confirmed by the person who saw it, so no single team can game it.
          </p>
        </div>
        <p className={s.muted}>
          Targets are starting goals for a pilot, not measured numbers. I&apos;d
          reset them after the first month of real data.
        </p>
        <div className={s.metricGrid}>
          {metricGroups.map((g) => (
            <div key={g.title} className={s.metricCard}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((m) => (
                  <li key={m[0]}>
                    <span>{m[0]}</span>
                    <b>{m[1]}</b>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Risks and open questions</h2>
        <dl className={s.risks}>
          {risks.map((r) => (
            <div key={r[0]}>
              <dt>{r[0]}</dt>
              <dd>{r[1]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>What I&apos;d test first</h2>
        <p>
          A moderated round with 10 people in Bengaluru: 5 aged 60 or older (at
          least 3 who prefer Kannada) and 5 commuters under 40. On a phone,
          outdoors where possible, because that&apos;s where reports happen.
        </p>
        <ol className={s.tasks}>
          <li>Report the pothole in this photo. Time to Send, hesitations, trust in the category guess.</li>
          <li>You already reported this. What&apos;s happening? Can they name the stage and the owner?</li>
          <li>The city says it&apos;s fixed, but it isn&apos;t. Do they find &quot;No, not fixed&quot; and understand what follows?</li>
          <li>Elders only: the same report without typing, using bigger text and the mic.</li>
        </ol>
        <div className={s.bar}>
          <strong>Success bar for round one</strong>
          <p>
            At least 8 of 10 people report the pothole without help, and elders
            finish at close to the commuter rate. If elders fall behind, spoken
            notes and bigger text move ahead of everything else on the roadmap.
          </p>
        </div>
      </section>

      <footer className={s.footer}>
        <Link href="/" className={s.cta}>
          Try the prototype
        </Link>
        <span>Nodi is a concept for the Namma Yatri design assignment.</span>
      </footer>
    </main>
  );
}
