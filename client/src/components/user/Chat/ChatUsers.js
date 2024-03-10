import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { TbLoader3 } from "react-icons/tb";
import toast from "react-hot-toast";
import moment from "moment";

export default function ChatUsers({ setSelected }) {
  const [active, setActive] = useState("");
  const [admin, setAdmin] = useState([]);
  const { auth, setSelectedChat, chats, setChats } = useAuth();
  const userId = auth?.user?.id;
  const [loading, setLoading] = useState(false);
  const [chatLoad, setChatLoad] = useState(false);
  console.log("Chats:", chats);

  // Get Admin
  const getAdmin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/get-admin`
      );
      if (data) {
        setAdmin(data?.admin);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  // Create Chat
  const chatHandler = async (userId) => {
    if (!auth?.token) {
      return toast.error("Login required to initiate chat!");
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/chat/channel/create-chat`,
        {
          userId: userId,
        }
      );
      if (data) {
        getChat();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again!", { duration: 3000 });
    }
  };

  const getChat = async () => {
    if (!userId) {
      toast.error("User id is required!");
    }
    setChatLoad(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/chat/channel/getChats/${userId}`
      );

      if (data) {
        console.log(data);
        setChats(data.results);
        setChatLoad(false);
      }
    } catch (error) {
      console.log(error);
      setChatLoad(false);
    }
  };

  useEffect(() => {
    getChat();
    //eslint-disable-next-line
  }, [userId, setSelected]);

  // Format Time
  const formatTime = (createdAt) => {
    const now = moment();
    const createdAtMoment = moment(createdAt);
    const diffSeconds = now.diff(createdAtMoment, "seconds");
    const diffMinutes = now.diff(createdAtMoment, "minutes");
    const diffHours = now.diff(createdAtMoment, "hours");

    if (diffHours > 24) {
      const diffDays = now.diff(createdAtMoment, "days");
      const diffMonths = now.diff(createdAtMoment, "months");

      if (diffMonths > 0) {
        return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
      } else {
        return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
      }
    } else if (diffHours > 0) {
      return `${diffHours} hr`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} min`;
    } else {
      return `${diffSeconds} sec`;
    }
  };

  return (
    <>
      <div className="relative w-full h-[calc(100vh-4.5rem)] py-2 overflow-hidden ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">My Chats</h1>
        </div>
        <hr className="w-full bg-gray-300 my-4 h-[2px]" />
        {/* Admins */}
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 overflow-auto  pb-8 pt-2 scroll px-2 ">
            {admin?.map((chat) => (
              <>
                {auth?.user?.id !== chat?._id && (
                  <div
                    className={`flex items-center py-1 px-2 gap-2  shadow-md hover:shadow-xl cursor-pointer border border-sky-500 rounded-md ${
                      chat?._id === active
                        ? "bg-sky-500 text-white shadow-2xl transform scale-[1.02] overflow-hidden transition-all duration-300 ease-in-out"
                        : "bg-zinc-100 text-black"
                    } `}
                    key={chat._id}
                    onClick={() => {
                      setActive(chat._id);
                      chatHandler(chat._id);
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${chat?._id}`}
                      alt="avatar"
                      className="w-[2.8rem] h-[2.8rem] rounded-full border-2 border-fuchsia-600 shadow-md shadow-gray-500 filter drop-shadow-md "
                    />
                    <div className="flex flex-col gap-[1px]">
                      <h3 className="text-[16px] font-semibold ">ACCS Agent</h3>
                      <span className="text-[14px] font-medium ">
                        {chat?.name}
                      </span>
                    </div>
                    {loading && chat._id === active && (
                      <span className="ml-2">
                        <TbLoader3 className="h-5 w-5 text-fuchsia-600 animate-spin" />
                      </span>
                    )}
                  </div>
                )}

                {auth?.user?.id !== chat?._id && (
                  <hr className="w-full h-[2px] bg-gray-200 mb-6" />
                )}
              </>
            ))}
          </div>
        </div>

        {/* Sellers  */}
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 overflow-auto h-[18rem] px-2 sm:h-[25rem] pb-8 pt-2 scroll ">
            {chats?.map((chat) => (
              <div
                className={`flex items-center py-1 px-2 gap-2 shadow-md hover:shadow-xl cursor-pointer border border-sky-500 rounded-md ${
                  chat?._id === active
                    ? "bg-sky-500 text-white shadow-2xl transform scale-[1.02] transition-all duration-300 ease-in-out"
                    : "bg-zinc-100 text-black"
                } `}
                key={chat._id}
                onClick={() => {
                  setActive(chat._id);
                  setSelected(true);
                  setSelectedChat(chat);
                }}
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <img
                      src={
                        chat?.users[0]._id === auth?.user?.id
                          ? `${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${chat?.users[1]._id}`
                          : `${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${chat?.users[0]._id}`
                      }
                      alt="avatar"
                      className="w-[2.5rem] h-[2.5rem] rounded-full border-2 border-sky-500 shadow-md shadow-gray-500 filter drop-shadow-md "
                    />
                    {/* <h3 className="text-[16px] font-medium ">{chat?.users[1].name}</h3> */}
                    <div className="flex flex-col ">
                      <h3 className="text-[15px] font-semibold ">
                        {chat?.users[1]?.name.slice(0, 15)}
                      </h3>
                      <span className="text-[13px] font-light ">
                        {chat?.latestMessage?.content.slice(0, 15)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[13px] font-medium">
                    {formatTime(chat?.latestMessage?.createdAt)}
                  </span>
                </div>

                {chatLoad && chat._id === active && (
                  <span className="ml-2">
                    <TbLoader3 className="h-5 w-5 text-fuchsia-600 animate-spin" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
