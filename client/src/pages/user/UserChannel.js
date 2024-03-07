import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import axios from "axios";
import Loader from "../../utils/Loader";
import { useAuth } from "../../context/authContext";
import { FaCog, FaTimesCircle } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Empty from "../../utils/Empty";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

export default function UserChannel() {
  const [channelsData, setChannelsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Get All Channels Data
  const getChannels = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/v1/channel/users-channels/${auth?.user?.id}`
      );
      if (data) {
        setChannelsData(data?.channels);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannels();
    //eslint-disable-next-line
  }, [auth.user]);

  // Delete Channel
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/channel/delete/channels/${id}`
      );
      if (data) {
        toast.success(data?.message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <MainLayout>
      <div className="w-full min-h-screen py-8 px-3 sm:px-4">
        {loading ? (
          <Loader />
        ) : (
          <div className=" relative w-full min-h-screen py-8 px-3 sm:px-6">
            {channelsData?.length === 0 ? (
              <div className="">
                <Empty
                  messsage={"Channels not found. Create your first channel"}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {channelsData &&
                  channelsData?.map((c, i) => (
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
                      <img
                        src={c?.logo}
                        alt="Logo"
                        className=" w-full h-[13rem]"
                      />
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
                        <div className=" flex items-center gap-4 w-full">
                          <button
                            type="button "
                            onClick={() => navigate(`/update/channel/${c._id}`)}
                            className="text-[16px] w-full flex justify-center items-center border-2 bg-fuchsia-500 gap-1 hover:bg-fuchsia-600 cursor-pointer text-white transition-all duration-150 rounded-3xl py-[.4rem] px-5 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
                          >
                            Update <RxUpdate />
                          </button>
                          <button
                            type="button "
                            className="text-[16px] w-full flex justify-center items-center border-2 bg-red-500 hover:bg-red-600 gap-1 cursor-pointer text-white transition-all duration-150 rounded-3xl py-[.4rem] px-5 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
                            onClick={() =>
                              handleDelete(`/update/channel/${c._id}`)
                            }
                          >
                            Delete <MdDeleteOutline className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
