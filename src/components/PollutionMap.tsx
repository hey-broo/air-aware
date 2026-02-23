import { TrendingUp, TrendingDown, Minus, Shield } from "lucide-react";
import type { ZoneData } from "@/data/mockData";
import { getAqiLevel } from "@/data/mockData";

interface PollutionMapProps {
  zones: ZoneData[];
}

const trendIcons = {
  improving: TrendingDown,
  stable: Minus,
  worsening: TrendingUp,
};

const trendColors = {
  improving: "text-safe",
  stable: "text-muted-foreground",
  worsening: "text-danger",
};

const PollutionMap = ({ zones }: PollutionMapProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Zone Pollution Grid</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-safe" /> Good</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-moderate" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Unhealthy SG</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> Unhealthy</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-severe" /> Very Unhealthy</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {zones.map((zone, i) => {
          const level = getAqiLevel(zone.aqi);
          const TrendIcon = trendIcons[zone.trend];
          return (
            <div
              key={zone.id}
              className={`glass-card p-3 hover:scale-[1.02] transition-all cursor-pointer glow-${
                level.color === "safe" ? "safe" : level.color === "danger" || level.color === "severe" ? "danger" : "warning"
              } animate-fade-in`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground truncate">{zone.name}</span>
                <TrendIcon className={`w-3.5 h-3.5 ${trendColors[zone.trend]}`} />
              </div>
              <div className={`text-2xl font-bold font-mono text-${level.color}`}>
                {zone.aqi}
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className={`aqi-badge bg-${level.color}/15 text-${level.color}`} style={{ padding: "2px 8px", fontSize: "10px" }}>
                  {level.label}
                </span>
                <span className="text-[10px] text-muted-foreground">{zone.mainPollutant}</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Shield className="w-3 h-3 text-primary" />
                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${zone.reliabilityScore}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{zone.reliabilityScore}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollutionMap;
