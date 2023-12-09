import GptMessage from "./MessageGpt";
import UserMessage from "./MessageUser";
import ChatInput from "./ChatInput";

import TimeSeperator from "./TimeSeperator";

const MessageArea = () => {
  return (
    <div className="flex-1 h-screen px-[160px] relative bg-d-main-bg ">
      <div className="w-full  max-w-[800px] mx-auto space-y-[25px] py-25 h-full flex flex-col ">
        <UserMessage userIcon="" message="Hey how are you gpt?" />
        <GptMessage
          message="Hello this is the initial test of the chat."
          refrences={["references are awsome", "This is another one"]}
          date="10:11pm"
        />
        <TimeSeperator date="yesterday" />
      </div>
      <ChatInput />
    </div>
  );
};

export default MessageArea;
