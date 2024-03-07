import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import toast from "react-hot-toast";
import button from "../../utils/style";
import { BsCheckLg } from "react-icons/bs";
import {
  IoIosCheckmark,
  IoIosClose,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function CreateChannels() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);
  const [channelLink, setChannelLink] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [subscriber, setSubscriber] = useState("");
  const [monotization, setMonotization] = useState(false);
  const [allowComment, setAllowComment] = useState(false);
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [expenseDetail, setExpenseDetail] = useState("");
  const [permotionMethod, setPermotionMethod] = useState("");
  const [support, setSupport] = useState("");
  const [images, setImages] = useState([]);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  console.log("Images:", images);

  // Logo

  const postLogo = (image) => {
    setLoad(true);

    if (image === undefined) {
      toast.error("Please select an image!");
      setLoad(false);
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
          setLogo(data.url.toString());
          setLoad(false);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          toast.error("Error uploading image");
          setLoad(false);
        });
    } else {
      toast.error("Please select an image!", { duration: 3000 });
      setLoad(false);
    }
  };

  // Upload Images in Cloudinary

  const postDetails = (imageArray) => {
    setLoad(true);

    if (!imageArray || imageArray.length === 0) {
      toast.error("Please select at least one image!");
      setLoad(false);
      return;
    }

    const formDataArray = imageArray?.map((image) => {
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
        return formData;
      } else {
        toast.error("One or more selected files are not images!", {
          duration: 3000,
        });
        setLoad(false);
        throw new Error("Non-image file detected.");
      }
    });

    Promise.all(
      formDataArray.map(async (formData) => {
        return fetch("https://api.cloudinary.com/v1_1/dat1f5g7r/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .catch((err) => {
            console.error("Error uploading image:", err);
            toast.error("Error uploading image");
            throw err;
          });
      })
    )
      .then((uploadedImages) => {
        const imageUrls = uploadedImages.map((data) => data.url.toString());
        setImages((prevImages) => [...prevImages, ...imageUrls]);
        setLoad(false);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setLoad(false);
      });
  };

  //   Handle Create
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/v1/channel/create-sell-channel`, {
        userId: auth.user.id,
        channelLink,
        name,
        logo,
        subject,
        subscriber,
        category,
        price,
        monotization,
        allowComment,
        description,
        contentType,
        income,
        expense,
        incomeSource,
        expenseDetail,
        permotionMethod,
        support,
        images,
      });
      if (data?.success) {
        setLoading(false);
        toast.success(data?.message, { duration: 3000 });
        navigate("/");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //   Handle Drop Image
  const handleDrop = (url) => {
    const newImages = images.filter((img) => img !== url);
    setImages(newImages);
  };
  return (
    <MainLayout title={"Create-Channel"}>
      <div className="w-full min-h-[calc(100vh-4rem)] py-6 px-1 sm:px-6 flex items-center flex-col gap-2">
        <div className="mt-3 flex flex-col gap-3 w-[98%] sm:max-w-[70%] py-4 px-2 sm:px-4 rounded-lg shadow-md shadow-gray-300 border ">
          <h1 className=" text-2xl sm:text-3xl text-green-900 font-bold text-center ">
            CREATE NEW LISTING
          </h1>
          <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-4">
            <div className="flex items-center flex-wrap gap-4">
              <input
                type="file"
                id="selectLogo"
                accept="image/*"
                multiple
                required
                onChange={(e) => postLogo(e.target.files[0])}
                className="hidden"
              />

              {!logo ? (
                <label
                  htmlFor="selectLogo"
                  className="w-[8rem] h-[8rem] border-2 rounded-md border-dashed border-fuchsia-600 hover:shadow-xl shadow-gray-200 shadow-md cursor-pointer flex items-center justify-center flex-col gap-2"
                >
                  {load ? (
                    <TbLoader3 className="h-6 w-6 text-green-500 animate-spin" />
                  ) : (
                    <FiUploadCloud className="w-8 h-8 text-fuchsia-600 animate-pulse" />
                  )}
                  <span className="text-[13px] font-semibold">
                    {load ? "Uploading..." : "Upload Logo"}
                  </span>
                </label>
              ) : (
                <div className="relative w-[9rem] h-[8rem]  overflow-hidden border-2 border-gray-300  shadow-gray-300 filter hover:drop-shadow-md rounded-md  shadow-md object-fill hover:shadow-xl transition duration-100">
                  <div className="absolute top-[.1rem] right-[.1rem] z-40 cursor-pointer">
                    <IoMdCloseCircleOutline
                      className="h-5 w-5 text-fuchsia-600 hover:text-red-500 "
                      onClick={() => setLogo("")}
                    />
                  </div>
                  <img src={logo} alt={`Logo`} className="w-full h-full" />
                </div>
              )}
            </div>

            {/*  */}
            <input
              type="url"
              placeholder="Past link to the account/channel/group/page for sale"
              value={channelLink}
              autoFocus
              required
              onChange={(e) => setChannelLink(e.target.value)}
              className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 
              "
            />
            {/*  */}
            <input
              type="text"
              placeholder="Enter channel name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 
              "
            />
            {/*  */}
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            >
              <option value="None">--Choose Category--</option>
              <option value="Youtube">Youtube</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Tiktok">Tiktok</option>
            </select>
            {/*  */}
            <select
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            >
              <option value="None">--Choose Subject--</option>
              <option value="Car & Bikes">Car & Bikes</option>
              <option value="Lusury & Motivation">Lusury & Motivation</option>
              <option value="Pet & Animals">Pet & Animals</option>
              <option value="Games">Games</option>
              <option value="Movies & Music">Movies & Music</option>
              <option value="Fashion & Style">Fashion & Style</option>
              <option value="Educational & QA">Educational & QA</option>
              <option value="Nature">Nature</option>
              <option value="Fitness & Sports">Fitness & Sports</option>
              <option value="Programming & Coding">Programming & Coding</option>
              <option value="Travel">Travel</option>
              <option value="Beautiful Girls">Beautiful Girls</option>
              <option value="Humor">Humor</option>
              <option value="Models & Celebrities">Models & Celebrities</option>
              <option value="Review & How-to">Review & How-to</option>
              <option value="Youtube shorts & Facebook reels">
                Youtube shorts & Facebook reels
              </option>
              <option value="Cars & Bikes">Cars & Bikes</option>
              <option value="Others">Others</option>
            </select>
            {/*  */}
            <div className="flex flex-col  gap-3">
              <input
                type="number"
                placeholder="Enter the number of subscribers (e.g: 1500 )"
                value={subscriber}
                onChange={(e) => setSubscriber(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
              />
              <label htmlFor=" " className=" flex items-center gap-4">
                <span className="text-[16px] font-medium text-gray-800">
                  Set channel is monotized or not
                </span>
                <div
                  className={`relative w-[2.7rem] rounded-3xl transition-all duration-200 cursor-pointer h-[1.3rem] border-2  border-fuchsia-600 flex items-center ${
                    monotization ? "justify-end" : "justify-start"
                  }`}
                  onClick={() => setMonotization(!monotization)}
                >
                  <div className="w-[1.2rem]  h-[1.2rem] rounded-full flex items-center justify-center border-[.1rem] bg-fuchsia-600 border-white cursor-pointer ">
                    {monotization ? (
                      <IoIosCheckmark className="h-5 w-5 text-white" />
                    ) : (
                      <IoIosClose className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </label>
            </div>
            {/*  */}
            <div className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="Enter price in ($)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
              />
              <span
                className={`${button} text-[14px] px-3 w-[12rem] flex items-center justify-center gap-1 ${
                  allowComment
                    ? "bg-green-500 hover:bg-green-600 "
                    : "bg-fuchsia-500 hover:bg-fuchsia-600 "
                }`}
                onClick={() => setAllowComment(!allowComment)}
              >
                <BsCheckLg className="h-5 w-5 text-white" />
                Allow Comments
              </span>
            </div>
            {/*  */}
            <h3 className=" text-[17px] sm:text-lg font-semibold text-green-900 py-3">
              Optional Fields
            </h3>
            <textarea
              placeholder="Listing description (posting contacts is prohibited)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" w-full h-[6rem] rounded-md shadow-md py-2 resize-none shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            />
            {/*  */}
            <select
              name=""
              id=""
              required
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            >
              <option value="None">
                --Specify the primary content published--
              </option>
              <option value="Unique Content">Unique Content</option>
              <option value="Rewritten">Lusury & Motivation</option>
              <option value="Not unique content">Not unique content</option>
              <option value="Mixed">Mixed</option>
            </select>

            {/*  */}
            <div className="flex items-center flex-col  sm:flex-row gap-2">
              <input
                type="number"
                placeholder="Income in ($/month)"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
              />
              <input
                type="number"
                placeholder="Expense in ($/month)"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
              />
            </div>
            {/*  */}
            <textarea
              placeholder="Privide details about income sources"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              className=" w-full h-[6rem] rounded-md shadow-md py-2 resize-none shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            />
            <textarea
              placeholder="Provide details about expenses"
              value={expenseDetail}
              onChange={(e) => setExpenseDetail(e.target.value)}
              className=" w-full h-[6rem] rounded-md shadow-md py-2 resize-none shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            />
            <textarea
              placeholder="Tell us how you promoted the page"
              value={permotionMethod}
              onChange={(e) => setPermotionMethod(e.target.value)}
              className=" w-full h-[6rem] rounded-md shadow-md py-2 resize-none shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            />
            <textarea
              placeholder="What is needed to support the page?"
              value={support}
              onChange={(e) => setSupport(e.target.value)}
              className=" w-full h-[6rem] rounded-md shadow-md py-2 resize-none shadow-gray-200 border-2 border-gray-700 outline-none px-3 "
            />
            <h3 className="text-lg font-semibold text-green-900">
              Attach screenshots (proof of income, etc.)
            </h3>
            <div className="flex items-center flex-wrap gap-4">
              <input
                type="file"
                id="selectImage"
                accept="image/*"
                multiple
                onChange={(e) => postDetails([...e.target.files])}
                className="hidden"
              />

              <label
                htmlFor="selectImage"
                className="w-[8rem] h-[8rem] border-2 rounded-md border-dashed border-fuchsia-600 hover:shadow-xl shadow-gray-200 shadow-md cursor-pointer flex items-center justify-center flex-col gap-2"
              >
                {load ? (
                  <TbLoader3 className="h-6 w-6 text-green-500 animate-spin" />
                ) : (
                  <FiUploadCloud className="w-8 h-8 text-fuchsia-600 animate-pulse" />
                )}
                <span className="text-[13px] font-semibold">
                  {load ? "Uploading..." : "Upload Image"}
                </span>
              </label>

              {images?.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative w-[9rem] h-[8rem]  overflow-hidden border-2 border-gray-300  shadow-gray-300 filter hover:drop-shadow-md rounded-md  shadow-md object-fill hover:shadow-xl transition duration-100"
                >
                  <div className="absolute top-[.1rem] right-[.1rem] z-40 cursor-pointer">
                    <IoMdCloseCircleOutline
                      className="h-5 w-5 text-fuchsia-600 hover:text-red-500 "
                      onClick={() => handleDrop(imageUrl)}
                    />
                  </div>
                  <img
                    src={imageUrl}
                    alt={`ImageData ${index + 1}`}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
            {/*  */}
            <p className="text-[14px] font-semibold text-gray-700">
              Please confirm that you’re the page’s owner by placing this code
              in the description (for Facebook or YouTube), and in the “Bio”
              section on Instagram or Twitter.
            </p>
            <p className="text[14] text-gray-600">
              You’ll be able to immediately delete the code after your listing
              has gone live.
            </p>
            <p className="text-[14px] font-semibold text-gray-700">
              Placing contacts in the description of the listing or contacts for
              sale on the page itself is prohibited. If you need to have a
              contact on the page for advertising, orders or similar purposes,
              you can leave it. But if the client writes to you about the sale
              through these contacts, you will have to ask him to contact the
              seller through the listing he found. By listing on
              accs-market.com, you accept these conditions and the fact that the
              administration will control this and will be forced to block you
              if this condition is not met. If you do not need to leave contacts
              and open DM on the page, we are ready to give you 50% more rating
              after the transaction is completed, as this will make it easier
              for us to control. Rating is one of the main factors of trust from
              buyers. An additional rating will be automatically added after the
              completion of the transaction if you check the box below, but in
              case of violation of this agreement, we will have to block you.
            </p>
            <div className="flex items-center gap-4 ">
              <p className="text-[14px] font-semibold text-gray-700">
                I agree to remove contacts / close DM on the page to get 50%
                more rating
              </p>
              <label htmlFor="">
                <div
                  className={`relative w-[2.7rem] rounded-3xl transition-all duration-200 cursor-pointer h-[1.3rem] border-2  border-fuchsia-600 flex items-center ${
                    agree ? "justify-end" : "justify-start"
                  }`}
                  onClick={() => setAgree(!agree)}
                >
                  <div className="w-[1.2rem]  h-[1.2rem] rounded-full flex items-center justify-center border-[.1rem] bg-fuchsia-600 border-white cursor-pointer ">
                    {agree ? (
                      <IoIosCheckmark className="h-5 w-5 text-white" />
                    ) : (
                      <IoIosClose className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </label>
            </div>
            <div className="w-full flex items-center justify-end">
              <button
                className={`${button} rounded-3xl px-5 bg-fuchsia-500 hover:bg-fuchsia-600 text-white mt-4 ${
                  loading && "pointer-events-none animate-pulse"
                }`}
                style={{
                  borderRadius: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
                disabled={loading}
              >
                Start Selling{" "}
                {loading && (
                  <TbLoader3 className="h-4 w-4 text-white animate-spin" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
