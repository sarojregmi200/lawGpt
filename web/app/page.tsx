import Image from "next/image";

export default function Home() {
  return (
    <div className=" overflow-hidden h-[100vh] bg-d-side-bg">
      <div className=" flex bg-btn-primary h-[100vh] w-[100vw] items-center  justify-center flex-col rounded-b-[24px] -mt-[15vh]">
        <Image
          className="object-contain h-[40vh] w-[40vh]"
          alt="SL"
          width={500}
          height={500}
          src={"/svg/logo.svg"}
        />
        <h1 className="font-bold text-[80px] mt-10">LAW GPT</h1>
        <p className=" text-[24px]">Your companion in understanding law</p>
      </div>
      <div className="flex  items-center justify-center h-[15vh] ">
        <button className="flex items-center flex-row bg-[rgba(75,79,93,0.5)] px-[40px] font-light text-sm  py-[24px] rounded-sm">
          <Image alt="SL" width={24} height={24} src={"/images/google.png"} className=" h-[30px] w-[30px] object-contain"  />
          <p className=" text-[24px] uppercase ml-4  ">Sign In With Google</p>
        </button>
      </div>
    </div>
  );
}
