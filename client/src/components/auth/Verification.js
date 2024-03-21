import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useAuth } from "../../context/authContext";
import axios from "axios";

export default function Verification({ setRoute }) {
  const { token } = useAuth();
  const [invalidError, setInvalidError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [varifyNumber, setVarifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  // Varification

  const handleInputChange = (index, value) => {
    setInvalidError(false);
    const newVarifyNumber = { ...varifyNumber, [index]: value };
    setVarifyNumber(newVarifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  //   Handle Varifiation
  const varificationHandler = async () => {
    const verificationNumber = Object.values(varifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/verification-account`,
        {
          activation_code: verificationNumber,
          activation_token: token,
        }
      );
      if (data?.success) {
        setRoute("Login");
        toast.success(data?.message);
        setLoading(false);
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <h1 className={``}>Verify Your Account</h1>
      <br />
      <div className="mt-2 w-full flex items-center justify-center">
        <div
          className={`w-[80px] h-[80px] rounded-full ${
            invalidError ? "bg-red-600 animate-pulse" : "bg-[#497DF2]"
          } flex items-center justify-center`}
        >
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>
      <br />
      <br />
      <div className=" m-auto flex items-center justify-center gap-5">
        {Object.keys(varifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-md flex items-center text-black justify-center text-[18px]  font-Poppins outline-none text-center ${
              invalidError ? " shake border-red-600" : " border-gray-900"
            }`}
            placeholder=""
            maxLength={1}
            value={varifyNumber[key]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button
          className={`btn ${
            loading && " w-full animate-pulse pointer-events-none"
          }`}
          onClick={varificationHandler}
          style={{ width: "80%" }}
        >
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center font-[16px] text-black mt-2 font-Poppins">
        Go back to sign in?{" "}
        <span
          className="text-blue-500 hover:text-blue-600 cursor-pointer pl-2 font-semibold"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
}
