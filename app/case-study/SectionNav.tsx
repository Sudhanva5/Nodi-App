"use client";
import { useEffect, useState } from "react";
import s from "./case-study.module.css";

export default function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
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
