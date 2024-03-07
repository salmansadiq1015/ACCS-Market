import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useAuth } from "../../context/authContext";

export default function Login({ setOpen, setRoute }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/v1/user/login-user`, {
        email,
        password,
      });

      if (data?.success) {
        setAuth({ ...auth, user: data?.user, token: data?.token });
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Login successfully!", { duration: 3000 });
        setOpen(false);
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
    <div className="w-full py-3 px-2">
      <h1 className="text-center font-semibold text-[1.5rem] ">
        Login with ACCS.Market
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
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[1.1rem] font-[400] ">
            Enter your Password
          </label>
          <div className="relative w-full">
            <div
              className="absolute top-2 right-2 z-10 cursor-pointer"
              onClick={() => setIsShow(!isShow)}
            >
              {!isShow ? (
                <IoMdEyeOff size={25} className="cursor-pointer" />
              ) : (
                <IoMdEye size={25} className="cursor-pointer" />
              )}
            </div>
            <input
              type={!isShow ? "password" : "text"}
              placeholder="password!@#%"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-3 border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
            />
          </div>
          <div className="flex items-center justify-between my-3">
            <div className="flex items-center gap-2 ">
              <p className="text-[16px]">Not have an account?</p>
              <span
                className="text-blue-500 font-Poppins font-medium text-[1.1rem] hover:text-blue-600 cursor-pointer "
                onClick={() => setRoute("Register")}
              >
                Register
              </span>
            </div>
            <span
              type="button"
              onClick={() => setRoute("ResetPassword")}
              className="text-blue-500 font-Poppins font-medium text-[1.1rem] hover:text-blue-600 cursor-pointer "
            >
              Reset Password
            </span>
          </div>
          <button
            type="submit"
            className={`btn ${loading && "animate-pulse pointer-events-none"}`}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
