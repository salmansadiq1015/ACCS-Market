import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ImageModel from "../../components/user/home/ImageModel";
import { IoClose } from "react-icons/io5";
import Loader from "../../utils/Loader";
import ChannelComment from "../../components/user/home/ChannelComment";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { BiLoaderCircle } from "react-icons/bi";

export default function ChannelDetails() {
  const [channelData, setChannelData] = useState([]);
  const params = useParams();
  const { auth, setFavorite } = useAuth();
  const [open, setOpen] = useState(false);
  const [ImageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [paymentLoad, setPaymentLoad] = useState(false);
  const navigate = useNavigate();

  // Rating
  const getRating = (comments) => {
    if (comments?.length === 0) return 0;

    let totalRating = 0;
    comments?.forEach((comment) => {
      totalRating += comment.rating;
    });

    return totalRating / comments?.length;
  };

  const averageRating = getRating(comments);

  //   Get Channel Data
  const getChannel = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/channel/getSingle-channel/${params.id}`
      );
      if (data) {
        setChannelData(data.channel);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannel();
    // eslint-disable-next-line
  }, []);

  //   Get All Comments
  const getComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/comments/get-channel-comment/${channelData?._id}`
      );
      if (data) {
        setComments(data?.comments);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, [channelData]);

  // ---------------Handle Buy Channels-------------
  const makePayment = async () => {
    setPaymentLoad(true);
    const stripe = await loadStripe(
      "pk_test_51OKdAYHDam9TUVDQjZG6rTj0nzzrKcvaUui6kSk4ivuTObT42WJZEhrfj5UeIrbBVgnjAkH7iWkxSgPRvalzBrTz00FOa4YigN"
    );

    const body = {
      userId: channelData.userId,
      channelId: channelData._id,
      price: channelData.price,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/orders/channel/payment`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    setPaymentLoad(false);

    if (result.error) {
      console.log(result.error);
      setPaymentLoad(false);
    }
  };

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
        navigate(`/chats/${channelData?.userId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again!", { duration: 3000 });
    }
  };

  return (
    <MainLayout>
      {loading ? (
        <div className=" relative w-full min-h-screen py-5 sm:px-2 px-4">
          <Loader />
        </div>
      ) : (
        <div className=" relative w-full min-h-screen py-5 sm:px-2 px-4">
          <div className="flex flex-col-reverse md:flex-row flex-1 md:flex-wrap gap-[4rem] md:gap-2">
            <div className="flex-1  sm:flex-[.70]  ">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 ">
                <img
                  src={channelData?.logo}
                  alt="Logo"
                  className="md:w-[19rem] w-full h-[20rem] rounded-md shadow-md border border-gray-300"
                />
                <div className="flex flex-col gap-3 items-start">
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
                    {channelData?.name}
                  </h2>
                  <span className="text-[15px] text-gray-700 flex items-center gap-4 ">
                    {channelData?.category} | {channelData?.subject}
                  </span>
                  <Link
                    to={channelData?.channelLink}
                    className="text-[16px] bg-fuchsia-500 hover:bg-fuchsia-600 cursor-pointer text-white rounded-3xl py-2 px-5 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[1] filter hover:drop-shadow-md "
                    target="next"
                  >
                    Visit Channel
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="w-[2px] bg-fuchsia-600 rounded-3xl h-full"></span>
                    <div className="flex flex-col gap-3">
                      <span className=" flex items-center gap-1">
                        {channelData?.subscriber}{" "}
                        <span className="w-[1.5rem] h-[2px] bg-gray-600 rounded-3xl"></span>
                        Subscribers
                      </span>
                      <span className=" flex items-center gap-1">
                        {channelData?.income}{" "}
                        <span className="w-[1.5rem] h-[2px] bg-gray-600 rounded-3xl"></span>
                        Income (Month)
                      </span>
                      <span className=" flex items-center gap-1">
                        {channelData?.expense}{" "}
                        <span className="w-[1.5rem] h-[2px] bg-gray-600 rounded-3xl"></span>
                        Expense (Month)
                      </span>
                    </div>
                  </div>
                  {/*  */}
                  <h3 className="text-2xl text-gray-800 font-medium mt-4">
                    Price: ${" "}
                    <span className="text-3xl sm:text-4xl">
                      {channelData?.price}
                    </span>
                  </h3>
                  {/*  */}
                  <div className="flex items-center gap-6">
                    <button
                      className="text-[16px] border-2 flex items-center justify-center gap-1 border-fuchsia-600 hover:bg-fuchsia-600 cursor-pointer text-fuchsia-500 transition-all duration-150 hover:text-white rounded-3xl py-2 px-5 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
                      onClick={makePayment}
                      disabled={paymentLoad}
                    >
                      Buy Channel{" "}
                      {paymentLoad && (
                        <BiLoaderCircle className="h-4 w-4 animate-spin text-green-500" />
                      )}
                    </button>
                    <button
                      className="text-[16px] border-2 border-fuchsia-600 hover:bg-fuchsia-600 cursor-pointer text-fuchsia-500 transition-all duration-150 hover:text-white rounded-3xl py-2 px-5 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
                      onClick={() => {
                        // Retrieve existing favorites from localStorage
                        const existingFavorites =
                          JSON.parse(localStorage.getItem("favorite")) || [];

                        // Check if the channel already exists in favorites
                        const isChannelExists = existingFavorites.some(
                          (favorite) => favorite._id === channelData._id
                        );

                        // If the channel doesn't exist, add it to favorites
                        if (!isChannelExists) {
                          const updatedFavorites = [
                            ...existingFavorites,
                            channelData,
                          ];

                          // Update state and localStorage with the updated favorites
                          setFavorite(updatedFavorites);
                          localStorage.setItem(
                            "favorite",
                            JSON.stringify(updatedFavorites)
                          );
                          toast.success("Channel added in favourite!");
                        } else {
                          toast.error("Channel already exists in favorites");
                        }
                      }}
                    >
                      Add Favourite
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 sm:flex-[.30] ">
              <div className="relative flex items-center  justify-between border rounded-3xl rounded-br-none hover:shadow-lg shadow-gray-300 hover:bg-gray-100 transition duration-150">
                <div className="flex items-center gap-4">
                  <img
                    src={channelData?.logo}
                    alt="Logo"
                    className="w-[3.5rem] h-[3.5rem] rounded-full shadow-md border border-fuchsia-500"
                  />
                  <div className="flex flex-col gap-1 ">
                    <h3 className="text-[17px] font-semibold text-gray-800">
                      {auth?.user?.name}
                    </h3>
                    <span className="text-[13px] text-gray-600">
                      Rating: {averageRating}
                    </span>
                  </div>
                </div>
                <button
                  className="text-[14px] border-2 translate-y-[2.9rem] bg-fuchsia-500 hover:bg-fuchsia-600 cursor-pointer  transition-all duration-150 text-white rounded-bl-xl rounded-br-md py-[.3rem] px-4 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
                  onClick={() => chatHandler(channelData.userId)}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col-reverse md:flex-row flex-1 md:flex-wrap gap-[4rem] md:gap-2 mt-8">
            <div className="flex flex-col gap-3 flex-1  sm:flex-[.70]  ">
              <h3 className="text-[1.1rem]  font-semibold text-gray-800">
                Description:
              </h3>
              <p>{channelData?.description}</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-[1rem] font-semibold text-gray-800">
                    Monetization enabled:
                  </h3>{" "}
                  <span className="text-[15px] text-gray-500">
                    {channelData?.monotization ? "Yes" : "No"}
                  </span>
                </div>
                {/*  */}
                <div className="flex items-start flex-col sm:flex-row gap-2">
                  <h3 className="text-[1rem] font-semibold text-gray-800">
                    Sources of expense:
                  </h3>{" "}
                  <span className="text-[15px] text-gray-500">
                    {channelData?.expenseDetail
                      ? channelData?.expenseDetail
                      : "Not Provided"}
                  </span>
                </div>
                {/*  */}
                <div className="flex items-start flex-col sm:flex-row gap-2">
                  <h3 className="text-[1rem] font-semibold text-gray-800">
                    Sources of income:
                  </h3>{" "}
                  <span className="text-[15px] text-gray-500">
                    <span className="text-[15px] text-gray-500">
                      {channelData?.incomeSource
                        ? channelData?.incomeSource
                        : "Not Provided"}
                    </span>
                  </span>
                </div>
                {/*  */}
                <div className="flex items-start flex-col sm:flex-row gap-2">
                  <h3 className="text-[1rem] font-semibold text-gray-800">
                    To support the channel, you need:
                  </h3>{" "}
                  <span className="text-[15px] text-gray-500">
                    {channelData?.support
                      ? channelData?.support
                      : "Not Provided"}
                  </span>
                </div>
                {/*  */}
                <div className="flex items-center gap-3">
                  <h3 className="text-[1rem] font-semibold text-gray-800">
                    Content Type:
                  </h3>{" "}
                  <span className="text-[15px] text-gray-500">
                    {channelData?.contentType
                      ? channelData?.contentType
                      : "Not Provided"}
                  </span>
                </div>
                {/*  */}
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col gap-3 flex-1 sm:flex-[.30]">
              <h3 className="text-[1.1rem] font-semibold text-gray-800">
                Attached Images:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                {channelData?.images?.map((img, i) => (
                  <img
                    src={img}
                    key={i}
                    alt="Logo"
                    className=" rounded-md shadow-md border cursor-pointer border-gray-300 w-full h-full"
                    onClick={() => {
                      setImageUrl(img);
                      setOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Comments */}
          <div className="flex items-start mt-[3rem] flex-col ">
            <div className=" flex items-center gap-2">
              <h3 className="text-[1.1rem] font-semibold text-gray-800">
                Discussion:
              </h3>
              <span>{0}</span>
            </div>
            <div className="mt-4 w-full">
              <ChannelComment channelId={channelData?._id} />
            </div>
          </div>
          {/* Image Details */}
          {open && (
            <div className="fixed top-0 left-0 z-[50] w-full h-full bg-black/70 flex items-center justify-center">
              <div className="absolute top-3 right-3 ">
                <IoClose
                  className="h-6 w-6 text-white cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <ImageModel url={ImageUrl} />
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
}
