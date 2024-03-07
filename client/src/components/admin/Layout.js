import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/authContext";
import Spinner from "../../utils/Spinner";
import MainLayout from "../MainLayout";

export default function Layout({ children }) {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const { auth } = useAuth();
  if (!auth?.token || auth?.user?.role !== 1) {
    return <Spinner />;
  }
  return (
    <MainLayout>
      <div className=" w-full flex-1 gap-1 flex h-screen dark:bg-gray-900 fixed top-0 left-0 overflow-hidden mt-[4rem]">
        {!show && (
          <div className=" flex sm:hidden  absolute top-2 left-3">
            <IoMenu
              onClick={() => setShow(true)}
              size={25}
              className="hover:text-blue-500 transition-all duration-150"
            />
          </div>
        )}
        <div
          className={`hidden sm:flex dark:bg-gray-900 transition-all duration-200 ${
            hide ? "w-[5rem]" : "w-[13rem]"
          }`}
        >
          <AdminSidebar hide={hide} setHide={setHide} />
        </div>
        {show && (
          <div className=" absolute top-0 left-0 flex dark:bg-gray-900 bg-white sm:hidden z-20 w-[13rem] pt-[2rem]  border-r-[2px] dark:border-gray-300 border-gray-600">
            <div className="absolute top-2 right-3">
              <IoClose
                onClick={() => setShow(false)}
                size={25}
                className="hover:text-blue-500 transition-all duration-150"
              />
            </div>
            <AdminSidebar />
          </div>
        )}
        <div className="flex-[1.8] border-r-red-500  pt-[2.5rem] sm:pt-0 border-l-[2px] dark:border-gray-300 border-gray-600">
          {children}
        </div>
      </div>
    </MainLayout>
  );
}
