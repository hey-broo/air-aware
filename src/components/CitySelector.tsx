import { MapPin } from "lucide-react";
import { cities, indianStates, getAqiLevel, type City } from "@/data/mockData";
import { useState } from "react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface CitySelectorProps {
  selectedCity: City;
  onSelectCity: (city: City) => void;
}

const CitySelector = ({ selectedCity, onSelectCity }: CitySelectorProps) => {
  const [selectedState, setSelectedState] = useState<string>("All");

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

      {/* City select using Radix */}
      <Select
        value={selectedCity.id}
        onValueChange={(val) => {
          const city = cities.find(c => c.id === val);
          if (city) onSelectCity(city);
        }}
      >
        <SelectTrigger className="w-full bg-secondary/50 border-border hover:border-primary/40">
          <SelectValue>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full bg-${level.color}`} />
              <span className="font-semibold">{selectedCity.name}</span>
              <span className="text-xs text-muted-foreground">{selectedCity.state}</span>
              <span className={`font-mono text-xs font-bold text-${level.color} ml-auto`}>AQI {selectedCity.aqi}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-50 bg-popover border-border max-h-60">
          {filtered.map(city => {
            const cl = getAqiLevel(city.aqi);
            return (
              <SelectItem key={city.id} value={city.id}>
                <div className="flex items-center gap-2 w-full">
                  <div className={`w-2 h-2 rounded-full bg-${cl.color}`} />
                  <span>{city.name}</span>
                  <span className="text-xs text-muted-foreground">{city.state}</span>
                  <span className={`font-mono text-xs font-semibold text-${cl.color} ml-auto`}>{city.aqi}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
