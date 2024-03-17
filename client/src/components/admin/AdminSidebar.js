"use client";
import React, { useEffect } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { GrChannel } from "react-icons/gr";
import { BsFileEarmarkText } from "react-icons/bs";
// import { BsBell } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TbFileAnalytics } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function AdminSidebar({ hide, setHide }) {
  const router = useNavigate();
  const { auth, active, setActive } = useAuth();

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const fileIdFromPath = pathArray[2];
    setActive(fileIdFromPath);

    // exlint-disable-next-line
  }, [setActive]);

  const loaderProp = ({ src }) => {
    return src;
  };

  return (
    <div className="w-full h-screen py-2 ">
      <div className=" hidden sm:flex items-center justify-end pr-1 ">
        {hide ? (
          <AiOutlineMenuUnfold
            onClick={() => setHide(!hide)}
            className="h-6 w-6 cursor-pointer hover:text-fuchsia-600 transition-all duration-150"
          />
        ) : (
          <AiOutlineMenuFold
            onClick={() => setHide(!hide)}
            className="h-6 w-6 cursor-pointer hover:text-fuchsia-600 transition-all duration-150"
          />
        )}
      </div>
      <div className="relative flex items-center justify-center flex-col gap-2 ">
        <div
          className={`relative ${
            hide ? "w-[3rem] h-[3rem]" : "w-[4rem] h-[4rem]"
          } rounded-full object-fill mt-2 border-[2px] shadow-md shadow-gray-300  filter drop-shadow-md active:scale-[1.03] select-none`}
          style={{
            border: `2px solid rgb(2, 68, 2)`,
          }}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${auth?.user?.id}`}
            alt="Admin"
            layout="fill"
            className="rounded-full"
            loader={loaderProp}
          />
        </div>
        <h3 className="text-[18px] font-semibold text-black  fon">
          {hide ? "" : auth?.user?.name}
        </h3>
      </div>
      {/*  */}
      <div className="relative w-full  py-3 h-[27rem] sm:h-[24.4rem] pb-[4rem] sm:pb-[3rem] overflow-y-auto message">
        <div className="relative w-full   flex flex-col gap-4 overflow-y-auto allMessages py-1 pb-6 pr-1 message">
          {/* 1 */}
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/dashboard");
            }}
          >
            <div
              className="adminbtn absolute h-full sidebtn z-[20]" //
              style={{
                width: active === "dashboard" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <LuLayoutDashboard
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "dashboard" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <LuLayoutDashboard
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "dashboard" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "dashboard" && "#fff" }}
                  >
                    Dashboard
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 2 */}
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/users");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "users" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <FaUsers
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "users" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <FaUsers
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "users" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "users" && "#fff" }}
                  >
                    Users
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 3 */}
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/channels");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "channels" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <GrChannel
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "channels" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <GrChannel
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "channels" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "channels" && "#fff" }}
                  >
                    Channels
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 4 */}
          {/* <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/sellers");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "sellers" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <LiaUsersSolid
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "sellers" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <LiaUsersSolid
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "sellers" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "sellers" && "#fff" }}
                  >
                    Sellers
                  </span>
                </div>
              )}
            </div>
          </div> */}
          {/* 5 */}
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/blogs");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "blogs" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <BsFileEarmarkText
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "blogs" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <BsFileEarmarkText
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "blogs" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "blogs" && "#fff" }}
                  >
                    Blogs
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 6 */}
          {/* <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/notifications");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "notifications" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <BsBell
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "notifications" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <BsBell
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "notifications" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "notifications" && "#fff" }}
                  >
                    Notifications
                  </span>
                </div>
              )}
            </div>
          </div> */}
          {/* 7 */}
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/subscription");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "subscription" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <BsCashCoin
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "subscription" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <BsCashCoin
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "subscription" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{ color: active === "subscription" && "#fff" }}
                  >
                    Subscription
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* HR */}
          <hr className="my-2" />
          <h4 className="text-[16] font-semibold px-2">Analytics</h4>

          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/user-analytics");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "user-analytics" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <LiaUsersCogSolid
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "user-analytics" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <LiaUsersCogSolid
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "user-analytics" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{ color: active === "user-analytics" && "#fff" }}
                  >
                    User Analytics
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2 */}
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/channel-analytics");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "channel-analytics" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <TbBrandGoogleAnalytics
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "channel-analytics" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <TbBrandGoogleAnalytics
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{
                      color: active === "channel-analytics" && "#fff",
                    }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{
                      color: active === "channel-analytics" && "#fff",
                    }}
                  >
                    Channels Analytics
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 3 */}
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/subscription-analytics");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "subscription-analytics" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <TbFileAnalytics
                  className="h-7 w-7 cursor-pointer ml-1"
                  style={{
                    color: active === "subscription-analytics" && "#fff",
                  }}
                />
              ) : (
                <div className="flex items-center gap-1">
                  <TbFileAnalytics
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{
                      color: active === "subscription-analytics" && "#fff",
                    }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{
                      color: active === "subscription-analytics" && "#fff",
                    }}
                  >
                    Subscription Analytic
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 4 */}

          <hr className="my-2" />
          <h4 className="text-[16] font-semibold px-2">Settings</h4>
          <div
            className=" mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm shadow-gray-300 bg-gray-200  filter drop-shadow-md  overflow-hidden"
            onClick={() => {
              router("/admin/layout-settings");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "layout-settings" && "100%",
                background: `rgb(2, 68, 2)`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <GoGear
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "layout-settings" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <GoGear
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "layout-settings" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{ color: active === "layout-settings" && "#fff" }}
                  >
                    Layout Settings
                  </span>
                </div>
              )}
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
