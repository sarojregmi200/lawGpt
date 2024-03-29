import { useUserContext } from "@/context/UserContext";
import Image from "next/image";

const UserIcon = () => {
    const { user: { picture } } = useUserContext();
    return (
        <div className="w-[53px] h-[53px] bg-yellow-300 rounded-sm overflow-hidden">
            <Image src={picture} alt="profile_image" width={53} height={53} />
        </div>
    );
};

export default UserIcon;
