import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Wind, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate(user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 3) {
      setError("Password must be at least 3 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    // Demo: use existing login flow
    const success = login(username, password);
    if (success) {
      navigate(username === "admin" ? "/admin" : "/dashboard", { replace: true });
    } else {
      setError("Use demo credentials: admin/123 or user/123");
    }
  };

  return (
    <div className="min-h-screen bg-background gradient-mesh flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto glow-primary">
            <Wind className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Create Account</h1>
          <p className="text-xs text-muted-foreground">Join AirAware for free</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="bg-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="bg-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Confirm Password</label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="bg-secondary/50"
            />
          </div>

          {error && <p className="text-xs text-destructive font-medium">{error}</p>}

          <Button type="submit" className="w-full gap-2">
            <UserPlus className="w-4 h-4" />
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>

        <div className="text-center">
          <p className="text-[10px] text-muted-foreground">
            Demo: <span className="font-mono text-foreground">admin/123</span> or{" "}
            <span className="font-mono text-foreground">user/123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
