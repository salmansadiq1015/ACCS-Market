import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { BiLoaderCircle, BiSolidStar } from "react-icons/bi";
import Loader from "../../../utils/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/authContext";

// Post Comment
const Star = ({ selected, onClick }) => {
  return selected ? (
    <BiSolidStar onClick={onClick} size={26} color="red" />
  ) : (
    <FiStar onClick={onClick} size={26} color="red" />
  );
};

export default function ChannelComment({ channelId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const userId = auth?.user?.id;

  const [posting, setPosting] = useState(false);

  // ----------Rating----------->
  const handleStarClick = (starCount) => {
    setStars(starCount);
  };

  const renderPostStars = () => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <Star
          key={i}
          selected={i <= stars}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return starArray;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-green-600 " size="25" />
        ) : (
          <FaRegStar key={i} className="text-zinc-500" size="25" />
        )
      );
    }
    return stars;
  };

  //   Get All Comments
  const getComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/comments/get-channel-comment/${channelId}`
      );
      if (data) {
        setComments(data?.comments);
        setComment("");
        setStars(0);
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
  }, [channelId]);

  //   Post Comment
  const postComments = async () => {
    if (!userId) {
      return toast.error("Login first!");
    }
    setPosting(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/comments/create-comment`,
        {
          channelId,
          userId: userId,
          rating: stars,
          comment: comment,
        }
      );
      getComments();
      setStars(0);
      toast.success("Thank you for your feedback!", { duration: 3000 });
      setPosting(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 2000 });
      setPosting(false);
    }
  };

  return (
    <div className=" w-full flex flex-col gap-8">
      <h1 className="text-[1.1rem] font-semibold text-gray-800">
        Users Feedback
      </h1>
      {loading ? (
        <div className="w-full">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[3rem]">
          {comments?.map((c) => (
            <div
              className=" box1 py-4 px-4 rounded-md shadow-md bg-gray-100  cursor-pointer"
              key={c?._id}
            >
              <div className="flex items-center gap-2">
                <div className="relative w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden shadow-md">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${c?.userId}`}
                    fill
                    className="rounded-full w-full h-full"
                    alt="Logo"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[19px] font-medium">{c?.userName}</h3>
                  <p className="text-[14px] flex items-center font-medium">
                    <span>{c?.userEmail.slice(0, 5)}</span>
                    <span>*******</span>
                    <span>{c?.userEmail.slice(14, 25)}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col mt-[1rem] ">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium"></span>
                  {renderStars(c?.rating)}
                </div>
                <FaQuoteLeft className="h-7 w-7 mt-3 text-fuchsia-500 " />
                <p>{c?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add Comment */}

      <div className="w-full  py-3 px-3 rounded-md shadow-md cursor-pointer  bg-gray-100">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Share your Feedback
        </h3>
        <div className="w-full flex flex-col gap-3">
          <textarea
            className=" rounded-md shadow-md shadow-gray-300 outline-none  w-full h-[8rem] resize-none py-2 px-2 border-2 border-gray-300"
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
            placeholder=" Share your Feedback. Your feedback is invaluable to help us improve"
          />
          <div className="flex items-center gap-3 mt-2 ml-3">
            <span className="text-lg flex items-center gap-3 font-medium">
              {renderPostStars()}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end mt-3">
          <button
            className="text-[14px] border-2 flex items-center justify-center gap-1 rounded-3xl py-2 px-5 bg-fuchsia-500 hover:bg-fuchsia-600 cursor-pointer  transition-all duration-150 text-white  shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
            onClick={postComments}
          >
            Post{" "}
            {posting && <BiLoaderCircle className="animate-spin h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
