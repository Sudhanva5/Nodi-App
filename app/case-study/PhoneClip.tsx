"use client";
import { useEffect, useRef, useState } from "react";
import s from "./case-study.module.css";

/** A live, looping clip of the real prototype (runs /demo/[flow] inside a scaled iframe). */
export default function PhoneClip({ flow, caption, scale = 0.62 }: { flow: string; caption?: string; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <figure className={s.clip}>
      <div ref={ref} className={s.clipBox} style={{ width: 417 * scale, height: 876 * scale }}>
        {show && <iframe src={`/demo/${flow}`} title={caption ?? flow} style={{ transform: `scale(${scale})` }} loading="lazy" tabIndex={-1} />}
        <span className={s.clipLive}><i />Live prototype</span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
