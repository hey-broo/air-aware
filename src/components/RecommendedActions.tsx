import { Car, Factory, Flame, Droplets, Truck, Shield, Construction, Bus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { City } from "@/data/mockData";

interface Action {
  icon: React.ReactNode;
  title: string;
  description: string;
  priority: "Immediate" | "Recommended" | "Preventive";
}

const severeActions: Action[] = [
  { icon: <Car className="h-5 w-5" />, title: "Enforce Odd-Even Vehicle Policy", description: "Restrict private vehicles based on registration number to cut vehicular emissions by ~30%.", priority: "Immediate" },
  { icon: <Factory className="h-5 w-5" />, title: "Shut Down Non-Essential Industries", description: "Temporarily halt polluting industrial units until AQI drops below 200.", priority: "Immediate" },
  { icon: <Flame className="h-5 w-5" />, title: "Ban Firecrackers & Open Burning", description: "Enforce strict ban on crackers and waste burning, especially with upcoming festivals.", priority: "Immediate" },
  { icon: <Droplets className="h-5 w-5" />, title: "Deploy Anti-Smog Guns", description: "Activate water sprinklers and anti-smog guns across high-pollution zones.", priority: "Immediate" },
];

const unhealthyActions: Action[] = [
  { icon: <Truck className="h-5 w-5" />, title: "Restrict Heavy Diesel Vehicles", description: "Ban entry of heavy diesel trucks within city limits during peak hours.", priority: "Recommended" },
  { icon: <Shield className="h-5 w-5" />, title: "Issue Public Health Advisory", description: "Alert sensitive groups (children, elderly) to stay indoors and wear masks.", priority: "Recommended" },
  { icon: <Construction className="h-5 w-5" />, title: "Ban Peak-Hour Construction", description: "Halt construction and demolition activities from 6AM–10AM and 4PM–8PM.", priority: "Recommended" },
  { icon: <Bus className="h-5 w-5" />, title: "Increase Public Transport", description: "Deploy additional buses and metro services to reduce private vehicle usage.", priority: "Recommended" },
];

const moderateActions: Action[] = [
  { icon: <Factory className="h-5 w-5" />, title: "Monitor Industrial Emissions", description: "Conduct surprise inspections to ensure compliance with emission standards.", priority: "Preventive" },
  { icon: <Car className="h-5 w-5" />, title: "Promote Carpool Campaigns", description: "Launch public awareness drives for carpooling and public transport adoption.", priority: "Preventive" },
  { icon: <Droplets className="h-5 w-5" />, title: "Road Dust Suppression", description: "Schedule mechanized sweeping and water sprinkling on major roads.", priority: "Preventive" },
  { icon: <Flame className="h-5 w-5" />, title: "Festival Preparedness Review", description: "Coordinate with local bodies for upcoming festival pollution mitigation plans.", priority: "Preventive" },
];

const priorityStyles: Record<Action["priority"], string> = {
  Immediate: "bg-destructive/15 text-destructive border-destructive/30",
  Recommended: "bg-warning/15 text-warning border-warning/30",
  Preventive: "bg-primary/15 text-primary border-primary/30",
};

const RecommendedActions = ({ city }: { city: City }) => {
  const actions = city.aqi > 200 ? severeActions : city.aqi > 150 ? unhealthyActions : moderateActions;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">📋 Recommended Measures</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, i) => (
          <Card key={i} className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  {action.icon}
                </div>
                <Badge className={`text-[10px] ${priorityStyles[action.priority]}`}>
                  {action.priority}
                </Badge>
              </div>
              <h4 className="text-sm font-semibold text-foreground leading-tight">{action.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedActions;
