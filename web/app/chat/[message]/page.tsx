"use client";

import MessageArea from "@/components/chat/message";
import { useParams } from "next/navigation";
import React from "react";

const Message = () => {
    const param = useParams();
    return <MessageArea />;
};

export default Message;
