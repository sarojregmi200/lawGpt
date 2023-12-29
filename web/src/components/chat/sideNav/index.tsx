"use client";

import { useRef, useState } from "react";
import Search from "./Search";
import Button from "@/components/global/Button";
import MessageRoom from "./MessageRoom";
import UserIcon from "@/components/global/UserIcon";
import { TMsgRoom, useMsgRoomContext } from "@/context/MessageRoomContext";
import { useUserContext } from "@/context/UserContext";
import moment from "moment";
import Modal from "@/components/global/modal";
import { createNewMsgRoomServer } from "../../../../app/chat/[message]/_utils";

const SideNav = () => {
    const handleThemeChange = () => { };
    const { msgRooms, setMsgRooms } = useMsgRoomContext()
    const { user } = useUserContext();
    const newMessageRoomInput = useRef<HTMLInputElement | null>(null)

    const [chatCreationModal, setChatCreationModal] = useState<boolean>(false);

    const createChatRoom = () => {
        setChatCreationModal(true)
    }

    const createMessageRoom = async () => {
        if (!newMessageRoomInput.current)
            return
        const messageRoomName = newMessageRoomInput.current.value;
        const messageRoomCountry = "Nepal"

        const newMessageRoom: TMsgRoom | Error = await createNewMsgRoomServer(messageRoomName, messageRoomCountry);

        if (newMessageRoom instanceof Error)
            // may be something like a toas saying user something went wrong
            return

        setMsgRooms((prev) => [...prev, newMessageRoom])
        console.log(newMessageRoom)
        setChatCreationModal(false)

    }

    return (
        <>
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
                    <button className="w-full rounded-sm text-d-side-bg font-medium bg-btn-primary h-full" onClick={createChatRoom}>
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
            <Modal props={{ modalState: chatCreationModal, setModelState: setChatCreationModal }}>
                <div className="items_container bg-d-sec-bg w-[400px] h-[300px] rounded-sm">
                    <input type="text" name="name" id="name" placeholder="Enter the name of the MessageRoom" ref={newMessageRoomInput} /> <br />
                    <button className="p-10 bg-btn-primary text-d-sec-bg" onClick={createMessageRoom}> Create Room</button>
                </div>
            </Modal>
        </>
    );
};

export default SideNav;
