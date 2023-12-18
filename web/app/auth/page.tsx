"use client"
import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation"
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import { getAuthenticatedUserInfoGoogle } from "./getAuthenticatedUserData";
import { setCookie } from "@/utils/cookies";
import { getUserFromCookie } from "@/utils/getUserStoredInCookie";

type TAuthStatus = {
    message: string,
    type: "error" | "success"
}

const AuthPage = () => {
    const { user, setUser } = useUserContext();
    const [AuthStatus, setAuthStatus] = useState<TAuthStatus>({ message: "", type: "success" })

    const router = useRouter();

    useEffect(() => {
        if (user.id)
            return router.back();

        getUserFromCookie().then((res) => {
            if (res instanceof Error)
                return;

            setUser(res)
            router.replace("/chat")
        });
    }, [])
    const handleGoogleAuth = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const user = await getAuthenticatedUserInfoGoogle(response.access_token)
                if (user instanceof Error)
                    return console.log("Unexpected error occured")
                // auth successfull
                setUser(user)

                // setting cookies
                const cookie = setCookie("g_access_token", response.access_token)
                if (cookie instanceof Error) {
                    console.log("Error while setting cookie")
                }
                setAuthStatus(() => ({ message: "Authentication successful, Redirecting to chat", type: "success" }))
                router.replace("/chat")
            }
            catch (e) {
                setAuthStatus(() => ({ message: "Sorry, Authentication failed \n error" + e, type: "error" }))
            }
        }
    })


    return (
        <div className=" overflow-hidden h-[100vh] bg-d-side-bg">
            <div className=" flex bg-btn-primary h-[100vh] w-[100vw] items-center  justify-center flex-col rounded-b-[24px] -mt-[15vh]">
                <Image
                    className="object-contain h-[40vh] w-[40vh]"
                    alt="LawGpt"
                    width={500}
                    height={500}
                    src={"/svg/logo.svg"}
                />
                <h1 className="font-bold text-[80px] mt-10">LAW GPT</h1>
                <p className=" text-[24px]  ">Your companion in understanding law</p>
            </div>
            <div className="flex  items-center justify-center h-[15vh] ">
                <button className="flex items-center flex-row bg-[rgba(75,79,93,0.5)] px-[40px] font-light text-sm  py-[24px] rounded-sm"
                    onClick={(e) => {
                        handleGoogleAuth();
                        e.stopPropagation();
                    }}>
                    <Image alt="SL" width={24} height={24} src={"/images/google.png"} className=" h-[30px] w-[30px] object-contain" />
                    <p className=" text-[24px] uppercase ml-4  ">Sign In With Google</p>
                </button>
                {!AuthStatus ? "" :
                    <p className={`${AuthStatus?.type === "success" ? "text-green-300" : "text-red-300"}`}>
                        {AuthStatus.message}
                    </p>
                }
            </div>
        </div>
    )
}

export default AuthPage
