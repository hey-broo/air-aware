import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wind, Shield, BarChart3, Zap, Globe, MapPin, Activity,
  ArrowRight, Sun, Moon, Users, Brain, Bell, Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMap from "@/assets/hero-map.webp";

const Index = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const capabilities = [
    { icon: Globe, title: "Virtual Sensors", desc: "AI-modeled air quality across 50+ Indian cities — zero hardware." },
    { icon: Brain, title: "Predictive Intelligence", desc: "48-hour AQI forecasts with 94% accuracy using ML models." },
    { icon: Bell, title: "Smart Alerts", desc: "Real-time notifications when pollution spikes threaten your area." },
    { icon: Zap, title: "What-If Simulator", desc: "Model policy impacts — odd-even, factory shutdowns, cracker bans." },
  ];

  const stats = [
    { value: "50+", label: "Cities Monitored" },
    { value: "94%", label: "Forecast Accuracy" },
    { value: "24/7", label: "Real-Time Tracking" },
    { value: "10K+", label: "Daily Insights" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-card/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center glow-primary">
              <Wind className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight">Pollution Intelligence Grid</span>
              <span className="hidden sm:inline text-[10px] text-muted-foreground ml-2 uppercase tracking-widest">by AirAware</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-5">
            {["Overview", "Capabilities", "Impact"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTheme} title="Toggle theme">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <Activity className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Live</span>
            </div>

            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button size="sm" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="overview" className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <img src={heroMap} alt="" className="w-full h-full object-cover opacity-[0.07]" />
          <div className="absolute inset-0 gradient-mesh" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-8 tracking-wide">
              <Gauge className="w-3.5 h-3.5" />
              AI-Powered · Software-Only · People-First
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
              India's Smartest{" "}
              <span className="text-primary text-glow">Pollution</span>
              <br />
              Intelligence Platform
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Turning complex air quality data into simple, visual, and actionable insights —
              no physical sensors required. Built for citizens, researchers, and policy-makers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Button size="lg" className="gap-2 px-8 text-base" onClick={() => navigate("/login")}>
                <MapPin className="w-4 h-4" />
                Public Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base" onClick={() => navigate("/login")}>
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Demo credentials: <span className="font-mono text-foreground/80">user / 123</span> · <span className="font-mono text-foreground/80">admin / 123</span>
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-16">
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-primary">{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="py-20 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              What Makes Us <span className="text-primary">Different</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              No expensive sensor networks. No maintenance headaches. Just intelligent software that works.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="glass-card rounded-xl p-6 group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact / How it works ── */}
      <section id="impact" className="py-20 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 md:p-14 max-w-4xl mx-auto text-center glow-primary">
            <Users className="w-10 h-10 text-primary mx-auto mb-5" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Empowering Pollution Control Departments
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Our Admin Dashboard gives policy-makers real-time AQI monitoring, recommended emergency measures,
              predictive alerts, and a what-if simulator to test policy impact before enforcement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="gap-2" onClick={() => navigate("/login")}>
                Explore the Platform <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="ghost" className="gap-2 text-muted-foreground" onClick={() => navigate("/signup")}>
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">AirAware</span>
            <span className="text-xs text-muted-foreground">— Pollution Intelligence Grid</span>
          </div>
          <p className="text-xs text-muted-foreground italic max-w-md text-center">
            "A people-first, software-only AI platform that turns complex pollution data into simple, visual, and actionable insights for everyone."
          </p>
          <p className="text-xs text-muted-foreground">© 2026 AirAware</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
