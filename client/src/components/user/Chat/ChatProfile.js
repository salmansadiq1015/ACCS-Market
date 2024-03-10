import React from "react";
import { IoClose } from "react-icons/io5";

import { useAuth } from "../../../context/authContext";

export default function ChatProfile({ setIsShow }) {
  const { auth, selectedChat } = useAuth();

  return (
    <div className=" flex items-center justify-center w-full h-full ">
      <div className=" w-[20rem] sm:w-[28rem] bg-white py-8 px-4 rounded-md shadow-md shadow-sky-400">
        <div className="flex items-center justify-end">
          <span
            className="p-[2px] border border-zinc-300 rounded-md cursor-pointer shadow-lg text-white hover:text-sky-500"
            onClick={() => setIsShow(false)}
          >
            <IoClose className="h-5 w-5 text-gray-900" />
          </span>
        </div>
        <div className="flex items-center justify-center flex-col gap-2 mt-[-1rem]">
          <img
            src={
              auth?.user?.id === selectedChat?.users[0]?._id
                ? `/api/v1/user/user-avatar/${selectedChat?.users[1]?._id}`
                : `/api/v1/user/user-avatar/${selectedChat?.users[0]?._id}`
            }
            alt="Avatar"
            className="h-[6rem] w-[6rem] rounded-full border-2 border-green-500 shadow-md shadow-gray-300 filter drop-shadow-md"
          />
          <h1 className="text-2xl font-semibold text-gray-950">
            {selectedChat?.chatName === "sender"
              ? selectedChat?.users[1]?.name
              : selectedChat?.chatName}
          </h1>
          <span className="text-[16px] font-semibold text-gray-700">
            {selectedChat?.chatName === "sender"
              ? selectedChat?.users[1]?.email.slice(0, 5)
              : ""}
            <span className="text-red-500">*********</span>
            {selectedChat?.chatName === "sender" &&
              selectedChat?.users[1]?.email.slice(16, 30)}
          </span>
        </div>
      </div>
    </div>
  );
}
