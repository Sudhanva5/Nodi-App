"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NearbyIssue, Category } from "@/lib/data";

const PATHS: Record<Category, string> = {
  pothole: '<path d="M4 18h16M6 14l2-6h8l2 6"/><path d="M9 11h6"/>',
  garbage: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  streetlight: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  water: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  drain: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  tree: '<path d="M12 22v-6"/><path d="M5 16h14l-7-13z"/>',
  footpath: '<path d="M4 16v-2.4C4 11.5 3 10.5 3 8c0-2.7 1.5-6 4.5-6C9.4 2 10 3.8 10 5.5c0 3.1-2 5.7-2 8.7V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.4c0-2.1 1-3.1 1-5.6 0-2.7-1.5-6-4.5-6C14.6 6 14 7.8 14 9.5c0 3.1 2 5.7 2 8.7V20a2 2 0 1 0 4 0Z"/>',
  other: '<circle cx="12" cy="12" r="9"/>',
};
const glyph = (c: Category, size = 14) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${PATHS[c]}</svg>`;

function pinHtml(i: NearbyIssue, selected: boolean) {
  const st = i.stage === 4 ? " done" : i.stage === 3 ? " check" : "";
  if (i.pin === "photo") {
    return `<div class="ppin${st}${selected ? " sel" : ""}"><img src="${i.photo}" alt="" /><span class="ppin-ic">${glyph(i.cat, 11)}</span></div>`;
  }
  return `<div class="ipin${st}${selected ? " sel" : ""}"><span>${glyph(i.cat, 13)}</span></div>`;
}

export default function NearbyMap({ issues, selected, onSelect, recenter }: { issues: NearbyIssue[]; selected: string | null; onSelect: (id: string) => void; recenter: number }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const cb = useRef(onSelect); cb.current = onSelect;
  const HOME: [number, number] = [12.9352, 77.6235];

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: false, attributionControl: false, center: [12.9335, 77.6235], zoom: 15 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, className: "darktiles" }).addTo(m);
    L.marker([12.9345, 77.6226], { icon: L.divIcon({ className: "", html: '<div class="me-pin"><span></span></div>', iconSize: [40, 40], iconAnchor: [20, 20] }), zIndexOffset: 2000 }).addTo(m);
    layer.current = L.layerGroup().addTo(m);
    map.current = m;
    setTimeout(() => m.invalidateSize(), 80);
    return () => { m.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (!layer.current) return;
    layer.current.clearLayers();
    [...issues].sort((a, b) => (a.pin === b.pin ? 0 : a.pin === "icon" ? -1 : 1)).forEach((i) => {
      const photo = i.pin === "photo";
      const mk = L.marker([i.lat, i.lng], {
        icon: L.divIcon({ className: "", html: pinHtml(i, i.id === selected), iconSize: photo ? [52, 52] : [28, 28], iconAnchor: photo ? [26, 26] : [14, 14] }),
        zIndexOffset: i.id === selected ? 1500 : photo ? 500 : 0,
      });
      mk.on("click", () => cb.current(i.id));
      layer.current!.addLayer(mk);
    });
  }, [issues, selected]);

  useEffect(() => { if (recenter && map.current) map.current.flyTo([12.9335, 77.6235], 15, { duration: 0.6 }); }, [recenter]);
  void HOME;

  return <><div ref={el} className="leaflet-host" /><span className="osm-attr">© OpenStreetMap</span></>;
}
