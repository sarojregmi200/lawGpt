"use client"

import React, { createContext, useContext, useState } from "react";

export type user = {
    id: string,
    email: string,
    name: string,
    profile: string,
};

export type userContext = {
    user: user;
    setUser: React.Dispatch<React.SetStateAction<user>>;
};

const userCP = createContext<userContext | null>(null);

export const UserContextWP = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<user>({
        id: "",
        email: "",
        name: "",
        profile: "",
    })

    return (
        <userCP.Provider value={{ user, setUser }}>
            {children}
        </userCP.Provider>
    )
}

export const useUserContext = (): userContext => {
    const msgRoomContext = useContext(userCP);
    if (!msgRoomContext) throw new Error("User room context cannot be used outside userContext Provider");
    return msgRoomContext
}
