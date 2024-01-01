"use client";

import GptMessage from "./GptMessage";
import UserMessage from "./UserMessage";
import ChatInput from "./ChatInput";
import TimeSeperator from "./TimeSeperator";

import { useEffect, useState } from "react";
import { getSomeMessages } from "../../../../app/chat/[message]/_utils";

type Treference = {
    _id: string,
    reference: string;
    reference_link: string;
};
export type Tmessage = {
    id: string;
    message: string;
    time: Date;
    references: Treference[];
    gpt_response: string;
};

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
        <div className="flex-1 h-screen px-[160px] relative bg-d-main-bg overflow-y-scroll pb-[100px]">
            <div className="w-full  max-w-[800px] mx-auto space-y-[25px] py-25 h-full flex flex-col-reverse overflow-auto b-[106px] no-scrollbar">
                {messages.map(({ message, gpt_response, time, references, id }) => {
                    return (
                        <div key={id}>
                            <UserMessage data={{ message, time }} />
                            <GptMessage data={{ message: gpt_response, time, references }} />
                        </div>)
                })}
            </div>
            <ChatInput updateMessages={setMessages} roomId={id} />
        </div>
    );
};

export default MessageArea;
