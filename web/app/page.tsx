"use client"
import { useUserContext } from "@/context/UserContext";
import { getUserFromCookie } from "@/utils/getUserStoredInCookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter()
    const { user, setUser } = useUserContext();

    useEffect(() => {
        if (!user.id)
            getUserFromCookie().then((res) => {
                if (res instanceof Error)
                    return router.push("/auth")
                setUser(res)
            });
    }, [])

    return (
        <div className=" overflow-hidden h-[100vh] bg-d-side-bg">
            <div className=" flex bg-btn-primary h-[100vh] w-[70vw] items-center  justify-center flex-col rounded-b-[24px]">
                <Image
                    className="object-contain h-[40vh] w-[40vh]"
                    alt="LawGpt"
                    width={500}
                    height={500}
                    src={"/svg/logo.svg"}
                />
                <h1 className="font-bold text-[80px] mt-10">LAW GPT</h1>
                <p className="text-[24px]">Your companion in understanding law</p>
            </div>
        </div>
    );
}
