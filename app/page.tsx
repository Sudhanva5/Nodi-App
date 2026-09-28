"use client";
import { useCallback, useState } from "react";
import NodiApp, { ScreenKey } from "@/components/NodiApp";

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const onScreen = useCallback((_k: ScreenKey) => {}, []);
  return (
    <main className="stage solo">
      <div className="device-wrap">
        <div className="device">
          <div className="island" />
          <div className="device-screen"><NodiApp onScreen={onScreen} theme={theme} onTheme={setTheme} /></div>
        </div>
      </div>
    </main>
  );
}
