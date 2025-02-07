import React, { createContext, useContext, useState, useEffect, FC, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/interfaces/User";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session]);

  return <AuthContext.Provider value={{ user, status }}>{children}</AuthContext.Provider>;
};

// Custom hook untuk mengakses AuthContext di komponen lain
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
