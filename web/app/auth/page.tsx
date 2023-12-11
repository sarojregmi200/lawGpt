"use client"
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation"

import { useUserContext } from "@/context/UserContext";


const AuthPage = () => {
    const { setUser } = useUserContext();
    const router = useRouter();
    const handleGoogleAuth = useGoogleLogin({
        onSuccess: (response) => {
            getUserInfoGoogle(response.access_token)
        }
    })

    const getUserInfoGoogle = async (accessToken: string) => {
        if (!accessToken) return;
        const URL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
        try {
            const { data } = await axios.get(URL);
            if (!data.email) return
            console.log(data)
            setUser({ email: data.email, name: data.name, id: data.sub, profile: data.picture })
            router.replace("/chat")
        } catch (e) {
            console.log("Unexpected error occured", e)
        }
    }

    return (
        <button onClick={(e) => {
            handleGoogleAuth();
            e.stopPropagation();
        }}>
            Continue With Google
        </button>
    )
}

export default AuthPage
