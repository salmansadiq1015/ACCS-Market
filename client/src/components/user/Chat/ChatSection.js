import React, { useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";

import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./style.css";
import io from "socket.io-client";
import TypingIndicator from "./TypingIndicator";
import { useAuth } from "../../../context/authContext";
import toast from "react-hot-toast";

const ENDPOINT = "https://accs-market-backend.vercel.app";
var socket, selectedChatCompare;

export default function ChatSection() {
  const { auth, selectedChat, notification, setNotification } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Socket.io
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", auth?.user);

    //---------------end------->
    socket.on("connected", () => {
      setSocketConnected(true);
      console.log("WebSocket connection established!");
    });

    socket.on("typing", (data) => setIsTyping(true));
    socket.on("stop typing", (data) => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  // // Get Messages
  const getMessages = async () => {
    if (!selectedChat._id) return toast.error("ChatId is required");
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/message/channel/get-messages/${selectedChat._id}`
      );
      if (data) {
        setMessages(data?.messages);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  // Send Message Socket
  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageReceived.chat._id
  //     ) {
  //       // Give notification
  //       if (!notification.includes(newMessageReceived)) {
  //         setNotification([...notification, newMessageReceived]);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageReceived]);
  //     }
  //   });
  // });

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat?._id
      ) {
        // Give notification
        if (!notification.some((msg) => msg?._id === newMessageReceived?._id)) {
          setNotification([...notification, newMessageReceived]);
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });
    // eslint-disable-next-line
  }, [notification, selectedChatCompare]);

  // Upload Image In CLoud

  const postLogo = (image) => {
    if (image === undefined) {
      toast.error("Please select an image!");
      return;
    }

    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/jpg" ||
      image.type === "image/*"
    ) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "socket.io");
      formData.append("cloud_name", "dat1f5g7r");

      fetch("https://api.cloudinary.com/v1_1/dat1f5g7r/image/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setNewMessage(data.url.toString());
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          toast.error("Error uploading image");
        });
    } else {
      toast.error("Please select an image!", { duration: 3000 });
    }
  };

  // Handle Messages
  const handleMessage = async (e) => {
    if (!selectedChat?._id) return toast.error("Chat id is required!");
    e.preventDefault();
    socket.emit("stop typing", selectedChat?._id);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/message/channel/create-messages`,
        {
          content: newMessage,
          chatId: selectedChat?._id,
        }
      );
      setNewMessage("");
      socket.emit("new message", data?.messages);
      if (data?.success) {
        // getMessages();
        setMessages([...messages, data?.messages]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Typing Handler
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing Indicator login
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLenght = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLenght && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLenght);
  };

  // Smooth Scroll
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="relative w-full h-[calc(100vh-3.5rem)] rounded-md overflow-hidden px-1 py-[2px] ">
        <div
          className="w-full h-[100%] rounded-md px-2 bg-gray-100 py-5 overflow-y-auto scroll"
          style={{
            overflow: "hidden",
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
          }}
        >
          {loading ? (
            <div className="w-full h-full mt-5">
              <SkeletonTheme baseColor="#333" highlightColor="#fff">
                <Skeleton
                  count={5}
                  duration={2000}
                  height={60}
                  className="animate-pulse"
                />
              </SkeletonTheme>
            </div>
          ) : (
            <div
              id="message-container"
              className="w-full relative h-full rounded-md px-2  py-5 pb-[2rem] overflow-y-auto scroll flex flex-col gap-2"
            >
              {messages &&
                messages.length > 0 &&
                messages?.map((mess, i) => (
                  // JSX code
                  <div
                    className={`flex ${
                      mess?.sender?._id === auth?.user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    key={mess?._id}
                  >
                    {/* Conditional rendering of image based on sender */}
                    {mess?.sender?._id !== auth?.user?.id && (
                      <span>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${mess?.sender?._id}`}
                          alt="Avatar"
                          name={`${mess?.sender?.name}`}
                          className="w-10 h-10 rounded-full border-2 border-sky-500 shadow-md shadow-gray-300"
                        />
                      </span>
                    )}

                    {mess.content.startsWith("http") ? (
                      <div className="w-[10rem] h-[9rem] bg-gray-950/50 rounded-lg overflow-hidden shadow-md border mt-[1.8rem] ">
                        <img
                          src={mess?.content}
                          alt="Images"
                          className="w-full h-full object-fill"
                        />
                      </div>
                    ) : (
                      <span
                        className={`m-2  ${
                          mess?.sender?._id !== auth?.user?.id
                            ? "rounded-tr-xl rounded-br-xl rounded-bl-xl"
                            : "rounded-tl-xl rounded-br-xl rounded-bl-xl"
                        }  text-white max-w-[75%] gap-2 w-fit py-1 px-2 mt-[2rem] shadow-md shadow-gray-300 filter drop-shadow-md cursor-pointer`}
                        style={{
                          backgroundColor: `${
                            mess?.sender?._id === auth?.user?.id
                              ? "#0091ff"
                              : "#fff"
                          }`,
                          color: `${
                            mess?.sender?._id === auth?.user?.id
                              ? "white"
                              : "#111"
                          }`,
                        }}
                      >
                        {mess?.content}
                      </span>
                    )}

                    {/* <span
                      className={`m-2  ${
                        mess?.sender._id !== auth?.user?.id
                          ? "rounded-tr-xl rounded-br-xl rounded-bl-xl"
                          : "rounded-tl-xl rounded-br-xl rounded-bl-xl"
                      }  text-white max-w-[75%] gap-2 w-fit py-1 px-2 mt-[2rem] shadow-md shadow-gray-300 filter drop-shadow-md cursor-pointer`}
                      style={{
                        backgroundColor: `${
                          mess?.sender._id === auth?.user?.id
                            ? "#0091ff"
                            : "#fff"
                        }`,
                        color: `${
                          mess?.sender._id === auth?.user?.id ? "white" : "#111"
                        }`,
                      }}
                    >
                      {mess?.content}
                    </span> */}

                    {/* Conditional rendering of image based on sender */}
                    {mess?.sender?._id === auth?.user?.id && (
                      <span>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${mess?.sender?._id}`}
                          alt="Avatar"
                          name={`${mess?.sender?.name}`}
                          className="w-10 h-10  rounded-full border-2 border-sky-500 shadow-md shadow-gray-300"
                        />
                      </span>
                    )}
                  </div>
                ))}

              <div className="fixed z-50 bottom-[3.5rem] left-2">
                {isTyping && (
                  <span>
                    <TypingIndicator />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="sticky h-[3.1rem] bottom-0 left-0 w-full rounded-md bg-gray-200/70 border p-1 ">
          <form
            className=" relative w-full h-full flex items-center gap-1"
            onSubmit={handleMessage}
          >
            <input
              type="file"
              id="uploadImage"
              accept="image/*"
              onChange={(e) => postLogo(e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="uploadImage"
              className="absolute top-2 left-1 cursor-pointer z-30 p-1 rounded-full hover:bg-black/10"
            >
              <ImAttachment className="h-4 w-4 text-gray-700" />
            </label>
            <input
              type="text"
              placeholder="Message here..."
              value={newMessage}
              onChange={typingHandler}
              className="w-[95%] rounded-md outline-none px-3 pl-7 shadow-md bg-white h-full"
            />
            <button
              disabled={newMessage.length === 0}
              className={`rounded-md w-[2.7rem] ${
                newMessage.length === 0 && "pointer-events-none bg-sky-400"
              } flex items-center justify-center h-full px-3 shadow-md hover:shadow-lg transition duration-150 cursor-pointer bg-sky-500 hover:bg-sky-600`}
            >
              <AiOutlineSend className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
