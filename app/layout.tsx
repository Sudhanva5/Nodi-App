import type { Metadata, Viewport } from "next";
import { Inter, Anek_Kannada } from "next/font/google";
import "./globals.css";
import Analytics from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const kannada = Anek_Kannada({ subsets: ["kannada", "latin"], variable: "--font-kn", display: "swap" });

export const metadata: Metadata = {
  title: "Nodi · Snap it. Send it. See it fixed.",
  description: "A frictionless civic complaint prototype for Bengaluru, by Namma Yatri.",
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0A0A0A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${kannada.variable}`}>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
