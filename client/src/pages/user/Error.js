import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-red-600 text-center">
          Payment Error 😈
        </h1>
        <p className="text-lg text-gray-800 text-center">
          There was an error processing your payment. Please try again later.
        </p>
        <p className="text-sm text-gray-600 text-center">
          If the problem persists, please contact customer support for
          assistance.
        </p>
        <div className="flex items-center justify-center w-full mt-5">
          <button
            className="text-[16px] border-2 flex w-[14rem] items-center justify-center gap-1 bg-fuchsia-500 hover:bg-fuchsia-600 cursor-pointer transition-all duration-150 text-white rounded-3xl py-2 px-5 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
            onClick={() => navigate("/")}
          >
            <MdKeyboardBackspace className="h-5 w-5 text-white" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
