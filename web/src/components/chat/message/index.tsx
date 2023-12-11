"use client"

import GptMessage from "./MessageGpt";
import UserMessage from "./MessageUser";
import ChatInput from "./ChatInput";
import TimeSeperator from "./TimeSeperator";

import { useState } from "react";

type Treference = {
    index: number;
    reference: string;
    referenceLink: string;
}
type Tresponse = {
    type: "response";
    references: Treference[];
}
type Trequest = {
    type: "request"
}
export type Tmessage = {
    id: string;
    message: string;
    time: string;
} & (Trequest | Tresponse);


const MessageArea = ({ id }: { id: string }) => {
    const [messages, setMessages] = useState<Tmessage[]>([])
    return (
        <div className="flex-1 h-screen px-[160px] relative bg-d-main-bg ">
            <div className="w-full  max-w-[800px] mx-auto space-y-[25px] py-25 h-full flex flex-col ">
                <TimeSeperator date="yesterday" />
                {
                    messages.map((message_data) => {
                        return (
                            message_data.type === "request"
                                ? <UserMessage data={message_data} key={message_data.id} />
                                : <GptMessage data={message_data} key={message_data.id} />
                        )
                    })

                }
            </div>
            <ChatInput updateMessages={setMessages} />
        </div>
    );
};

export default MessageArea;
