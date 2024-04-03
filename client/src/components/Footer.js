"use client";
import React from "react";
import { IoIosMailUnread } from "react-icons/io";
import { FaDiscord } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      className="w-full text-center flex flex-col gap-4 items-center bg-gray-900 text-white
    justify-center  border-t border-gray-600 dark:border-gray-400 "
      style={{ boxShadow: "0rem 2px .1rem 2px rgba(0,0,0,.25)" }}
    >
      <div className="w-full px-3 sm:px-6 py-10 max-w-screen-xl mx-auto md:px-8 grid grid-cols-1 lg:grid-cols-5 gap-x-0 gap-y-16 lg:gap-20">
        <div className=" col-span-2 w-full flex flex-col gap-6 items-start sm:mx-auto text-start ">
          <Link to="/">
            <h1
              className="text-2xl  text-fuchsia-600 font-bold cursor-pointer"
              style={{
                textDecoration: "underline",
              }}
            >
              ACCS-Market
            </h1>
          </Link>
          <p className=" text-justify">
            <b>ACCS-Market</b> offers diverse buying and selling channels,
            leveraging platforms like YouTube, Facebook, Instagram, and TikTok
            for efficient transactions and outreach.
          </p>
          <div className="flex items-center justify-center sm:items-start sm:justify-start  w-full">
            <ul className="flex items-center gap-4">
              <li className="text-fuchsia-500  py-1 px-4 rounded-3xl bg-blue-100 hover:bg-blue-200 transition">
                <Link to="#gmail" title="Gmail">
                  <IoIosMailUnread size="25" />
                </Link>
              </li>
              <li className="text-violet-500 py-1 px-4 rounded-3xl bg-violet-100 hover:bg-violet-200 transition">
                <Link to="#discord" title="Discord">
                  <FaDiscord size="25" />
                </Link>
              </li>
              <li className="text-pink-500 py-1 px-4 rounded-3xl bg-pink-100 hover:bg-pink-200 transition">
                <Link to="#linkedIn" className="text-pink-600" title="LinkedIn">
                  <FaLinkedin size="25" />
                </Link>
              </li>
              <li className="text-green-500 py-1 px-4 rounded-3xl bg-green-100 hover:bg-green-200 transition">
                <Link to="#twitter" title="Twitter">
                  <FaTwitter size="25" />
                </Link>
              </li>
            </ul>
          </div>
          <h3 className=" font-medium text-center sm:text-start">
            &copy; 2024 - ACCS-Market - Created by{" "}
            <Link to="https://kind-tunic-lamb.cyclic.app/" target="new">
              <span className=" font-[600] cursor-pointer text-fuchsia-500 ">
                ACCS-Market
              </span>
            </Link>
          </h3>
        </div>
        <div className=" col-span-3 w-full ml-0 sm:ml-[2rem] ">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
            <div className=" flex flex-col gap-3 items-start mt-4 sm:mt-0">
              <h3 className=" text-lg font-semibold text-fuchsia-500  ">
                Product
              </h3>
              <ul className=" flex flex-col gap-3 items-start">
                <li className="hover:text-sky-500 cursor-pointer hover:border-b-2 hover:border-sky-500 transition-all">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-sky-500 cursor-pointer hover:border-b-2 hover:border-sky-500 transition-all">
                  <Link to="/features">Features</Link>
                </li>
                <li className=" hover:text-sky-500 cursor-pointer hover:border-b-2 hover:border-sky-500 transition-all">
                  <Link to="/comments">Testimonials</Link>
                </li>
                <li className="hover:text-sky-500 cursor-pointer hover:border-b-2 hover:border-sky-500 transition-all">
                  <Link to="/blogs">Blogs</Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 items-start mt-4 sm:mt-0 ">
              <h3 className=" text-lg font-semibold text-fuchsia-500  ">
                Links
              </h3>

              <ul className=" flex flex-col gap-3 items-start">
                <li className="hover:text-sky-500 cursor-pointer hover:border-b-2 hover:border-sky-500 transition-all">
                  <Link to="/faq">FAQ</Link>
                </li>
                <li className="hover:text-sky-500 cursor-pointer hover:border-b-2 hover:border-sky-500 transition-all">
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li className="hover:text-sky-500 cursor-pointer hover:border-b-2 hover:border-sky-500 transition-all">
                  <Link to="/term-&-services">Terms of Services</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
