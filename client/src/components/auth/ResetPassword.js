import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { TiArrowLeft } from "react-icons/ti";

export default function ResetPassword({ setOpen, setRoute }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/reset-password`,
        {
          email,
        }
      );

      if (data?.success) {
        setRoute("UpdatePassword");
        toast.success(data?.message, { duration: 3000 });
        setLoading(false);
      } else {
        toast.error(data?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 3000 });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-full p-1 w-[2rem] h-[2rem] flex items-center justify-center hover:bg-blue-500/40 cursor-pointer text-black">
        <TiArrowLeft size={30} onClick={() => setRoute("Login")} />
      </div>
      <div className="w-full py-3 px-2">
        <h1 className="text-center font-semibold text-[1.5rem] ">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[1.1rem] font-[400] ">
              Enter your Email
            </label>
            <input
              type="email"
              placeholder="loginmail@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-3 border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
            />
          </div>
          <button
            type="submit"
            className={`btn ${loading && "animate-pulse pointer-events-none"}`}
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
}
