import { useState } from "react";
import { Map, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import CitySelector from "@/components/CitySelector";
import StatsBar from "@/components/StatsBar";
import AlertBanner from "@/components/AlertBanner";
import PollutionMap from "@/components/PollutionMap";
import PollutionGraph from "@/components/PollutionGraph";
import AIChatPanel from "@/components/AIChatPanel";
import {
  cities, getZonesForCity, getAlertsForCity, getTrendData,
  type City,
} from "@/data/mockData";

const AdminDashboard = () => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[1]);
  const [viewMode, setViewMode] = useState<"map" | "graph">("map");

  const zones = getZonesForCity(selectedCity.id);
  const alerts = getAlertsForCity(selectedCity.id);
  const trendData = getTrendData(selectedCity.id);

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
          <span className="aqi-badge bg-primary/20 text-primary">Admin</span>
        </div>

        {/* City Selector + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />
          </div>
          <div className="lg:col-span-2">
            <StatsBar city={selectedCity} />
          </div>
        </div>

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

        {/* Main: Map/Graph */}
        <div>
          {viewMode === "map" ? (
            <PollutionMap zones={zones} />
          ) : (
            <PollutionGraph data={trendData} cityName={selectedCity.name} />
          )}
        </div>

        {/* Floating AI Chat */}
        <AIChatPanel city={selectedCity} zones={zones} mode="admin" />
      </main>
    </div>
  );
};

export default AdminDashboard;
