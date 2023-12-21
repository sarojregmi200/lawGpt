"use client";

import Search from "./Search";
import Button from "@/components/global/Button";
import MessageRoom from "./MessageRoom";
import UserIcon from "@/components/global/UserIcon";
import { useMsgRoomContext } from "@/context/MessageRoomContext";
import { useUserContext } from "@/context/UserContext";
import moment from "moment";

const SideNav = () => {
    const handleThemeChange = () => { };
    const { msgRooms } = useMsgRoomContext()
    const { user } = useUserContext();

    return (
        <div className="w-[20%] min-w-[400px] h-screen  overflow-hidden bg-d-side-bg flex flex-col space-y-[32px] py-[28px] ">
            <div className="flex-row flex space-x-[8px] h-[53px] w-full px-[28px]">
                <Search />
            </div>
            <div className="flex-1 overflow-y-scroll no-scrollbar">
                {msgRooms?.map((msgRoom, index) => (
                    <MessageRoom
                        id={msgRoom.id}
                        key={index}
                        title={msgRoom.title}
                        lastMessage={msgRoom.lastMsg}
                        lastActive={msgRoom.lastActive}
                    />
                ))}
            </div>

            <div className="w-full px-[28px] h-[53px] mt-auto">
                <button className="w-full rounded-sm text-d-side-bg font-medium bg-btn-primary h-full  ">
                    Create New Chat
                </button>
            </div>

            <div className="w-full h-[53px] flex flex-row justify-between px-[20px]  ">
                <div className="flex flex-row space-x-[12px]">
                    <UserIcon />
                    <div>
                        <h3 className="font-medium text-[18px]">{user.name}</h3>
                        <p className="text-16 text-d-txt-sec">
                            {moment.relativeTimeThreshold("ss") && moment(user.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
                <Button name="theme" handleClick={handleThemeChange} />
            </div>
        </div>
    );
};

export default SideNav;
