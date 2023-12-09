import SideNav from "@/components/chat/sideNav";
import { MsgRoomContextWP } from "@/context/MessageRoomContext";

export default function ChatLayout(
    { children }: { children: React.ReactNode },
) {
    return (
        <div className="flex flex-row w-screen h-screen overflow-hidden">
            <MsgRoomContextWP >
                <SideNav />
                {children}
            </MsgRoomContextWP>
        </div>
    );
}
