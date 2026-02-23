import { Activity, Wind, LogOut, Shield, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navLinks = user?.role === "admin"
    ? [
        { label: "Admin", path: "/admin", icon: Shield },
        { label: "Home", path: "/", icon: Wind },
      ]
    : [
        { label: "Dashboard", path: "/dashboard", icon: User },
        { label: "Home", path: "/", icon: Wind },
      ];

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
          {/* Nav links */}
          {user && navLinks.map(link => (
            <Button
              key={link.path}
              variant={location.pathname === link.path ? "default" : "ghost"}
              size="sm"
              className="text-xs gap-1.5"
              onClick={() => navigate(link.path)}
            >
              <link.icon className="w-3.5 h-3.5" />
              {link.label}
            </Button>
          ))}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-safe/10 border border-safe/20">
            <Activity className="w-3.5 h-3.5 text-safe animate-pulse-glow" />
            <span className="text-xs font-medium text-safe">Live</span>
          </div>

          {user && (
            <div className="flex items-center gap-2 ml-2">
              <span className={`aqi-badge text-[10px] ${user.role === "admin" ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"}`}>
                {user.role}
              </span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleLogout} title="Logout">
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
