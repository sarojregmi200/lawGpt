"use client";

import { useUserContext } from "@/context/UserContext";
import React from "react";
import { redirect } from "next/navigation";

const AuthProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { user } = useUserContext();
  if (!user.id) redirect("/auth");

  return <>{children}</>;
};
export default AuthProtectedRoute;