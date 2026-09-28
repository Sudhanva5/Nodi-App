import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nodi · Snap it. Send it. See it fixed.",
  description: "A frictionless civic complaint prototype for Bengaluru, by Namma Yatri.",
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#111111" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
