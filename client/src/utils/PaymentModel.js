import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { GrCreditCard } from "react-icons/gr";
import { TbCoinBitcoin } from "react-icons/tb";
import { useAuth } from "../context/authContext";
import { loadStripe } from "@stripe/stripe-js";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";

export default function PaymentModel({ setIsOpen, channelData }) {
  const { auth } = useAuth();
  const [paymentLoad, setPaymentLoad] = useState(false);

  // ---------------Handle Buy Channels-------------
  const makePayment = async () => {
    if (!auth?.token) {
      return toast.error("Login required to buy channel!");
    }
    setPaymentLoad(true);
    const stripe = await loadStripe(
      "pk_test_51OKdAYHDam9TUVDQjZG6rTj0nzzrKcvaUui6kSk4ivuTObT42WJZEhrfj5UeIrbBVgnjAkH7iWkxSgPRvalzBrTz00FOa4YigN"
    );

    const body = {
      userId: channelData.userId,
      channelId: channelData._id,
      price: channelData.price,
      buyerEmail: auth.user.email,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    // ${process.env.REACT_APP_API_URL}

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/orders/channel/payment`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    setPaymentLoad(false);
    const session = await response.json();
    const metaData = session.metaData;
    localStorage.setItem(
      "metaData",
      JSON.stringify({ paymentId: session.id, metaData: metaData })
    );

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    setPaymentLoad(false);

    if (result.error) {
      console.log(result.error);
      setPaymentLoad(false);
    }
  };

  return (
    <div className="relative w-[20rem] sm:w-[25rem] rounded-xl shadow-md shadow-gray-300  bg-white text-black py-4 px-4 select-none">
      <span
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <IoClose className="h-5 w-5 cursor-pointer hover:text-red-500 transition-all duration-150" />
      </span>
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-semibold text-2xl">Create a Deal</h1>
        <p className="text-center text-gray-600">
          Select payment methods you can use to pay the seller.{" "}
        </p>

        <div className="flex items-center justify-center gap-6 mt-3">
          <div
            className="flex items-center justify-center gap-1 py-2 px-4 rounded-md shadow-md shadow-gray-300 bg-gray-100 border border-gray-300 cursor-pointer hover:bg-fuchsia-600 transition duration-150 text-fuchsia-500 hover:text-white"
            onClick={makePayment}
            disabled={paymentLoad}
          >
            <GrCreditCard className="h-5 w-5 " /> Card{" "}
            {paymentLoad && (
              <BiLoaderCircle className="h-4 w-4 animate-spin text-white" />
            )}
          </div>
          <div className="flex items-center justify-center gap-1 py-2 px-4 rounded-md shadow-md shadow-gray-300 bg-gray-100 border border-gray-300 cursor-pointer hover:bg-fuchsia-600 transition duration-150 text-fuchsia-500 hover:text-white">
            <TbCoinBitcoin className="h-5 w-5 text-orange-500" /> Bitcoin
          </div>
        </div>
      </div>
    </div>
  );
}
