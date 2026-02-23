export interface City {
  id: string;
  name: string;
  state: string;
  aqi: number;
  lat: number;
  lng: number;
  population: string;
}

export interface ZoneData {
  id: string;
  name: string;
  aqi: number;
  trend: "improving" | "stable" | "worsening";
  mainPollutant: string;
  reliabilityScore: number;
  lat: number;
  lng: number;
}

export interface AlertData {
  id: string;
  severity: "warning" | "danger" | "severe";
  message: string;
  zone: string;
  timeframe: string;
}

export interface TrendPoint {
  time: string;
  aqi: number;
  predicted?: number;
  pm25?: number;
  pm10?: number;
  no2?: number;
}

export const indianStates = [
  "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Uttar Pradesh",
  "Gujarat", "Rajasthan", "West Bengal", "Madhya Pradesh", "Punjab",
];

export const cities: City[] = [
  { id: "mum", name: "Mumbai", state: "Maharashtra", aqi: 142, lat: 19.07, lng: 72.87, population: "20.4M" },
  { id: "del", name: "Delhi", state: "Delhi", aqi: 287, lat: 28.70, lng: 77.10, population: "32.9M" },
  { id: "blr", name: "Bengaluru", state: "Karnataka", aqi: 89, lat: 12.97, lng: 77.59, population: "12.3M" },
  { id: "chn", name: "Chennai", state: "Tamil Nadu", aqi: 112, lat: 13.08, lng: 80.27, population: "10.9M" },
  { id: "lko", name: "Lucknow", state: "Uttar Pradesh", aqi: 198, lat: 26.84, lng: 80.94, population: "3.9M" },
  { id: "ahm", name: "Ahmedabad", state: "Gujarat", aqi: 156, lat: 23.02, lng: 72.57, population: "8.0M" },
  { id: "jpr", name: "Jaipur", state: "Rajasthan", aqi: 134, lat: 26.91, lng: 75.78, population: "3.1M" },
  { id: "kol", name: "Kolkata", state: "West Bengal", aqi: 167, lat: 22.57, lng: 88.36, population: "14.8M" },
  { id: "bpl", name: "Bhopal", state: "Madhya Pradesh", aqi: 121, lat: 23.26, lng: 77.41, population: "1.9M" },
  { id: "chd", name: "Chandigarh", state: "Punjab", aqi: 103, lat: 30.73, lng: 76.77, population: "1.1M" },
];

export const getZonesForCity = (cityId: string): ZoneData[] => {
  const city = cities.find(c => c.id === cityId);
  const base = city?.aqi || 100;
  const baseLat = city?.lat || 20;
  const baseLng = city?.lng || 77;
  const names: Record<string, string[]> = {
    mum: ["Andheri", "Bandra", "Colaba", "Dadar", "Powai", "Worli", "Malad", "Thane", "Navi Mumbai"],
    del: ["Connaught Place", "Dwarka", "Rohini", "Saket", "Janakpuri", "Karol Bagh", "Lajpat Nagar", "Nehru Place", "Pitampura"],
    blr: ["Koramangala", "Whitefield", "Indiranagar", "HSR Layout", "Jayanagar", "Electronic City", "Marathahalli", "Hebbal", "Yelahanka"],
    default: ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H", "Zone I"],
  };
  const zoneNames = names[cityId] || names.default;
  const trends: ZoneData["trend"][] = ["improving", "stable", "worsening"];
  const pollutants = ["PM2.5", "PM10", "NO₂", "SO₂", "O₃", "CO"];

  // Spread zones around the city center
  const offsets = [
    [-0.04, -0.04], [-0.04, 0], [-0.04, 0.04],
    [0, -0.04], [0, 0], [0, 0.04],
    [0.04, -0.04], [0.04, 0], [0.04, 0.04],
  ];

  return zoneNames.map((name, i) => ({
    id: `${cityId}-z${i}`,
    name,
    aqi: Math.max(20, base + Math.floor(Math.random() * 80 - 40)),
    trend: trends[Math.floor(Math.random() * 3)],
    mainPollutant: pollutants[Math.floor(Math.random() * pollutants.length)],
    reliabilityScore: Math.floor(70 + Math.random() * 30),
    lat: baseLat + (offsets[i]?.[0] || 0),
    lng: baseLng + (offsets[i]?.[1] || 0),
  }));
};

export const getAlertsForCity = (cityId: string): AlertData[] => {
  const city = cities.find(c => c.id === cityId);
  if (!city) return [];
  const alerts: AlertData[] = [];
  if (city.aqi > 200) {
    alerts.push({ id: "a1", severity: "severe", message: `Severe pollution expected in ${city.name}. Avoid outdoor activities.`, zone: "City-wide", timeframe: "Next 6 hours" });
  }
  if (city.aqi > 150) {
    alerts.push({ id: "a2", severity: "danger", message: `High pollution spreading to residential areas.`, zone: "Multiple zones", timeframe: "Next 12 hours" });
  }
  if (city.aqi > 100) {
    alerts.push({ id: "a3", severity: "warning", message: `Moderate pollution levels rising. Sensitive groups should take precautions.`, zone: "Industrial zone", timeframe: "Next 24 hours" });
  }
  return alerts;
};

export const getTrendData = (cityId: string): TrendPoint[] => {
  const base = cities.find(c => c.id === cityId)?.aqi || 100;
  const hours = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM", "12AM"];
  return hours.map((time, i) => {
    const variation = Math.sin(i * 0.7) * 30 + Math.random() * 20;
    const aqi = Math.max(20, Math.round(base + variation));
    return {
      time,
      aqi,
      predicted: i >= 7 ? Math.round(aqi + Math.random() * 30 - 10) : undefined,
      pm25: Math.round(aqi * 0.4 + Math.random() * 15),
      pm10: Math.round(aqi * 0.6 + Math.random() * 20),
      no2: Math.round(20 + Math.random() * 40),
    };
  });
};

export const getAqiLevel = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "safe" as const };
  if (aqi <= 100) return { label: "Moderate", color: "moderate" as const };
  if (aqi <= 150) return { label: "Unhealthy (SG)", color: "warning" as const };
  if (aqi <= 200) return { label: "Unhealthy", color: "danger" as const };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "severe" as const };
  return { label: "Hazardous", color: "danger" as const };
};
