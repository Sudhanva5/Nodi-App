export type Category = "pothole" | "garbage" | "streetlight" | "water" | "drain" | "tree" | "footpath" | "other";

export const CATEGORIES: Record<Category, { label: string; kn: string; color: string; sla: number }> = {
  pothole: { label: "Pothole", kn: "ರಸ್ತೆ ಗುಂಡಿ", color: "#FF9F0A", sla: 3 },
  garbage: { label: "Garbage", kn: "ಕಸ", color: "#30D158", sla: 1 },
  streetlight: { label: "Streetlight", kn: "ಬೀದಿ ದೀಪ", color: "#FFD60A", sla: 2 },
  water: { label: "Water leak", kn: "ನೀರು ಸೋರಿಕೆ", color: "#64D2FF", sla: 1 },
  drain: { label: "Blocked drain", kn: "ಚರಂಡಿ", color: "#BF5AF2", sla: 2 },
  tree: { label: "Fallen tree", kn: "ಬಿದ್ದ ಮರ", color: "#34C759", sla: 1 },
  footpath: { label: "Broken footpath", kn: "ಹಾಳಾದ ಫುಟ್‌ಪಾತ್", color: "#FF9F0A", sla: 5 },
  other: { label: "Something else", kn: "ಬೇರೆ", color: "#8E8E93", sla: 3 },
};

// 0 Reported, 1 Letter sent, 2 Assigned, 3 Work done, 4 Fixed (citizen confirmed)
export const STAGES = [
  { en: "Reported", kn: "ದಾಖಲಾಗಿದೆ" },
  { en: "Letter sent", kn: "ಪತ್ರ ಕಳುಹಿಸಲಾಗಿದೆ" },
  { en: "Assigned", kn: "ನಿಯೋಜಿಸಲಾಗಿದೆ" },
  { en: "Work done", kn: "ಕೆಲಸ ಮುಗಿದಿದೆ" },
  { en: "Fixed", kn: "ಸರಿಯಾಗಿದೆ" },
];

export type TimelineItem = {
  when: string;
  title: string;
  body?: string;
  kind: "you" | "letter" | "assigned" | "proof" | "fixed" | "reopen" | "neighbours";
  thumb?: string;
  media?: { type: "photo" | "video" | "voice"; src?: string; dur?: string }[];
  avatars?: number;
  org?: boolean;
};

export type Report = {
  id: string;
  cat: Category;
  title: string;
  place: string;
  ward: string;
  photo: string;
  after?: string;
  stage: number;
  reopened?: boolean;
  statusLine: string;
  expected: string;
  reportedAgo: string;
  meToo: number;
  engineer?: string;
  timeline: TimelineItem[];
};

export const INITIAL_REPORTS: Report[] = [
  {
    id: "NODI-24519",
    cat: "pothole",
    title: "Pothole on 5th Cross",
    place: "5th Cross, Koramangala 8th Block",
    ward: "Ward 151 · Koramangala",
    photo: "/img/pothole.jpg",
    after: "/img/fixed.jpg",
    stage: 3,
    statusLine: "",
    expected: "Sat, 26 Sep",
    reportedAgo: "3 days ago",
    meToo: 14,
    engineer: "S. Nagaraj, Asst. Engineer",
    timeline: [
      { when: "Today · 11:42am", kind: "proof", title: "Work done", body: "GBA posted on Twitter that the pothole has been filled. We matched the post to your report by its location.", thumb: "/img/fixed.jpg" },
      { when: "Fri, 25 Sep · 4:10pm", kind: "assigned", title: "Assigned", body: "S. Nagaraj, Assistant Engineer for Ward 151, was asked to fix it by Sat, 26 Sep." },
      { when: "Thu, 24 Sep · 9:05am", kind: "letter", title: "Letter sent", body: "A formal letter went to the Ward 151 office and was logged on Sahaaya." },
      { when: "Thu, 24 Sep · 8:51am", kind: "you", title: "Reported", body: "You reported a pothole at 5th Cross, Koramangala 8th Block.", media: [{ type: "photo", src: "/img/pothole.jpg" }, { type: "video", src: "/img/pothole.jpg", dur: "0:12" }] },
    ],
  },
  {
    id: "NODI-24388",
    cat: "streetlight",
    title: "Streetlight not working",
    place: "17th Main, Koramangala 6th Block",
    ward: "Ward 151 · Koramangala",
    photo: "/img/streetlight.jpg",
    stage: 2,
    statusLine: "An engineer has it. Expected fix by Monday.",
    expected: "Mon, 28 Sep",
    reportedAgo: "2 days ago",
    meToo: 6,
    engineer: "R. Kavitha, Electrical AE",
    timeline: [
      { when: "Sat, 26 Sep · 10:20am", kind: "assigned", title: "Assigned", body: "R. Kavitha, Electrical Assistant Engineer for Ward 151, was asked to fix it by Mon, 28 Sep." },
      { when: "Fri, 25 Sep · 7:40pm", kind: "letter", title: "Letter sent", body: "A formal letter went to the Ward 151 electrical section." },
      { when: "Fri, 25 Sep · 7:31pm", kind: "you", title: "Reported", body: "You reported a streetlight that isn't working on 17th Main, Koramangala 6th Block.", media: [{ type: "photo", src: "/img/streetlight.jpg" }] },
    ],
  },
  {
    id: "NODI-24102",
    cat: "garbage",
    title: "Garbage dump at corner",
    place: "1st Cross, Koramangala 6th Block",
    ward: "Ward 151 · Koramangala",
    photo: "/img/garbage.jpg",
    stage: 4,
    statusLine: "",
    expected: "Sun, 20 Sep",
    reportedAgo: "8 days ago",
    meToo: 22,
    engineer: "SWM team, Ward 151",
    timeline: [
      { when: "Mon, 21 Sep · 8:02am", kind: "fixed", title: "Fixed", body: "You confirmed the spot is clean, so the complaint is closed." },
      { when: "Sun, 20 Sep · 6:15pm", kind: "proof", title: "Work done", body: "The Solid Waste team for Ward 151 cleared the garbage and shared a photo." },
      { when: "Sat, 19 Sep · 7:00pm", kind: "letter", title: "Letter sent", body: "A formal letter went to the Ward 151 office." },
      { when: "Sat, 19 Sep · 6:48pm", kind: "you", title: "Reported", body: "You reported a garbage dump at 1st Cross, Koramangala 6th Block.", media: [{ type: "photo", src: "/img/garbage.jpg" }, { type: "video", src: "/img/garbage.jpg", dur: "0:08" }] },
    ],
  },
];

export type NearbyIssue = {
  id: string;
  cat: Category;
  title: string;
  desc: string;
  place: string;
  dist: string;
  stage: number;
  photo: string;
  lat: number;
  lng: number;
  ago: string;
  pin: "photo" | "icon";
  due?: string;
};

export const NEARBY: NearbyIssue[] = [
  { id: "n1", pin: "photo", cat: "pothole", title: "Cluster of potholes at the junction", desc: "Large potholes across two lanes near the signal.", place: "Sony World Junction", dist: "350 m", stage: 2, photo: "/img/pothole2.jpg", lat: 12.9372, lng: 77.6268, ago: "2h", due: "Tue, 29 Sep" },
  { id: "n2", pin: "photo", cat: "water", title: "Pipe burst on the footpath", desc: "Water has been flowing since morning.", place: "80 Feet Road", dist: "120 m", stage: 0, photo: "/img/water.jpg", lat: 12.9349, lng: 77.6232, ago: "25m" },
  { id: "n3", pin: "photo", cat: "garbage", title: "Garbage dump cleared", desc: "The corner was cleaned by the waste team.", place: "1st Cross, 6th Block", dist: "600 m", stage: 4, photo: "/img/cleared.jpg", lat: 12.9395, lng: 77.6209, ago: "8d" },
  { id: "n4", pin: "photo", cat: "streetlight", title: "Two streetlights out", desc: "The stretch goes dark after 7 pm.", place: "17th Main, 6th Block", dist: "450 m", stage: 2, photo: "/img/streetlight.jpg", lat: 12.9381, lng: 77.6178, ago: "2d", due: "Mon, 28 Sep" },
  { id: "n5", pin: "photo", cat: "tree", title: "Fallen tree blocking the road", desc: "Half the road is blocked after last night's rain.", place: "4th Block, 2nd Cross", dist: "900 m", stage: 3, photo: "/img/tree.jpg", lat: 12.9318, lng: 77.6159, ago: "5h" },
  { id: "n6", pin: "photo", cat: "drain", title: "Storm drain overflowing", desc: "Dirty water is spilling onto the road.", place: "Ejipura Main Rd", dist: "1.1 km", stage: 1, photo: "/img/drain.jpg", lat: 12.9403, lng: 77.6305, ago: "1d" },
  { id: "n7", pin: "photo", cat: "garbage", title: "Garbage piling up at the bus stop", desc: "Bags dumped along the wall for three days.", place: "Forum bus stop, Hosur Rd", dist: "1.3 km", stage: 2, photo: "/img/garbage2.jpg", lat: 12.9302, lng: 77.6286, ago: "3d", due: "Mon, 28 Sep" },
  { id: "n8", pin: "photo", cat: "footpath", title: "Broken footpath near the college", desc: "Missing slabs force people onto the road.", place: "Jyoti Nivas College Rd", dist: "800 m", stage: 1, photo: "/img/footpath.jpg", lat: 12.9336, lng: 77.6181, ago: "6h" },
  { id: "n9", pin: "photo", cat: "pothole", title: "Pothole near the school gate", desc: "Deep pothole right at the drop-off point.", place: "5th Block, 1st Main", dist: "700 m", stage: 1, photo: "/img/pothole.jpg", lat: 12.9342, lng: 77.6258, ago: "4h" },
  { id: "n12", pin: "photo", cat: "garbage", title: "Overflowing bin", desc: "The public bin has not been emptied.", place: "Near Koramangala Club", dist: "1.0 km", stage: 2, photo: "/img/garbage.jpg", lat: 12.9328, lng: 77.6297, ago: "1d", due: "Sun, 27 Sep" },
  { id: "n18", pin: "photo", cat: "pothole", title: "Potholes filled", desc: "The stretch was resurfaced this week.", place: "100 Feet Rd link", dist: "1.8 km", stage: 4, photo: "/img/fixed.jpg", lat: 12.9449, lng: 77.6322, ago: "5d" },
];

/** Informative log of what GBA has done, derived from the stage. */
export function gbaLog(i: NearbyIssue) {
  const log: { when: string; stage: string; text: string }[] = [
    { when: `${i.ago} ago`, stage: "Reported", text: "A resident reported this with photos and the exact location." },
  ];
  if (i.stage >= 1) log.push({ when: "Soon after", stage: "Letter sent", text: "A formal letter went to the Ward 151 office and was logged on Sahaaya." });
  if (i.stage >= 2) log.push({ when: "Next day", stage: "Assigned", text: `The ward engineer was assigned${i.due ? ` and asked to fix it by ${i.due}` : ""}.` });
  if (i.stage >= 3) log.push({ when: "Later", stage: "Work done", text: "GBA marked the work as done and shared a photo." });
  if (i.stage >= 4) log.push({ when: "Last", stage: "Fixed", text: "The resident who reported it confirmed it's fixed." });
  return log.reverse();
}

export const OFFICIAL_POSTS = [
  { id: "p1", handle: "@GBA_office", name: "Greater Bengaluru Authority", time: "11:42 AM · Sep 27, 2026", text: "Pothole filling works completed at 5th Cross, Koramangala 8th Block. Bengaluru South City Corporation. #PotholeFreeBengaluru", photo: "/img/fixed.jpg", likes: 212, matched: 1 },
  { id: "p2", handle: "@GBA_office", name: "Greater Bengaluru Authority", time: "7:10 AM · Sep 27, 2026", text: "Garbage black spots cleared across Ward 151 this morning. Please hand over waste only to the door-to-door collection vehicle. #CleanBengaluru", photo: "/img/cleared.jpg", likes: 148, matched: 3 },
  { id: "p3", handle: "@GBA_office", name: "Greater Bengaluru Authority", time: "6:05 PM · Sep 26, 2026", text: "Tree-fall teams are clearing roads in Koramangala and Ejipura after heavy rain. Report fallen trees on 1533. #BengaluruRains", photo: "", likes: 96, matched: 2 },
  { id: "p4", handle: "@GBA_office", name: "Greater Bengaluru Authority", time: "10:30 AM · Sep 26, 2026", text: "Streetlight repair drive underway in Bengaluru South City Corporation. 84 non-working lights fixed this week.", photo: "", likes: 131, matched: 4 },
];

export type Ward = { id: string; name: string; kn: string; corp: string; open: number };
export const WARDS: Ward[] = [
  { id: "151", name: "Koramangala", kn: "ಕೋರಮಂಗಲ", corp: "Bengaluru South City Corporation", open: 128 },
  { id: "jn", name: "Jayanagar", kn: "ಜಯನಗರ", corp: "Bengaluru South City Corporation", open: 94 },
  { id: "hsr", name: "HSR Layout", kn: "ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್", corp: "Bengaluru South City Corporation", open: 141 },
  { id: "in", name: "Indiranagar", kn: "ಇಂದಿರಾನಗರ", corp: "Bengaluru East City Corporation", open: 87 },
  { id: "wf", name: "Whitefield", kn: "ವೈಟ್‌ಫೀಲ್ಡ್", corp: "Bengaluru East City Corporation", open: 203 },
  { id: "ml", name: "Malleshwaram", kn: "ಮಲ್ಲೇಶ್ವರಂ", corp: "Bengaluru West City Corporation", open: 62 },
];
