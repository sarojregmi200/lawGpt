"use client";

import Button from "@/components/global/Button";
import { Tmessage } from ".";
import { addMessageToMessageRoom } from "../../../../app/chat/[message]/_utils";
import { useMsgRoomContext } from "@/context/MessageRoomContext";

const ChatInput = ({
    updateMessages,
    roomId
}: {
    updateMessages: React.Dispatch<React.SetStateAction<Tmessage[]>>;
    roomId: string
}) => {
    const { setMsgRooms } = useMsgRoomContext();
    const getResponse = (query: string) => {
        const time = new Date();
        const id = crypto.randomUUID();
        const newMessage: Tmessage = {
            message: query,
            id,
            time: time,
            gpt_response: "I am thinking",
            references: []
        };
        updateMessages((previousMessage) => {
            return [newMessage, ...previousMessage];
        });

        // sending the messages to db 
        addMessageToMessageRoom({ roomId: roomId, message: query }).then(res => {
            if (res instanceof Error)
                // some shot or toast or something for the user
                return
            updateMessages((previousMessages) => {
                const previouslyRespondedMessages = previousMessages.filter(message => message.id !== id)
                return [res, ...previouslyRespondedMessages]
            })
        })

        const currentTime = new Date()
        setMsgRooms((previousMsgRoom) => (
            previousMsgRoom.map((room) => {
                if (room.id === roomId)
                    return { ...room, lastActive: currentTime, lastMsg: query }
                return room
            }))
        )

        // getting the server gpt response and updating it here
    };

    const handleChatSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        const chatInputElem = document.getElementById("chatInput");
        e.preventDefault();
        e.stopPropagation(); // disabling further clicks or propagation of the event in case of click.

        const formData = new FormData(e.currentTarget);
        const chatQuery = (formData.get("chatInput") as string).trim();

        if (!chatQuery || !chatInputElem) return;

        // submit the form
        getResponse(chatQuery);
        // clearing the
        (chatInputElem as HTMLInputElement).value = "";
    };
    return (
        <form
            className="absolute h-[53px] w-[calc(100%-320px)] bottom-[28px] z-10 flex space-x-[8px] "
            onSubmit={handleChatSubmission}
        >
            <input
                id="chatInput"
                name="chatInput"
                type="text"
                className="bg-d-sec-bg flex-1 w-full border-none outline-none h-full rounded-sm px-[16px]"
                placeholder="Ask me anything about the law"
            />
            <Button name="send" />
        </form>
    );
};

export default ChatInput;
