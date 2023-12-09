import React from "react";

const TimeSeperator = ({ date }: { date: string }) => {
  return (
    <div className="relative flex justify-center align-middle w-full my-[48px]">
      <p className=" bg-d-main-bg px-[24px] z-10  text-xs text-center text-d-inp-placeholder">
        {date}
      </p>
      <div className="absolute bg-d-bot-chat-hr h-[1px] w-[100%] top-[50%] traslate-y-[-50%]">
      </div>
    </div>
  );
};

export default TimeSeperator;
