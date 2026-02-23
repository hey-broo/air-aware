import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ZoneData } from "@/data/mockData";
import { getAqiLevel } from "@/data/mockData";

interface PollutionMapProps {
  zones: ZoneData[];
}

const colorMap: Record<string, string> = {
  safe: "hsl(152, 69%, 40%)",
  moderate: "hsl(45, 93%, 47%)",
  warning: "hsl(25, 95%, 53%)",
  danger: "hsl(0, 72%, 51%)",
  severe: "hsl(280, 68%, 40%)",
};

const trendLabels = {
  improving: "↓ Improving",
  stable: "→ Stable",
  worsening: "↑ Worsening",
};

const PollutionMap = ({ zones }: PollutionMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  const center = useMemo(() => {
    if (zones.length === 0) return [20, 77] as [number, number];
    const avgLat = zones.reduce((s, z) => s + z.lat, 0) / zones.length;
    const avgLng = zones.reduce((s, z) => s + z.lng, 0) / zones.length;
    return [avgLat, avgLng] as [number, number];
  }, [zones]);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current).setView(center, 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);
    markersRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers and center when zones change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;
    mapRef.current.setView(center, 12);
    markersRef.current.clearLayers();

    zones.forEach((zone) => {
      const level = getAqiLevel(zone.aqi);
      const color = colorMap[level.color] || colorMap.moderate;

      const circle = L.circleMarker([zone.lat, zone.lng], {
        radius: 18,
        color,
        fillColor: color,
        fillOpacity: 0.45,
        weight: 2,
      });

      circle.bindPopup(`
        <div style="min-width:150px;font-family:sans-serif;">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${zone.name}</div>
          <div style="font-family:monospace;font-size:18px;font-weight:700;color:${color};">AQI ${zone.aqi}</div>
          <div style="font-size:11px;color:${color};margin-bottom:4px;">${level.label}</div>
          <div style="font-size:11px;color:#888;">Pollutant: ${zone.mainPollutant}</div>
          <div style="font-size:11px;color:#888;">Trend: ${trendLabels[zone.trend]}</div>
          <div style="font-size:11px;color:#888;">Reliability: ${zone.reliabilityScore}%</div>
        </div>
      `);

      markersRef.current!.addLayer(circle);
    });
  }, [zones, center]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Zone Pollution Map</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-safe" /> Good</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-moderate" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Unhealthy SG</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> Unhealthy</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-severe" /> Very Unhealthy</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="rounded-xl overflow-hidden border border-border/50"
        style={{ height: "420px" }}
      />
    </div>
  );
};

export default PollutionMap;
