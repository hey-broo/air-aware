import { useNavigate } from "react-router-dom";
import { Wind, Shield, BarChart3, Zap, Globe, Users, Check, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Globe,
    title: "Real-Time Monitoring",
    desc: "Track air quality across cities with AI-powered virtual sensors — no physical hardware needed.",
  },
  {
    icon: Shield,
    title: "Early-Warning Alerts",
    desc: "Get instant notifications when pollution crosses dangerous thresholds in your area.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    desc: "Machine-learning models forecast AQI trends 48 hours ahead with 94% accuracy.",
  },
  {
    icon: Zap,
    title: "What-If Simulator",
    desc: "Model the impact of policy changes — odd-even rules, factory shutdowns, and more.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "For individuals and small teams getting started.",
    features: ["1 city monitoring", "Daily AQI reports", "Email alerts", "Community support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹2,499",
    period: "/mo",
    desc: "For organizations that need deeper insights.",
    features: ["Up to 10 cities", "Real-time dashboards", "What-If simulator", "Priority support", "API access"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For government bodies and large enterprises.",
    features: ["Unlimited cities", "Custom integrations", "Dedicated account manager", "SLA guarantee", "On-premise option"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-card/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wind className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">AirAware</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {["Home", "Features", "Pricing", "About"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button size="sm" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative container mx-auto px-4 py-24 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
            <Zap className="w-3 h-3" /> AI-Powered Pollution Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4 max-w-3xl mx-auto leading-tight">
            Build Smarter.{" "}
            <span className="text-primary text-glow">Launch Faster.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
            A people-first, software-only AI platform that turns complex pollution data into simple, visual, and actionable insights for everyone.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button size="lg" className="gap-2" onClick={() => navigate("/signup")}>
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No credit card required · Free tier available</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Everything You Need</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Comprehensive tools to monitor, predict, and act on air quality — powered by cutting-edge AI.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card p-6 rounded-xl group hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.03]"
                    : "border-border/50 bg-card/60 backdrop-blur-sm"
                }`}
              >
                {plan.highlighted && (
                  <span className="inline-block self-start text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <div className="mt-2 mb-1">
                  <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">{plan.desc}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => navigate("/signup")}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass-card rounded-2xl p-10 md:p-16 text-center glow-primary">
          <Users className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Ready to breathe easier?
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            Join thousands of citizens, researchers, and policy-makers using AirAware to fight pollution with data.
          </p>
          <Button size="lg" className="gap-2" onClick={() => navigate("/signup")}>
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-border/30 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Wind className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground">AirAware</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                AI-powered pollution intelligence for a cleaner tomorrow.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">Features</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">API Docs</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">About</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground">© 2026 AirAware. All rights reserved.</p>
            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
