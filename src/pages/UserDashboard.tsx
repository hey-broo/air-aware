import { useState } from "react";
import { Map, BarChart3, Heart, ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import CitySelector from "@/components/CitySelector";
import AlertBanner from "@/components/AlertBanner";
import PollutionMap from "@/components/PollutionMap";
import PollutionGraph from "@/components/PollutionGraph";
import WhatIfSimulator from "@/components/WhatIfSimulator";
import {
  cities, getZonesForCity, getAlertsForCity, getTrendData,
  getAqiLevel, getSimpleAqiLabel, type City,
} from "@/data/mockData";

const UserDashboard = () => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[1]);
  const [viewMode, setViewMode] = useState<"map" | "graph">("map");

  const zones = getZonesForCity(selectedCity.id);
  const alerts = getAlertsForCity(selectedCity.id);
  const trendData = getTrendData(selectedCity.id);
  const level = getAqiLevel(selectedCity.aqi);
  const simple = getSimpleAqiLabel(selectedCity.aqi);

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-foreground">My Dashboard</h2>
          <span className="aqi-badge bg-secondary text-secondary-foreground">User</span>
        </div>

        {/* City Selector */}
        <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />

        {/* Health Advisory - Simple Language */}
        <div className={`glass-card p-6 border-l-4 border-${level.color}`}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{simple.emoji}</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Heart className={`w-5 h-5 text-${level.color}`} />
                <h3 className="text-lg font-bold text-foreground">
                  Air Quality: <span className={`text-${level.color}`}>{simple.label}</span>
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{simple.advice}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Location: <strong>{selectedCity.name}, {selectedCity.state}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Simple Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldAlert className="w-4 h-4" /> Health Alerts
            </div>
            <AlertBanner alerts={alerts} />
          </div>
        )}

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
            <Map className="w-4 h-4" /> Map View
          </button>
          <button
            onClick={() => setViewMode("graph")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "graph"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Graph View
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
      </main>
    </div>
  );
};

export default UserDashboard;
