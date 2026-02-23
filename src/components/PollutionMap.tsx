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

const priorityLabels: Record<string, string> = {
  safe: "Low Priority",
  moderate: "Medium Priority",
  warning: "High Priority",
  danger: "Critical Priority",
  severe: "Emergency Priority",
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
      const isHighRisk = zone.aqi > 150;

      if (isHighRisk) {
        // Square markers for high-priority zones
        const size = zone.aqi > 200 ? 28 : 22;
        const icon = L.divIcon({
          className: `priority-square-marker ${zone.aqi > 200 ? 'pulse-marker' : ''}`,
          html: `<div style="
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: 0.75;
            border: 2px solid ${color};
            border-radius: 3px;
            box-shadow: 0 0 10px ${color};
            display: flex;
            align-items: center;
            justify-content: center;
          "><span style="color: white; font-size: 9px; font-weight: 700;">${zone.aqi}</span></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
        const marker = L.marker([zone.lat, zone.lng], { icon });
        marker.bindPopup(`
          <div style="min-width:150px;font-family:sans-serif;">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${zone.name}</div>
            <div style="font-family:monospace;font-size:18px;font-weight:700;color:${color};">AQI ${zone.aqi}</div>
            <div style="font-size:11px;color:${color};margin-bottom:4px;">⚠ ${priorityLabels[level.color] || 'High Priority'}</div>
            <div style="font-size:11px;color:#888;">Pollutant: ${zone.mainPollutant}</div>
            <div style="font-size:11px;color:#888;">Trend: ${trendLabels[zone.trend]}</div>
            <div style="font-size:11px;color:#888;">Reliability: ${zone.reliabilityScore}%</div>
          </div>
        `);
        markersRef.current!.addLayer(marker);
      } else {
        // Circle markers for low-priority zones
        const circle = L.circleMarker([zone.lat, zone.lng], {
          radius: 14,
          color,
          fillColor: color,
          fillOpacity: 0.4,
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
      }
    });
  }, [zones, center]);

  const highPriorityCount = zones.filter(z => z.aqi > 150).length;

  return (
    <div className="space-y-3">
      {/* Priority Color Legend */}
      <div className="glass-card p-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-foreground">Zone Pollution Map</h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: colorMap.safe }} /> Low
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: colorMap.moderate }} /> Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: colorMap.warning }} /> High ■
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: colorMap.danger }} /> Critical ■
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: colorMap.severe }} /> Emergency ■
            </span>
          </div>
        </div>
        {highPriorityCount > 0 && (
          <p className="text-xs text-warning mt-1.5">⚠ {highPriorityCount} high-priority zone{highPriorityCount > 1 ? 's' : ''} detected (■ square markers)</p>
        )}
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
