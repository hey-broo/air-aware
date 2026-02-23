import { MapPin, ChevronDown } from "lucide-react";
import { cities, indianStates, getAqiLevel, type City } from "@/data/mockData";
import { useState } from "react";

interface CitySelectorProps {
  selectedCity: City;
  onSelectCity: (city: City) => void;
}

const CitySelector = ({ selectedCity, onSelectCity }: CitySelectorProps) => {
  const [selectedState, setSelectedState] = useState<string>("All");
  const [open, setOpen] = useState(false);

  const filtered = selectedState === "All" ? cities : cities.filter(c => c.state === selectedState);
  const level = getAqiLevel(selectedCity.aqi);

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <MapPin className="w-4 h-4 text-primary" />
        Select Location
      </div>

      {/* State filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setSelectedState("All")}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
            selectedState === "All"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </button>
        {indianStates.map(state => (
          <button
            key={state}
            onClick={() => setSelectedState(state)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              selectedState === state
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {state}
          </button>
        ))}
      </div>

      {/* City list */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-secondary/50 border border-border hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full bg-${level.color}`} />
            <div className="text-left">
              <span className="text-sm font-semibold text-foreground">{selectedCity.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{selectedCity.state}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-sm font-bold text-${level.color}`}>AQI {selectedCity.aqi}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
            {filtered.map(city => {
              const cl = getAqiLevel(city.aqi);
              return (
                <button
                  key={city.id}
                  onClick={() => { onSelectCity(city); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-secondary/50 transition-colors ${
                    city.id === selectedCity.id ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${cl.color}`} />
                    <span className="text-sm text-foreground">{city.name}</span>
                    <span className="text-xs text-muted-foreground">{city.state}</span>
                  </div>
                  <span className={`font-mono text-xs font-semibold text-${cl.color}`}>{city.aqi}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
