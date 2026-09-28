export type Category = "pothole" | "garbage" | "streetlight" | "water" | "drain" | "tree" | "other";

export const CATEGORIES: Record<Category, { label: string; kn: string; color: string; sla: number }> = {
  pothole: { label: "Pothole", kn: "ರಸ್ತೆ ಗುಂಡಿ", color: "#FF9F0A", sla: 3 },
  garbage: { label: "Garbage", kn: "ಕಸ", color: "#30D158", sla: 1 },
  streetlight: { label: "Streetlight", kn: "ಬೀದಿ ದೀಪ", color: "#FFD60A", sla: 2 },
  water: { label: "Water leak", kn: "ನೀರು ಸೋರಿಕೆ", color: "#64D2FF", sla: 1 },
  drain: { label: "Blocked drain", kn: "ಚರಂಡಿ", color: "#BF5AF2", sla: 2 },
  tree: { label: "Fallen tree", kn: "ಬಿದ್ದ ಮರ", color: "#34C759", sla: 1 },
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
      { when: "Today, 11:42 AM", kind: "proof", title: "Work done", body: "GBA posted a photo of the finished repair on Twitter. We matched it to your complaint by location and time." },
      { when: "Fri, 25 Sep · 4:10 PM", kind: "assigned", title: "Assigned to S. Nagaraj", body: "Asst. Engineer, Ward 151. Expected fix by Sat, 26 Sep." },
      { when: "Thu, 24 Sep · 9:05 AM", kind: "letter", title: "Formal letter sent", body: "Emailed to the Ward 151 office and logged on Sahaaya. Ref GBA/W151/2026/4471." },
      { when: "Thu, 24 Sep · 8:52 AM", kind: "neighbours", title: "14 neighbours supported this", body: "The more people support a complaint, the higher it goes on the ward's list." },
      { when: "Thu, 24 Sep · 8:51 AM", kind: "you", title: "You reported this", body: "Photo and location sent." },
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
      { when: "Sat, 26 Sep · 10:20 AM", kind: "assigned", title: "Assigned to R. Kavitha", body: "Electrical Asst. Engineer, Ward 151. Expected fix by Mon, 28 Sep." },
      { when: "Fri, 25 Sep · 7:40 PM", kind: "letter", title: "Formal letter sent", body: "Emailed to the Ward 151 electrical section. Ref GBA/W151/2026/4502." },
      { when: "Fri, 25 Sep · 7:31 PM", kind: "you", title: "You reported this", body: "Photo and location sent." },
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
    statusLine: "You confirmed this is fixed. Cleared in 1 day.",
    expected: "Sun, 20 Sep",
    reportedAgo: "8 days ago",
    meToo: 22,
    engineer: "SWM team, Ward 151",
    timeline: [
      { when: "Mon, 21 Sep · 8:02 AM", kind: "fixed", title: "You confirmed it is fixed", body: "Closed. 22 neighbours were told." },
      { when: "Sun, 20 Sep · 6:15 PM", kind: "proof", title: "Work done", body: "Cleared by the Solid Waste team. Photo proof attached." },
      { when: "Sat, 19 Sep · 7:00 PM", kind: "letter", title: "Formal letter sent", body: "Ref GBA/W151/2026/4213." },
      { when: "Sat, 19 Sep · 6:48 PM", kind: "you", title: "You reported this", body: "Photo and location sent." },
    ],
  },
];

export type NearbyIssue = {
  id: string;
  cat: Category;
  title: string;
  place: string;
  dist: string;
  stage: number;
  meToo: number;
  photo: string;
  lat: number;
  lng: number;
  ago: string;
};

export const NEARBY: NearbyIssue[] = [
  { id: "n1", cat: "pothole", title: "Deep pothole at junction", place: "Sony World Junction", dist: "350 m", stage: 2, meToo: 38, photo: "/img/pothole.jpg", lat: 12.9372, lng: 77.6268, ago: "2h" },
  { id: "n2", cat: "water", title: "Pipe burst on footpath", place: "80 Feet Road", dist: "120 m", stage: 0, meToo: 3, photo: "/img/water.jpg", lat: 12.9349, lng: 77.6232, ago: "25m" },
  { id: "n3", cat: "garbage", title: "Garbage piling up", place: "1st Cross, 6th Block", dist: "600 m", stage: 4, meToo: 22, photo: "/img/garbage.jpg", lat: 12.9395, lng: 77.6209, ago: "8d" },
  { id: "n4", cat: "streetlight", title: "Two lights out", place: "17th Main, 6th Block", dist: "450 m", stage: 2, meToo: 6, photo: "/img/streetlight.jpg", lat: 12.9381, lng: 77.6178, ago: "2d" },
  { id: "n5", cat: "pothole", title: "Pothole near school gate", place: "4th Block, Jyoti Nivas", dist: "900 m", stage: 1, meToo: 17, photo: "/img/pothole.jpg", lat: 12.9318, lng: 77.6159, ago: "5h" },
  { id: "n6", cat: "water", title: "Water flooding lane", place: "Ejipura Main Rd", dist: "1.1 km", stage: 3, meToo: 9, photo: "/img/water.jpg", lat: 12.9403, lng: 77.6305, ago: "1d" },
  { id: "n7", cat: "garbage", title: "Dump behind bus stop", place: "Forum bus stop, Hosur Rd", dist: "1.3 km", stage: 2, meToo: 31, photo: "/img/garbage.jpg", lat: 12.9302, lng: 77.6286, ago: "3d" },
  { id: "n8", cat: "streetlight", title: "Flickering streetlight", place: "8th Block, 3rd Main", dist: "250 m", stage: 0, meToo: 2, photo: "/img/streetlight.jpg", lat: 12.9336, lng: 77.6211, ago: "40m" },
  { id: "n9", cat: "pothole", title: "Road caved in", place: "Koramangala 1st Block", dist: "1.6 km", stage: 3, meToo: 44, photo: "/img/pothole.jpg", lat: 12.9285, lng: 77.6338, ago: "4d" },
];

export const OFFICIAL_POSTS = [
  {
    id: "p1",
    handle: "@GBA_office",
    name: "Greater Bengaluru Authority",
    time: "1h",
    text: "Pothole filling works completed at 5th Cross, Koramangala 8th Block. Bengaluru South City Corporation. #PotholeFreeBengaluru",
    photo: "/img/fixed.jpg",
    matched: 1,
  },
  {
    id: "p2",
    handle: "@GBA_office",
    name: "Greater Bengaluru Authority",
    time: "5h",
    text: "Garbage black spots cleared across Ward 151 this morning. Please use the door-to-door collection vehicle.",
    photo: "",
    matched: 3,
  },
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
