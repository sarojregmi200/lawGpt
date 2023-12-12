import Image from "next/image";
import Link from "next/link";
import React from "react";

const RefrenceBox = ({ index, text }: any) => {
    return (
        <div className="px-[16px] py-[8px] bg-d-bot-chat-ref rounded-[5px] inline-flex mr-[8px]">
            {index}. {text}
        </div>
    );
};

type MessageGptProps = {
    message: string;
    references: {
        index: number;
        reference: string;
        referenceLink: string;
    }[];
    time: string;
};

const GptMessage = ({ data: { message, references, time } }: { data: MessageGptProps }) => {
    return (
        <div className="mt-0 my-[24px] w-full ">
            <div className="relative h-full">
                <div className="flex justify-between  w-full z-10">
                    <Image
                        className="rounded-[5px]"
                        height={"50"}
                        width={"50"}
                        alt="SL"
                        src={"/svg/gptIcon.svg"}
                    />
                    <span className=" text-xs text-gray-400 mt-auto mb-[20px]">
                        {time}
                    </span>
                </div>
                <div className="bg-d-bot-chat rounded-[5px] py-[20px]  w-[calc(100%-15px)] ml-auto mt-[-15px] z-0">
                    <div className="px-[24px] ">{message}</div>
                    <div className="my-[16px] bg-gray-700 h-[.5px] "></div>
                    <div className="px-[24px] ">
                        {references.map((reference) => (
                            <Link href={reference.referenceLink}>
                                <RefrenceBox index={reference.index} text={reference} key={reference.index} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GptMessage;
