import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useAuth } from "../../context/authContext";
import { IoClose } from "react-icons/io5";
import { FaCog, FaTimesCircle } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import Empty from "../../utils/Empty";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PaymentModel from "../../utils/PaymentModel";

export default function FavoriteChannel() {
  const { favorite, setFavorite } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [channelData, setChannelData] = useState([]);

  const removeFromFavorites = (channelIdToRemove) => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorite")) || [];

    const updatedFavorites = existingFavorites.filter(
      (channel) => channel._id !== channelIdToRemove
    );

    setFavorite(updatedFavorites);
    localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
    toast.success("Channel remove successfully!");
  };

  return (
    <MainLayout>
      <div className=" relative w-full min-h-screen py-8 px-3 sm:px-6">
        {favorite?.length === 0 ? (
          <div className="">
            <Empty message={"Channel not found in favorites"} />
          </div>
        ) : (
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {favorite &&
              favorite?.map((c, i) => (
                <div
                  className=" rounded-md relative card border border-gray-300 filter drop-shadow hover:drop-shadow-lg transition-all duration-150 cursor-pointer shadow-md hover:shadow-xl overflow-hidden "
                  key={c?._id}
                >
                  <div className="show absolute top-0 left-0 w-full  py-[5rem] flex items-center justify-center ">
                    <span
                      className="bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-150 py-2 px-4 rounded-3xl shadow-md border"
                      onClick={() => navigate(`/channel-details/${c?._id}`)}
                    >
                      Show details
                    </span>
                  </div>

                  <span
                    className=" absolute h-[2rem] flex items-center justify-center top-[10.5rem] right-2 text-[13px] bg-green-500 text-white transition-all duration-150 px-4 rounded-3xl shadow-md"
                    onClick={() => navigate(`/channel-details/${c._id}`)}
                  >
                    {c?.status === "Processing" ? (
                      <span className="flex items-center gap-1 text-white">
                        <FaCog className="h-4 w-4 text-white animate-spin" />
                        {c?.status}
                      </span>
                    ) : c?.status === "Verify" ? (
                      <span className="flex items-center gap-1 text-white">
                        <FiCheck className="h-4 w-4 text-white" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-white">
                        <FaTimesCircle className="h-4 w-4 text-white" />
                        Not Varify
                      </span>
                    )}
                  </span>
                  <span
                    className="absolute z-50 top-3 right-2 cursor-pointer p-1 bg-black/40 hover:bg-black/70 rounded-md shadow-md text-white hover:text-red-500 transition duration-150"
                    onClick={() => removeFromFavorites(c._id)}
                  >
                    <IoClose className="h-5 w-5 w" />
                  </span>
                  <img src={c?.logo} alt="Logo" className=" w-full h-[13rem]" />

                  <div className="flex flex-col gap-4 py-4 sm:px-2 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={c?.logo}
                        alt="Logo"
                        className="w-[2.5rem] h-[2.5rem] rounded-full border border-green-500 shadow-md object-fill"
                      />
                      <h3 className="text-xl font-semibold text-gray-90 text-center">
                        {c?.name}
                      </h3>
                    </div>
                    <div className=" flex items-center gap-3 justify-between">
                      <span className="text-center text-[15px] font-[400] text-zinc-600">
                        {c?.category}
                      </span>
                      <span className="text-center text-[15px] font-[400] text-zinc-600">
                        {c?.subject}
                      </span>
                    </div>
                    <span className="text-center text-xl font-[400] text-gray-800">
                      Price: $ {c?.price}
                    </span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-center text-xl font-[400] text-gray-800">
                        {c?.subscriber}
                      </span>
                      <span className="bg-gray-600 h-[2px] w-[2rem] "></span>
                      <span className="text-center text-xl font-[400] text-gray-800">
                        Subscribers
                      </span>
                    </div>
                    {/*  */}
                    <button
                      type="button"
                      className={`btn flex items-center justify-center gap-1 `}
                      onClick={() => {
                        setChannelData(c);
                        setIsOpen(true);
                      }}
                    >
                      Buy this Channel
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Payment Model */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
            <PaymentModel setIsOpen={setIsOpen} channelData={channelData} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
