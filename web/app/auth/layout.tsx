"use client"
import { useUserContext } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getPersonalInfo } from "./getAuthenticatedUserData";

type TStoredAuthStatus = {
    status: "Checking" | "Authenticated" | "NotAuthenticated",
    message: string
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user, setUser } = useUserContext();
    const router = useRouter();
    const [StoredAuthStatus, setStoredAuthStatus] = useState<TStoredAuthStatus>({ status: "Checking", message: "Checking auth status" })

    useEffect(() => {
        if (!user._id)
            getPersonalInfo().then((res) => {
                if (res instanceof Error)
                    return setStoredAuthStatus({
                        status: "NotAuthenticated",
                        message: "Error occured while getting Personal Info"
                    })
                setUser(res)
                setStoredAuthStatus({ status: "Authenticated", message: "Redirecting to chat" })
                router.replace("/chat")
            })
    }, [])

    return (
        <>
            {
                (StoredAuthStatus.status === "Checking" || StoredAuthStatus.status === "Authenticated") ? (
                    <p>{StoredAuthStatus.message}</p>
                ) : (
                    <GoogleOAuthProvider clientId={(process.env.NEXT_PUBLIC_G_AUTH_CLIENT_ID) as string}>
                        {children}
                    </GoogleOAuthProvider>
                )
            }
        </>
    )
}
