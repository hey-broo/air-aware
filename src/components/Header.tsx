import { Activity, Wind } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center glow-primary">
            <Wind className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Pollution Intelligence Grid
            </h1>
            <p className="text-xs text-muted-foreground">Virtual AI-Powered Monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-safe/10 border border-safe/20">
            <Activity className="w-3.5 h-3.5 text-safe animate-pulse-glow" />
            <span className="text-xs font-medium text-safe">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
