import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const kannada = Noto_Sans_Kannada({ subsets: ["kannada"], weight: ["400", "500", "600", "700"], variable: "--font-kn", display: "swap" });

export const metadata: Metadata = {
  title: "Nodi · Snap it. Send it. See it fixed.",
  description: "A frictionless civic complaint prototype for Bengaluru, by Namma Yatri.",
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0A0A0A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${kannada.variable}`}>
      <body>{children}</body>
    </html>
  );
}
