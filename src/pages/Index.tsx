import { useState } from "react";
import { Map, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import CitySelector from "@/components/CitySelector";
import StatsBar from "@/components/StatsBar";
import AlertBanner from "@/components/AlertBanner";
import PollutionMap from "@/components/PollutionMap";
import PollutionGraph from "@/components/PollutionGraph";
import WhatIfSimulator from "@/components/WhatIfSimulator";
import heroMap from "@/assets/hero-map.webp";
import {
  cities, getZonesForCity, getAlertsForCity, getTrendData,
  type City,
} from "@/data/mockData";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[1]); // Delhi
  const [viewMode, setViewMode] = useState<"map" | "graph">("map");

  const zones = getZonesForCity(selectedCity.id);
  const alerts = getAlertsForCity(selectedCity.id);
  const trendData = getTrendData(selectedCity.id);

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/30">
        <img
          src={heroMap}
          alt="Pollution intelligence grid visualization"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative container mx-auto px-4 py-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
            Virtual Pollution <span className="text-primary text-glow">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            AI-powered pollution monitoring, prediction, and early-warning alerts — 
            no physical sensors required. Accessible insights for everyone.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* City Selector + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />
          </div>
          <div className="lg:col-span-2">
            <StatsBar city={selectedCity} />
          </div>
        </div>

        {/* Alerts */}
        <AlertBanner alerts={alerts} />

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "map"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Map className="w-4 h-4" />
            Map View
          </button>
          <button
            onClick={() => setViewMode("graph")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "graph"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Graph View
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {viewMode === "map" ? (
              <PollutionMap zones={zones} />
            ) : (
              <PollutionGraph data={trendData} cityName={selectedCity.name} />
            )}
          </div>
          <div className="lg:col-span-1">
            <WhatIfSimulator baseAqi={selectedCity.aqi} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground italic">
            "A people-first, software-only AI platform that turns complex pollution data into simple, visual, and actionable insights for everyone."
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
