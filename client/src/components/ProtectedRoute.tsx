import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useApp();
  const [, setLocation] = useLocation();

  if (!state.user) {
    setLocation("/login");
    return null;
  }

  return <>{children}</>;
}
