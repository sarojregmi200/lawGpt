"use client"

import React, { createContext, useContext, useState } from "react";

export type TUser = {
    id: string,
    email: string,
    name: string,
    profile: string,
};

export type TUserContext = {
    user: TUser;
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
};

const userCP = createContext<TUserContext | null>(null);

export const UserContextWP = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TUser>({
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

export const useUserContext = (): TUserContext => {
    const userContext = useContext(userCP);
    if (!userContext) throw new Error("User context cannot be used outside userContext Provider");
    return userContext
}
