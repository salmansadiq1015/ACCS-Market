import React, { useState } from "react";

export default function Filter({
  setSearchQuery,
  name,
  setName,
  fromPrice,
  setFromPrice,
  toPrice,
  setToPrice,
  subject,
  setSubject,
  fromSubscriber,
  setFromSubscriber,
  toSubscriber,
  setToSubscriber,
  fromIncome,
  setFromIncome,
  toIncome,
  setToIncome,
  handleClear,
}) {
  const [active, setActive] = useState("");

  return (
    <div className=" relative w-full min-h-[60vh] py-8 px-3 sm:px-4 flex items-center justify-center  bg-gradient-to-tr from-gray-900 to-fuchsia-950">
      <div
        className="absolute bottom-3 left-2 w-[13rem] h-[13rem] borderRadius bg-orange-600/30 animate-spin z-20"
        style={{ borderRadius: "68% 32% 40% 60% / 38% 57% 43% 62%" }}
      ></div>

      <div
        className=" relative z-40 flex items-center justify-center rounded-lg shadow-md w-[98%] sm:w-[75%] flex-col gap-5 bg-black/60 py-4 sm:py-6 px-2 sm:px-4"
        data-aos="fade-right"
      >
        <h1 className=" text-white text-3xl sm:text-4xl text-center font-semibold pb-8 ">
          Filter Channel
        </h1>

        {/* By Category */}
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-wrap ">
          <span
            className={`py-2 px-5 text-white ${
              active === "Youtube"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-fuchsia-600 select-none hover:bg-fuchsia-700"
            } transition duration-100 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[1] cursor-pointer`}
            onClick={() => {
              setActive("Youtube");
              setSearchQuery("Youtube");
            }}
            data-aos="fade-down-right"
          >
            Youtube
          </span>
          <span
            className={`py-2 px-5 text-white ${
              active === "Facebook"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-fuchsia-600 select-none hover:bg-fuchsia-700"
            } transition duration-100 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[1] cursor-pointer`}
            onClick={() => {
              setActive("Facebook");
              setSearchQuery("Facebook");
            }}
            data-aos="fade-down-right"
          >
            Facebook
          </span>
          <span
            className={`py-2 px-5 text-white ${
              active === "Instagram"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-fuchsia-600 select-none hover:bg-fuchsia-700"
            } transition duration-100 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[1] cursor-pointer`}
            onClick={() => {
              setActive("Instagram");
              setSearchQuery("Instagram");
            }}
            data-aos="fade-down-left"
          >
            Instagram
          </span>
          <span
            className={`py-2 px-5 text-white ${
              active === "Tiktok"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-fuchsia-600 select-none hover:bg-fuchsia-700"
            } transition duration-100 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[1] cursor-pointer`}
            onClick={() => {
              setActive("Tiktok");
              setSearchQuery("Tiktok");
            }}
            data-aos="fade-down-left"
          >
            Tiktok
          </span>
        </div>
        {/* By Name */}
        <div
          className="flex flex-col gap-4 w-[95%] mt-4 sm:w-[80%]"
          data-aos="flip-up"
        >
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 
              "
          />
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 "
          >
            <option value="None">--Search By Subject--</option>
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
          {/* Subscribers */}
          <div className="flex items-start sm:items-center  flex-col sm:flex-row  sm:gap-2 gap-4 w-full">
            <h3 className="text-[17px] text-white font-medium">Subscribers:</h3>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                placeholder="From"
                value={fromSubscriber}
                onChange={(e) => setFromSubscriber(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 
              "
              />
              <span className=" w-[2rem] sm:w-[3rem] h-[2px] bg-gray-400"></span>
              <input
                type="number"
                placeholder="To"
                value={toSubscriber}
                onChange={(e) => setToSubscriber(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 
              "
              />
            </div>
          </div>
          {/* Price */}
          <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-2 gap-4 w-full">
            <h3 className="text-[17px] text-white font-medium">Price:</h3>
            <span className="w-[3rem] hidden sm:flex"></span>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                placeholder="From"
                value={fromPrice}
                onChange={(e) => setFromPrice(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 
              "
              />
              <span className=" w-[2rem] sm:w-[3rem] h-[2px] bg-gray-400"></span>
              <input
                type="number"
                placeholder="To"
                value={toPrice}
                onChange={(e) => setToPrice(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 
              "
              />
            </div>
          </div>
          {/* Income */}
          <div className="flex items-start sm:items-center  flex-col sm:flex-row  sm:gap-2 gap-4 w-full">
            <h3 className="text-[17px] text-white font-medium">Income:</h3>{" "}
            <span className="w-[1.7rem] hidden sm:flex"></span>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                placeholder="From"
                value={fromIncome}
                onChange={(e) => setFromIncome(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 
              "
              />
              <span className=" w-[2rem] sm:w-[3rem] h-[2px] bg-gray-400"></span>
              <input
                type="number"
                placeholder="To"
                value={toIncome}
                onChange={(e) => setToIncome(e.target.value)}
                className=" w-full h-[2.7rem] rounded-md shadow-md border-2 border-gray-700 outline-none px-3 
              "
              />
            </div>
          </div>

          {/* Handle Clear */}
          <div className="flex items-center justify-end mt-6 px-4 sm:px-8">
            <button
              className="py-[.4rem] px-6 cursor-pointer shadow-md hover:shadow-lg bg-red-600 hover:bg-red-700 text-white text-[13px] font-medium rounded-3xl "
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
