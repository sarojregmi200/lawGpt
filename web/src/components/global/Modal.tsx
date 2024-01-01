"use client"
import React from "react"

type TmodelProp = {
    children: React.ReactNode,
    props: {
        modalState: boolean,
        setModelState: React.Dispatch<React.SetStateAction<boolean>>
    }
}

const Modal = ({ children, props: { modalState, setModelState } }: TmodelProp) => {
    const closeModal = () => setModelState(!modalState)
    if (modalState)
        return (
            <div className="main_container w-full h-full absolute top-0 left-0 z-20 flex items-center justify-center" >
                <div className="background bg-d-sec-bg opacity-20 backdrop-blur-[2px] w-full h-full absolute z-10"
                    onClick={closeModal} />
                <div className="content absolute z-10">
                    {children}
                </div>
            </div >
        )
}

export default Modal;
