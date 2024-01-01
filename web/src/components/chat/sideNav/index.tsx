"use client";

import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import Button from "@/components/global/Button";
import MessageRoom from "./MessageRoom";
import UserIcon from "@/components/global/UserIcon";
import { TMsgRoom, useMsgRoomContext } from "@/context/MessageRoomContext";
import { useUserContext } from "@/context/UserContext";
import moment from "moment";
import Modal from "@/components/global/Modal";
import { createNewMsgRoom, getAllMsgRooms } from "../../../../app/chat/[message]/_utils";

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

        const newMessageRoom: TMsgRoom | Error = await createNewMsgRoom(messageRoomName, messageRoomCountry);

        if (newMessageRoom instanceof Error)
            // may be something like a toas saying user something went wrong
            return

        setMsgRooms((prev) => [...prev, newMessageRoom])
        setChatCreationModal(false)
    }

    useEffect(() => {
        (async () => {
            const allMessageRooms = await getAllMsgRooms();
            if (allMessageRooms instanceof Error)
                // toast or something stating there is a error
                return
            setMsgRooms(allMessageRooms)
        }
        )()
    }, [])

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
                    <button className="w-full rounded-sm text-d-side-bg font-medium bg-btn-primary h-full"
                        onClick={createChatRoom}>
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
                <div className="items_container bg-d-side-bg w-[500px] h-[320px] rounded-sm p-[20px] space-y-5">
                    <div className="country_container space-y-2 w-full">
                        <h1 className="uppercase text-white">
                            Select A country
                        </h1>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            placeholder="Which country should I focus"
                            ref={newMessageRoomInput}
                            className="w-full rounded-[5px] bg-d-sec-bg px-3 py-2"
                        />
                    </div>
                    <div className="name_container space-y-2 w-full">
                        <h1 className="uppercase text-white">
                            chat name
                        </h1>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nepal's law on crypto"
                            ref={newMessageRoomInput}
                            className="w-full rounded-[5px] bg-d-sec-bg px-3 py-2"
                        />
                    </div>
                    <button
                        className="px-3 py-2 max-w-[200px] rounded-sm bg-btn-primary text-d-sec-bg w-full font-medium"
                        onClick={createMessageRoom}>
                        Create Room
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default SideNav;
