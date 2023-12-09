import React from "react";
import { TMsgRoom, useMsgRoomContext } from "@/context/MessageRoomContext"
const Search = () => {
    const { msgRooms, setMsgRooms } = useMsgRoomContext();

    const handleSearch = (searchText: string) => {
        if (!searchText.trim()) return

        setMsgRooms(() => {
            const filteredMsgRooms = msgRooms.filter((msgRoom: TMsgRoom) =>
                msgRoom.title.toLowerCase().includes(searchText.toLowerCase())
            );
            return filteredMsgRooms
        })
    };
    return (
        <input
            type="text"
            className="bg-d-main-bg flex-1 border-none outline-none h-full rounded-sm px-[16px]"
            placeholder="Search"
            onKeyDown={(e) => {
                handleSearch(e.currentTarget.value);
            }}
            onChange={(e) => {
                handleSearch(e.currentTarget.value);
            }}
        />
    );
};

export default Search;
