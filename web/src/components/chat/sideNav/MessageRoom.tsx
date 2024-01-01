import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import moment from "moment";
import timeFromNow from "@/utils/timeFromNow";

type MessageRoomProps = {
    id: string;
    title: string;
    lastMessage: string;
    lastActive: Date;
};

const MessageRoom = ({
    id,
    title,
    lastMessage,
    lastActive,
}: MessageRoomProps) => {
    const { message } = useParams();
    const activeStyle = message === id ? "bg-d-active-chat" : "bg-d-side-bg";

    return (
        <Link href={`/chat/${id}`} replace scroll={false}>
            <div className={`w-full px-[28px] h-[110px] py-[16px] ${activeStyle}`}>
                <div className="flex flex-row justify-between align-bottom">
                    <h3 className="flex-1 font-bold text-[18px]">{title}</h3>
                    <div className="text-[12px] text-d-txt-sec">{timeFromNow(lastActive)}</div>
                </div>
                <p className="mt-[5px] text-d-txt-sec  line-clamp-2 ">{lastMessage}</p>
            </div>
        </Link>
    );
};

export default MessageRoom;
