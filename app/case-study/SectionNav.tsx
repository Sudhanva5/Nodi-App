"use client";
import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import s from "./case-study.module.css";

export default function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const seen = useRef(new Set<string>());
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        setActive(e.target.id);
        if (!seen.current.has(e.target.id)) { seen.current.add(e.target.id); if (posthog.__loaded) posthog.capture("case_study_section_viewed", { section: e.target.id, order: seen.current.size }); }
      }),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [items]);
  return (
    <nav className={s.nav} aria-label="Sections">
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} className={active === i.id ? s.navOn : ""}>{i.label}</a>
      ))}
    </nav>
  );
}
