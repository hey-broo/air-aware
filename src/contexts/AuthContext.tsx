import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "admin" | "user";

export interface AuthUser {
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const credentials: Record<string, { password: string; role: UserRole }> = {
  admin: { password: "123", role: "admin" },
  user: { password: "123", role: "user" },
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (username: string, password: string): boolean => {
    const cred = credentials[username];
    if (cred && cred.password === password) {
      setUser({ username, role: cred.role });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
