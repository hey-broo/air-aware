import { AlertTriangle, AlertOctagon, ShieldAlert, Clock } from "lucide-react";
import type { AlertData } from "@/data/mockData";

interface AlertBannerProps {
  alerts: AlertData[];
}

const severityConfig = {
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-warning/10 border-warning/30",
    textClass: "text-warning",
    label: "Warning",
  },
  danger: {
    icon: AlertOctagon,
    bgClass: "bg-danger/10 border-danger/30",
    textClass: "text-danger",
    label: "High Risk",
  },
  severe: {
    icon: ShieldAlert,
    bgClass: "bg-severe/10 border-severe/30",
    textClass: "text-severe",
    label: "Severe",
  },
};

const AlertBanner = ({ alerts }: AlertBannerProps) => {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => {
        const config = severityConfig[alert.severity];
        const Icon = config.icon;
        return (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-3 rounded-lg border ${config.bgClass} animate-fade-in`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <Icon className={`w-5 h-5 ${config.textClass} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-bold uppercase tracking-wider ${config.textClass}`}>
                  {config.label}
                </span>
                <span className="text-xs text-muted-foreground">• {alert.zone}</span>
              </div>
              <p className="text-sm text-foreground">{alert.message}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="w-3 h-3" />
              {alert.timeframe}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertBanner;
