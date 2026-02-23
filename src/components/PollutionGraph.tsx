import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Legend,
} from "recharts";
import type { TrendPoint } from "@/data/mockData";

interface PollutionGraphProps {
  data: TrendPoint[];
  cityName: string;
}

const PollutionGraph = ({ data, cityName }: PollutionGraphProps) => {
  return (
    <div className="space-y-6">
      {/* AQI Trend */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          AQI Trend & Prediction — {cityName}
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25, 95%, 58%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(25, 95%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 25%, 12%)",
                border: "1px solid hsl(222, 20%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area type="monotone" dataKey="aqi" stroke="hsl(174, 72%, 46%)" fill="url(#aqiGrad)" strokeWidth={2} name="AQI" />
            <Area type="monotone" dataKey="predicted" stroke="hsl(25, 95%, 58%)" fill="url(#predGrad)" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pollutant Breakdown */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Pollutant Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 25%, 12%)",
                border: "1px solid hsl(222, 20%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line type="monotone" dataKey="pm25" stroke="hsl(0, 72%, 56%)" strokeWidth={2} dot={false} name="PM2.5" />
            <Line type="monotone" dataKey="pm10" stroke="hsl(45, 93%, 52%)" strokeWidth={2} dot={false} name="PM10" />
            <Line type="monotone" dataKey="no2" stroke="hsl(280, 68%, 50%)" strokeWidth={2} dot={false} name="NO₂" />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PollutionGraph;
