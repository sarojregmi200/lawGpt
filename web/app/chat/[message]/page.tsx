"use client";

import MessageArea from "@/components/chat/message";
import { useParams } from "next/navigation";
import React from "react";

const Message = () => {
    const param = useParams();
    const messageRoomId: string = (param.message) as string
    return <MessageArea id={messageRoomId} />;
};

export default Message;
