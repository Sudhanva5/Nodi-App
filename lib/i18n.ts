export type Lang = "en" | "kn";

const KN: Record<string, string> = {
  "Namaskara": "ನಮಸ್ಕಾರ",
  "See a problem on the road?": "ರಸ್ತೆಯಲ್ಲಿ ಸಮಸ್ಯೆ ಕಾಣಿಸಿತೇ?",
  "Report a problem": "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ",
  "Photo, video or just speak. Takes 20 seconds.": "ಫೋಟೋ, ವಿಡಿಯೋ ಅಥವಾ ಮಾತನಾಡಿ. 20 ಸೆಕೆಂಡ್ ಸಾಕು.",
  "Needs your check": "ನಿಮ್ಮ ಪರಿಶೀಲನೆ ಬೇಕು",
  "My reports": "ನನ್ನ ದೂರುಗಳು",
  "Check now": "ಈಗ ನೋಡಿ",
  "Home": "ಮುಖಪುಟ",
  "Report": "ವರದಿ",
  "Nearby": "ಹತ್ತಿರ",
  "Expected by": "ನಿರೀಕ್ಷಿತ",
  "Is it actually fixed?": "ನಿಜವಾಗಿಯೂ ಸರಿಯಾಗಿದೆಯೇ?",
  "Yes, it's fixed": "ಹೌದು, ಸರಿಯಾಗಿದೆ",
  "No, still there": "ಇಲ್ಲ, ಇನ್ನೂ ಇದೆ",
  "Listen": "ಕೇಳಿ",
  "Send to GBA": "GBA ಗೆ ಕಳುಹಿಸಿ",
  "Me too": "ನನಗೂ",
  "GBA says it's done. Is it?": "GBA ಮುಗಿದಿದೆ ಎನ್ನುತ್ತದೆ. ನಿಜವೇ?",
  "Every report goes as a formal letter to your ward office.": "ಪ್ರತಿ ದೂರು ನಿಮ್ಮ ವಾರ್ಡ್ ಕಚೇರಿಗೆ ಅಧಿಕೃತ ಪತ್ರವಾಗಿ ಹೋಗುತ್ತದೆ.",
  "What happened so far": "ಇಲ್ಲಿಯವರೆಗೆ ಏನಾಯಿತು",
  "Before": "ಮೊದಲು",
  "After": "ನಂತರ",
};

export const tr = (lang: Lang) => (s: string) => (lang === "kn" ? KN[s] ?? s : s);
