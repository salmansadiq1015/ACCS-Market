import React from "react";

export default function ImageModel({ url }) {
  return (
    <div className=" w-[90%] sm:w-[70%] h-[85%] sm:h-[80%] rounded-lg shadow-md bg-white/80 overflow-hidden object-fill border-[2px] border-fuchsia-600">
      <img src={url} alt="Logo" className=" w-full h-full" />
    </div>
  );
}
