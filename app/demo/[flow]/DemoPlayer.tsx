"use client";
import { useEffect, useRef, useState } from "react";
import NodiApp from "@/components/NodiApp";

type Step =
  | { tap: string; text?: string; nth?: number; wait?: number }
  | { scroll: string; to: number | "end"; wait?: number }
  | { type: string; value: string; wait?: number }
  | { sheet: "low" | "mid" | "high"; wait?: number }
  | { wait: number };

/* Scripted flows. Each runs on the real app, then the app remounts and the loop starts again. */
const FLOWS: Record<string, Step[]> = {
  report: [
    { wait: 1400 },
    { wait: 2200 },
    { tap: ".vfhero", wait: 1300 },
    { tap: ".shutter", wait: 2300 },
    { tap: ".att-add", wait: 900 },
    { tap: ".addopts button", text: "Record a video", wait: 900 },
    { scroll: ".cs-scroll", to: "end", wait: 700 },
    { type: ".notebox textarea", value: "Water has been leaking since morning.", wait: 900 },
    { tap: ".cs-footer .primary", wait: 3000 },
    { wait: 2600 },
  ],
  track: [
    { wait: 1200 },
    { tap: ".checkcard", wait: 1600 },
    { tap: ".ba-seg button", text: "Before", wait: 1000 },
    { tap: ".ba-seg button", text: "After", wait: 900 },
    { scroll: ".d-scroll", to: 330, wait: 1700 },
    { scroll: ".d-scroll", to: "end", wait: 1400 },
    { tap: ".tl-mthumb", nth: 1, wait: 900 },
    { tap: ".ms-bigplay", wait: 2600 },
    { tap: ".mediasheet .pf-done", wait: 800 },
    { scroll: ".d-scroll", to: 0, wait: 900 },
    { tap: ".cb-btns .yes", wait: 2200 },
  ],
  nearby: [
    { wait: 900 },
    { tap: ".tabpill button", nth: 1, wait: 3200 },
    { tap: ".ppin", nth: 0, wait: 1800 },
    { scroll: ".incident", to: "end", wait: 1600 },
    { tap: ".inc-close", wait: 900 },
    { sheet: "high", wait: 1400 },
    { scroll: ".sheet-body", to: 420, wait: 1500 },
    { scroll: ".sheet-body", to: 900, wait: 1500 },
    { scroll: ".sheet-body", to: 0, wait: 900 },
    { tap: ".segctl button", text: "Official", wait: 1200 },
    { scroll: ".sheet-body", to: 560, wait: 1700 },
    { scroll: ".sheet-body", to: 1200, wait: 1700 },
  ],
  a11y: [
    { wait: 1200 },
    { tap: ".avatarbtn", wait: 1300 },
    { tap: ".pf-seg button", text: "Light", wait: 1200 },
    { tap: ".switch", nth: 0, wait: 1100 },
    { tap: ".pf-done", wait: 1800 },
    { tap: ".avatarbtn", wait: 1100 },
    { tap: ".pf-seg button", text: "ಕನ್ನಡ", wait: 1000 },
    { tap: ".pf-done", wait: 2400 },
  ],
};

export default function DemoPlayer({ flow, frame }: { flow: string; frame: boolean }) {
  const [run, setRun] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const steps = FLOWS[flow] ?? FLOWS.report;
    let dead = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const find = (sel: string, text?: string, nth = 0) => {
      const all = Array.from(root.current?.querySelectorAll<HTMLElement>(sel) ?? []);
      const list = text ? all.filter((e) => e.textContent?.includes(text)) : all;
      return list[nth] ?? null;
    };
    const showTap = (el: HTMLElement) => {
      const host = root.current?.querySelector(".device-screen") as HTMLElement | null;
      if (!host || !dot.current) return;
      const a = el.getBoundingClientRect(), b = host.getBoundingClientRect();
      const scale = b.width / host.offsetWidth || 1;
      dot.current.style.left = `${(a.left + a.width / 2 - b.left) / scale}px`;
      dot.current.style.top = `${(a.top + a.height / 2 - b.top) / scale}px`;
      dot.current.classList.remove("go"); void dot.current.offsetWidth; dot.current.classList.add("go");
    };
    (async () => {
      await sleep(600);
      for (const st of steps) {
        if (dead) return;
        if ("tap" in st) {
          let el: HTMLElement | null = null;
          for (let i = 0; i < 20 && !el; i++) { el = find(st.tap, st.text, st.nth ?? 0); if (!el) await sleep(100); }
          if (el) { showTap(el); await sleep(260); el.click(); }
        } else if ("scroll" in st) {
          const el = find(st.scroll);
          if (el) el.scrollTo({ top: st.to === "end" ? el.scrollHeight : st.to, behavior: "smooth" });
        } else if ("sheet" in st) {
          const g = find(".grabber-zone"); if (g) showTap(g);
          window.dispatchEvent(new CustomEvent("nodi-sheet", { detail: st.sheet }));
        } else if ("type" in st) {
          const el = find(st.type) as HTMLTextAreaElement | null;
          if (el) {
            showTap(el); el.focus();
            const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
            for (let i = 1; i <= st.value.length; i++) {
              if (dead) return;
              setter.call(el, st.value.slice(0, i)); el.dispatchEvent(new Event("input", { bubbles: true }));
              await sleep(38);
            }
            el.blur();
          }
        }
        await sleep(st.wait ?? 800);
      }
      if (!dead) setRun((r) => r + 1);
    })();
    return () => { dead = true; };
  }, [flow, run]);

  return (
    <div ref={root} className={"demo" + (frame ? " framed" : "")}>
      <div className="device">
        <div className="island" />
        <div className="device-screen">
          <NodiApp key={run} />
          <span ref={dot} className="tapdot" />
        </div>
      </div>
    </div>
  );
}
