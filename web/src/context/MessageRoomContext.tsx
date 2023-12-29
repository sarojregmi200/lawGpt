"use client"

import React, { createContext, useContext, useState } from "react";

export type TMsgRoom = {
    id: string;
    title: string;
    lastMsg: string;
    lastActive: string;
    userId: string;
    country: string;
    messages: TMsg[]
};

export type TMsg = {
    id: string;
    message: string;
    time: string;
    type: "response" | "request"
};

export type TMsgRoomContext = {
    msgRooms: TMsgRoom[];
    setMsgRooms: React.Dispatch<React.SetStateAction<TMsgRoom[]>>;
};

const MsgRoomCP = createContext<TMsgRoomContext | null>(null);

export const MsgRoomContextWP = ({ children }: { children: React.ReactNode }) => {
    const [msgRooms, setMsgRooms] = useState<TMsgRoom[]>([])
    return (
        <MsgRoomCP.Provider value={{ msgRooms, setMsgRooms }}>
            {children}
        </MsgRoomCP.Provider>
    )
}

export const useMsgRoomContext = (): TMsgRoomContext => {
    const msgRoomContext = useContext(MsgRoomCP);
    if (!msgRoomContext) throw new Error("Message room context cannot be used outside messageRoomContext Provider");

    return msgRoomContext
}
