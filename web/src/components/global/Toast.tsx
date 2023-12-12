import Image from "next/image";
import React from "react";

type ToastProps = {
  message: string;
  type: string;
  icon: string;
};
const Toast = ({ message, type, icon }: ToastProps) => {
  return (
    <div
      className={`toast toast--${type} absolute bottom-[50px] bg-white px-10 py-5`}
    >
      <Image
        width={20}
        height={20}
        src={icon}
        alt={`${type} icon`}
        className="toast__icon"
      />
      <div className="toast__message text-d-side-bg text-xl">{message}</div>
    </div>
  );
};

export default Toast;
