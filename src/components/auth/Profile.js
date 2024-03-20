import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

export default function Profile({ setRoute }) {
  const { auth } = useAuth();
  const [data, setData] = useState({});

  // User Data
  const userData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/single-user/${auth?.user.id}`
      );
      if (data?.success) {
        setData(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userData();
    //   eslint-disable-next-line
  }, []);

  //   Profile Image
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${auth?.user.id}`;
    setAvatar(url);
    userData();
    // eslint-disable-next-line
  }, [data]);
  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center justify-center px-2 py-4 text-black">
        <div className="relative w-[6rem] h-[6rem] rounded-full border-2 border-green-500 overflow-hidden">
          <img
            src={`${avatar}`}
            alt="Profile"
            className="rounded-full w-[6rem] h-[6rem] object-fill"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="" className="text-[1.1rem] font-medium">
            Full Name
          </label>
          <input
            type="text"
            value={data?.name}
            disabled
            className="pointer-events-none py-2 px-3 text-[1rem] ring-green-600 ring-2 rounded-md shadow-md w-full "
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="" className="text-[1.1rem] font-medium">
            Email Address
          </label>
          <input
            type="text"
            value={data?.email}
            disabled
            className="pointer-events-none py-2 px-3 text-[1rem] ring-green-600 ring-2 rounded-md shadow-md w-full "
          />
        </div>
        <div className="relative flex flex-col items-end justify-end gap-2 w-full  ">
          <button
            className=" btn w-[7.5rem]"
            style={{ borderRadius: ".3rem" }}
            onClick={() => setRoute("UpdateProfile")}
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
}
