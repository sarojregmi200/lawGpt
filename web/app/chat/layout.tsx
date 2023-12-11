import SideNav from "@/components/chat/sideNav";
import AuthProtectedRoute from "@/components/global/AuthProtectedRoute";
import { MsgRoomContextWP } from "@/context/MessageRoomContext";

export default function ChatLayout(
    { children }: { children: React.ReactNode },
) {
    return (
        <div className="flex flex-row w-screen h-screen overflow-hidden">
            <AuthProtectedRoute >
                <MsgRoomContextWP >
                    <SideNav />
                    {children}
                </MsgRoomContextWP>
            </AuthProtectedRoute>
        </div>
    );
}
