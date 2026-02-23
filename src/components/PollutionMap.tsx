import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { ZoneData } from "@/data/mockData";
import { getAqiLevel } from "@/data/mockData";
import { TrendingUp, TrendingDown, Minus, Shield } from "lucide-react";

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

const trendIcons = {
  improving: TrendingDown,
  stable: Minus,
  worsening: TrendingUp,
};

const trendLabels = {
  improving: "Improving",
  stable: "Stable",
  worsening: "Worsening",
};

// Component to recenter map when city changes
const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 12);
  }, [lat, lng, map]);
  return null;
};

const PollutionMap = ({ zones }: PollutionMapProps) => {
  const center = useMemo(() => {
    if (zones.length === 0) return { lat: 20, lng: 77 };
    const avgLat = zones.reduce((s, z) => s + z.lat, 0) / zones.length;
    const avgLng = zones.reduce((s, z) => s + z.lng, 0) / zones.length;
    return { lat: avgLat, lng: avgLng };
  }, [zones]);

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

      <div className="rounded-xl overflow-hidden border border-border/50" style={{ height: "420px" }}>
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap lat={center.lat} lng={center.lng} />
          {zones.map((zone) => {
            const level = getAqiLevel(zone.aqi);
            const color = colorMap[level.color] || colorMap.moderate;
            const TrendIcon = trendIcons[zone.trend];
            return (
              <CircleMarker
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={20}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.45,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-sm space-y-1 min-w-[160px]">
                    <div className="font-bold text-base">{zone.name}</div>
                    <div className="font-mono text-lg font-bold" style={{ color }}>
                      AQI {zone.aqi}
                    </div>
                    <div className="text-xs" style={{ color }}>
                      {level.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Pollutant: {zone.mainPollutant}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Trend: {trendLabels[zone.trend]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Reliability: {zone.reliabilityScore}%
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default PollutionMap;
