"use client";

import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import timeFromNow from "@/utils/timeFromNow";

type UserMessageProps = {
    message: string;
    time: Date;
};
const UserMessage = ({
    data: { message, time },
}: {
    data: UserMessageProps;
}) => {
    const { user } = useUserContext();
    return (
        <div className=" my-[24px]">
            <div className="relative w-full h-max">
                <div className="flex justify-between w-full z-10">
                    <Image
                        className="rounded-[5px]"
                        height={"50"}
                        width={"50"}
                        alt="SL"
                        src={user.picture}
                    />
                    <span className="text-xs text-gray-400 mt-auto mb-[20px]">
                        {timeFromNow(time)}
                    </span>
                </div>
                <div className="bg-d-active-chat rounded-[5px] p-[24px]  w-[calc(100%-15px)] mt-[-15px] ml-auto z-0">
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
};

export default UserMessage;
