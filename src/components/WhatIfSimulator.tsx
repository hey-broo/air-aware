import { useState } from "react";
import { Beaker, Car, Factory, Cloud, RotateCcw } from "lucide-react";
import { getAqiLevel } from "@/data/mockData";

interface WhatIfSimulatorProps {
  baseAqi: number;
}

const WhatIfSimulator = ({ baseAqi }: WhatIfSimulatorProps) => {
  const [traffic, setTraffic] = useState(0);
  const [industrial, setIndustrial] = useState(0);
  const [weather, setWeather] = useState(0);

  const simulatedAqi = Math.max(
    10,
    Math.round(baseAqi + traffic * 0.3 * baseAqi / 100 + industrial * 0.4 * baseAqi / 100 + weather * -0.2 * baseAqi / 100)
  );

  const baseLevel = getAqiLevel(baseAqi);
  const simLevel = getAqiLevel(simulatedAqi);
  const diff = simulatedAqi - baseAqi;

  const reset = () => { setTraffic(0); setIndustrial(0); setWeather(0); };

  return (
    <div className="glass-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Beaker className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">What-If Simulation</h3>
        </div>
        <button onClick={reset} className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Reset">
          <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Adjust the sliders to simulate how different scenarios affect pollution levels.
      </p>

      {/* Sliders */}
      <div className="space-y-3">
        <SliderRow
          icon={<Car className="w-4 h-4" />}
          label="Traffic Restriction"
          value={traffic}
          onChange={setTraffic}
          min={-100}
          max={100}
          leftLabel="Full ban"
          rightLabel="2x traffic"
        />
        <SliderRow
          icon={<Factory className="w-4 h-4" />}
          label="Industrial Activity"
          value={industrial}
          onChange={setIndustrial}
          min={-100}
          max={100}
          leftLabel="Shutdown"
          rightLabel="Peak output"
        />
        <SliderRow
          icon={<Cloud className="w-4 h-4" />}
          label="Weather (Wind & Rain)"
          value={weather}
          onChange={setWeather}
          min={-100}
          max={100}
          leftLabel="Stagnant"
          rightLabel="Strong winds"
        />
      </div>

      {/* Result */}
      <div className="rounded-lg bg-secondary/50 p-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground mb-0.5">Simulated AQI</div>
          <div className={`text-3xl font-bold font-mono text-${simLevel.color}`}>
            {simulatedAqi}
          </div>
          <span className={`aqi-badge bg-${simLevel.color}/15 text-${simLevel.color} mt-1`}>
            {simLevel.label}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-1">Change from baseline</div>
          <div className={`text-xl font-bold font-mono ${diff > 0 ? "text-danger" : diff < 0 ? "text-safe" : "text-muted-foreground"}`}>
            {diff > 0 ? "+" : ""}{diff}
          </div>
          <div className="text-xs text-muted-foreground">
            Base: <span className={`font-mono text-${baseLevel.color}`}>{baseAqi}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SliderRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  leftLabel: string;
  rightLabel: string;
}

const SliderRow = ({ icon, label, value, onChange, min, max, leftLabel, rightLabel }: SliderRowProps) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
        {icon} {label}
      </div>
      <span className={`font-mono text-xs font-semibold ${value > 0 ? "text-danger" : value < 0 ? "text-safe" : "text-muted-foreground"}`}>
        {value > 0 ? "+" : ""}{value}%
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
    />
    <div className="flex justify-between text-[10px] text-muted-foreground">
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
  </div>
);

export default WhatIfSimulator;
