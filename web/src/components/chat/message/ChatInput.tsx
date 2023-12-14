"use client";

import Button from "@/components/global/Button";
import { Tmessage } from ".";

const ChatInput = ({
  updateMessages,
}: {
  updateMessages: React.Dispatch<React.SetStateAction<Tmessage[]>>;
}) => {
  const getResponse = (query: string) => {
    const time = new Date();
    const id = "testing" + time;
    const newMessage: Tmessage = {
      message: query,
      id,
      time: time.toString(),
      type: "request",
    };
    updateMessages((previousMessage) => {
      return [newMessage, ...previousMessage];
    });
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
