import React from "react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Section1() {
  const navigate = useNavigate();
  return (
    <div className=" relative w-full min-h-screen pt-8 px-2 pb-5 sm:px-4 bg-gradient-to-br  from-fuchsia-950 to-gray-950">
      <div className="absolute top-3 right-2 w-[13rem] h-[13rem] borderRadius bg-fuchsia-600/30 animate-spin z-20"></div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 sm:grid-flow-col-reverse z-30 gap-8 sm:gap-4">
        <div className="w-full h-full">
          <img
            src="/c1.avif"
            alt="Section1"
            className="w-full h-full rounded-md object-fill"
          />
        </div>
        <div className="flex flex-col gap-4 px-3 sm:px-4">
          <h1
            className=" text-3xl sm:text-5xl font-semibold text-white text-center"
            style={{ textShadow: "-.2px 1px 0px $ccc" }}
          >
            Discover Diverse Buying and Selling Channels with ACCS-Market
          </h1>
          <p className="text-[15px] text-gray-200 text-center mt-3">
            Welcome to ACCS-Market, your gateway to a wide array of buying and
            selling channels. We empower businesses and individuals to leverage
            popular platforms such as YouTube, Facebook, Instagram, and TikTok
            for seamless and efficient transactions. Whether you're looking to
            expand your reach or explore new opportunities, ACCS-Market provides
            the tools and support you need to thrive in today's dynamic
            marketplace. Join us and unlock the potential of diversified online
            commerce.
          </p>
          <div className="flex items-center justify-center mt-4">
            <button
              className="text-[16px] bg-fuchsia-500 flex items-center justify-center gap-1 hover:bg-fuchsia-600 cursor-pointer text-white rounded-3xl py-2 px-[2rem] shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[1] filter hover:drop-shadow-md "
              onClick={() => navigate("/all-channels")}
            >
              Get Started
              <GoArrowRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
