import Image from "next/image";

export default function Home() {
    return (
        <div className=" overflow-hidden h-[100vh] bg-d-side-bg">
            <div className=" flex bg-btn-primary h-[100vh] w-[70vw] items-center  justify-center flex-col rounded-b-[24px]">
                <Image
                    className="object-contain h-[40vh] w-[40vh]"
                    alt="LawGpt"
                    width={500}
                    height={500}
                    src={"/svg/logo.svg"}
                />
                <h1 className="font-bold text-[80px] mt-10">LAW GPT</h1>
                <p className="text-[24px]">Your companion in understanding law</p>
            </div>
        </div>
    );
}
