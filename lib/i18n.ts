export type Lang = "en" | "kn";

const KN: Record<string, string> = {
  "Namaskara": "ನಮಸ್ಕಾರ",
  "See a problem on the road?": "ರಸ್ತೆಯಲ್ಲಿ ಸಮಸ್ಯೆ ಕಾಣಿಸಿತೇ?",
  "Report a problem": "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ",
  "Photo, video or just speak. Takes 20 seconds.": "ಫೋಟೋ, ವಿಡಿಯೋ ಅಥವಾ ಮಾತನಾಡಿ. 20 ಸೆಕೆಂಡ್ ಸಾಕು.",
  "Check if it's fixed": "ಸರಿಯಾಗಿದೆಯೇ ನೋಡಿ",
  "My reports": "ನನ್ನ ದೂರುಗಳು",
  "Take a look": "ಒಮ್ಮೆ ನೋಡಿ",
  "Home": "ಮುಖಪುಟ",
  "Report": "ವರದಿ",
  "Nearby": "ಹತ್ತಿರ",
  "Expected by": "ನಿರೀಕ್ಷಿತ",
  "Is it actually fixed?": "ನಿಜವಾಗಿಯೂ ಸರಿಯಾಗಿದೆಯೇ?",
  "Yes, it's fixed": "ಹೌದು, ಸರಿಯಾಗಿದೆ",
  "No, still there": "ಇಲ್ಲ, ಇನ್ನೂ ಇದೆ",
  "Listen": "ಕೇಳಿ",
  "Send to GBA": "GBA ಗೆ ಕಳುಹಿಸಿ",
  "Support": "ಬೆಂಬಲ",
  "GBA says the work is done.": "ಕೆಲಸ ಮುಗಿದಿದೆ ಎಂದು GBA ಹೇಳುತ್ತದೆ.",
  "Every report reaches your ward office as a formal letter.": "ಪ್ರತಿ ದೂರು ನಿಮ್ಮ ವಾರ್ಡ್ ಕಚೇರಿಗೆ ಅಧಿಕೃತ ಪತ್ರವಾಗಿ ತಲುಪುತ್ತದೆ.",
  "What happened so far": "ಇಲ್ಲಿಯವರೆಗೆ ಏನಾಯಿತು",
  "Before": "ಮೊದಲು",
  "After": "ನಂತರ",
};

export const tr = (lang: Lang) => (s: string) => (lang === "kn" ? KN[s] ?? s : s);
