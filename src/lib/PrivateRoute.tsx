import type { RootState } from "@/store";
import type React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.admin);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
