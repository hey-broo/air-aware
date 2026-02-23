import { Wind, Thermometer, Droplets, Eye } from "lucide-react";
import type { City } from "@/data/mockData";
import { getAqiLevel } from "@/data/mockData";

interface StatsBarProps {
  city: City;
}

const StatsBar = ({ city }: StatsBarProps) => {
  const level = getAqiLevel(city.aqi);

  const stats = [
    { icon: Wind, label: "AQI", value: city.aqi.toString(), sub: level.label, color: level.color },
    { icon: Thermometer, label: "Temperature", value: `${Math.round(22 + Math.random() * 12)}°C`, sub: "Current", color: "primary" as const },
    { icon: Droplets, label: "Humidity", value: `${Math.round(40 + Math.random() * 40)}%`, sub: "Relative", color: "primary" as const },
    { icon: Eye, label: "Visibility", value: `${(2 + Math.random() * 8).toFixed(1)} km`, sub: "Current", color: "primary" as const },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(({ icon: Icon, label, value, sub, color }, i) => (
        <div key={label} className="glass-card p-3 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-4 h-4 text-${color}`} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
          <div className={`text-xl font-bold font-mono text-${color}`}>{value}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
