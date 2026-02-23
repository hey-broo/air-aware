import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wind, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect
  if (user) {
    navigate(user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(username, password);
    if (success) {
      const cred = username === "admin" ? "/admin" : "/dashboard";
      navigate(cred, { replace: true });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-background gradient-mesh flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto glow-primary">
            <Wind className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Pollution Intelligence Grid</h1>
          <p className="text-xs text-muted-foreground">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Username</label>
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin or user"
              className="bg-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-secondary/50"
            />
          </div>

          {error && (
            <p className="text-xs text-destructive font-medium">{error}</p>
          )}

          <Button type="submit" className="w-full gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </form>

        <div className="text-center space-y-1">
          <p className="text-[10px] text-muted-foreground">
            Demo credentials: <span className="font-mono text-foreground">admin/123</span> or <span className="font-mono text-foreground">user/123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
