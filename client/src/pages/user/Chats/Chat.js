import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ChatUsers from "../../../components/user/Chat/ChatUsers";
import { useAuth } from "../../../context/authContext";
import { FaEye } from "react-icons/fa6";
import ChatSection from "../../../components/user/Chat/ChatSection";
import ChatProfile from "../../../components/user/Chat/ChatProfile";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [left, setLeft] = useState(true);
  const [selected, setSelected] = useState(false);
  const { selectedChat, auth } = useAuth();
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* // Chat */}
      <div className="  relative flex gap-1 flex-1 flex-col sm:flex-row ">
        {/* -----left Sidebar-------- */}
        <span
          className=" absolute top-2 left-3 z-40 cursor-pointer flex md:hidden"
          onClick={() => setLeft(!left)}
        >
          {left ? (
            ""
          ) : (
            <RiMenuUnfoldFill className="h-5 w-5 text-green-900  cursor-pointer" />
          )}
        </span>
        <div
          className={` md:flex-[.25]  md:relative ${
            left ? "" : "hidden"
          } md:block absolute top-0 left-0 w-[19rem] h-[99vh] rounded-none shadow-xl md:rounded-md mt-0 sm:mt-1 py-6 px-2 bg-gray-200 sm:bg-gray-100 z-[50]`}
        >
          {/* Close */}
          <div className="flex items-center justify-end md:hidden">
            <span
              className="p-1 bg-gray-800 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-950 "
              onClick={() => setLeft(false)}
            >
              <IoClose className="h-5 w-5 text-white cursor-pointer" />
            </span>
          </div>
          {/* Users */}
          <div className="">
            <ChatUsers setSelected={setSelected} />
          </div>
        </div>

        {/* Right Chat Section */}
        {selected ? (
          <div className=" flex-[1] h-[calc(100vh-0.5rem)]  md:flex-[.8] mt-1 rounded-lg shadow-xl z-[1] ">
            <div className="w-full p-1 px-4 rounded-tl-md rounded-tr-md shadow-md flex items-center justify-between">
              <h1 className="text-xl ml-[1.5rem] sm:ml-0 font-semibold flex items-center gap-2 shadow-zinc-500 drop-shadow-md ">
                <img
                  src={
                    selectedChat?.users[0]._id === auth?.user?.id
                      ? `${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${selectedChat?.users[1]._id}`
                      : `${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${selectedChat?.users[0]._id}`
                  }
                  alt="Avatar"
                  className="rounded-full w-[2.5rem] h-[2.5rem] border-2 border-green-500 shadow-md shadow-zinc-500 drop-shadow-md"
                />
                {selectedChat?.chatName === "sender"
                  ? selectedChat?.users[1]?.name
                  : selectedChat?.chatName}
              </h1>
              <div className="flex items-center gap-2">
                <span
                  className="hover:border cursor-pointer p-1 hover:bg-slate-500/30 rounded-md hover:shadow-md"
                  onClick={() => setIsShow(true)}
                >
                  <FaEye className="h-6 w-6" />
                </span>
                <span
                  className="hover:border cursor-pointer p-1 hover:bg-slate-500/30 rounded-md hover:shadow-md"
                  onClick={() => navigate("/")}
                >
                  <IoClose className="h-6 w-6 text-sky-600" />
                </span>
              </div>
            </div>
            <ChatSection />
          </div>
        ) : (
          <div className=" flex-[1] h-[calc(100vh-.4rem)]  md:flex-[.8] mt-1 rounded-lg shadow-xl ">
            <div className="w-full h-[calc(100vh-.5rem)] flex items-center justify-center flex-col ">
              <video
                src="/empty.mp4"
                muted
                autoPlay
                loop
                style={{ height: "15rem" }}
              />
              <h1 className="text-2xl font-semibold  text-center  ">
                Click on a user to start chating!
              </h1>
            </div>
          </div>
        )}

        {/* Group Details */}
        {isShow && (
          <div className=" absolute w-[100vw] h-screen left-0  rounded-md shadow-lg py-5 px-3 flex flex-col gap-4 bg-black/50 z-[999]">
            <ChatProfile setIsShow={setIsShow} />
          </div>
        )}
      </div>
    </div>
  );
}
