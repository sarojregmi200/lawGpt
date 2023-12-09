"use client"
import { UserContextWP } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId={(process.env.NEXT_PUBLIC_G_AUTH_CLIENT_ID) as string}>
            {children}
        </GoogleOAuthProvider>
    )

}
