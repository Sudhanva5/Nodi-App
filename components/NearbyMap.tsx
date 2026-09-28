"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NearbyIssue, CATEGORIES, Category } from "@/lib/data";

const PATHS: Record<Category, string> = {
  pothole: '<path d="M4 18h16M6 14l2-6h8l2 6"/><path d="M9 11h6"/>',
  garbage: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  streetlight: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  water: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  drain: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  tree: '<path d="M12 22v-6"/><path d="M5 16h14l-7-13z"/>',
  other: '<circle cx="12" cy="12" r="9"/>',
};

function pinHtml(i: NearbyIssue, selected: boolean) {
  const c = CATEGORIES[i.cat].color;
  const done = i.stage === 4;
  return `<div class="mpin${selected ? " sel" : ""}${done ? " done" : ""}" style="--c:${c}">
    <span class="mpin-glow"></span>
    <span class="mpin-core"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#111" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${PATHS[i.cat]}</svg></span>
    ${i.meToo >= 15 ? `<span class="mpin-count">${i.meToo}</span>` : ""}
  </div>`;
}

export default function NearbyMap({ issues, selected, onSelect }: { issues: NearbyIssue[]; selected: string | null; onSelect: (id: string) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const cb = useRef(onSelect); cb.current = onSelect;

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: false, attributionControl: false, center: [12.9352, 77.6235], zoom: 15 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, className: "darktiles" }).addTo(m);
    // you are here
    L.marker([12.9345, 77.6226], { icon: L.divIcon({ className: "", html: '<div class="me-dot"><span></span></div>', iconSize: [22, 22], iconAnchor: [11, 11] }) }).addTo(m);
    L.circle([12.9345, 77.6226], { radius: 600, color: "#FCC32C", weight: 1, opacity: 0.35, fillOpacity: 0.04, dashArray: "4 6" }).addTo(m);
    layer.current = L.layerGroup().addTo(m);
    map.current = m;
    setTimeout(() => m.invalidateSize(), 80);
    return () => { m.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (!layer.current) return;
    layer.current.clearLayers();
    issues.forEach((i) => {
      const mk = L.marker([i.lat, i.lng], { icon: L.divIcon({ className: "", html: pinHtml(i, i.id === selected), iconSize: [40, 40], iconAnchor: [20, 20] }), zIndexOffset: i.id === selected ? 1000 : 0 });
      mk.on("click", () => cb.current(i.id));
      layer.current!.addLayer(mk);
    });
    if (selected && map.current) {
      const s = issues.find((x) => x.id === selected);
      if (s) map.current.panTo([s.lat - 0.0025, s.lng], { animate: true });
    }
  }, [issues, selected]);

  return <><div ref={el} className="leaflet-host" /><span className="osm-attr">© OpenStreetMap</span></>;
}
