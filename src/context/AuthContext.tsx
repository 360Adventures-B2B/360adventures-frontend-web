"use client";
import React, { createContext, useContext, useState, useEffect, FC, type ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/interfaces/User";
import { useRouter } from "next/navigation";

export let globalUpdateToken: (token: string) => Promise<void> = async () => {};

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  handleLogout: () => Promise<void>;
  updateIsVerify: (isVerify: boolean) => Promise<void>;
  updateToken: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<User | null>(null);
  console.log("🚀 ~ session:", session);

  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session]);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateIsVerify = async (isVerify: boolean): Promise<void> => {
    if (session?.user) {
      await update({
        isVerify: isVerify,
      });
    }
  };

  const updateToken = async (token: string): Promise<void> => {
    if (session?.user) {
      await update({
        token: token,
      });
    }
  };

  useEffect(() => {
    globalUpdateToken = updateToken;
  }, [updateToken]);

  return (
    <AuthContext.Provider value={{ user, status, handleLogout, updateIsVerify, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk mengakses AuthContext di komponen lain
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
