"use client";

import GptMessage from "./GptMessage";
import UserMessage from "./UserMessage";
import ChatInput from "./ChatInput";
import TimeSeperator from "./TimeSeperator";

import { useEffect, useState } from "react";
import { getSomeMessages } from "../../../../app/chat/[message]/_utils";

type Treference = {
    index: number;
    reference: string;
    referenceLink: string;
};
type Tresponse = {
    type: "response";
    references: Treference[];
};
type Trequest = {
    type: "request";
};
export type Tmessage = {
    id: string;
    message: string;
    time: string;
} & (Trequest | Tresponse);

const MessageArea = ({ id }: { id: string }) => {
    const [messages, setMessages] = useState<Tmessage[]>([]);
    useEffect(() => {
        (async () => {
            const messages = await getSomeMessages({ roomId: id })
            if (messages instanceof Error)
                return
            setMessages([...messages.reverse()])
        })()
    }, [])
    return (
        <div className="flex-1 h-screen px-[160px] relative bg-d-main-bg overflow-y-scroll">
            <div className="w-full  max-w-[800px] mx-auto space-y-[25px] py-25 h-full flex flex-col-reverse overflow-auto b-[106px] no-scrollbar">
                <TimeSeperator date="yesterday" />
                {messages.map((message_data) => {
                    return message_data.type === "request" ? (
                        <UserMessage data={message_data} key={message_data.id} />
                    ) : (
                        <GptMessage data={message_data} key={message_data.id} />
                    );
                })}
            </div>
            <ChatInput updateMessages={setMessages} roomId={id} />
        </div>
    );
};

export default MessageArea;
