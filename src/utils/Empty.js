import React from "react";
import { useNavigate } from "react-router-dom";

export default function Empty({ message }) {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center flex-col gap-1">
      <img src="/empty.png" alt="Empty" className="w-[15rem] h-[15rem]" />
      <h3 className="text-lg font-semibold">{message}</h3>
      <button
        className="text-[14px] border-2 mt-3 py-2 px-5  bg-fuchsia-500 hover:bg-fuchsia-600 cursor-pointer  transition-all duration-150 text-white rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
        onClick={() => navigate("/add-channel")}
      >
        Sell Channel
      </button>
    </div>
  );
}
