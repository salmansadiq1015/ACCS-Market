import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import CustomModle from "../utils/CustomModel";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Profile from "./auth/Profile";
import UpdateProfile from "./auth/UpdateProfile";
import UpdatePassword from "./auth/UpdatePassword";
import ResetPassword from "./auth/ResetPassword";
import ProfileModel from "../utils/ProfileModel";
import Verification from "./auth/Verification";
import { useAuth } from "../context/authContext";
import { MdFavorite } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [profileRoute, setProfileRoute] = useState("Profile");
  const [profileOpen, setProfileOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const router = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-950 h-[4rem]">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center ">
                  {/* Mobile menu button*/}
                  <div
                    className="flex flex-shrink-0 items-center ml-2 cursor-pointer select-none"
                    onClick={() => router("/")}
                  >
                    <img
                      className="h-10 w-auto flex  sm:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <h1 className="text-3xl hidden sm:flex font-bold text-white ">
                      ACCS-Market
                    </h1>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="w-[7.4rem] h-[2.3rem] text-[14px] flex items-center justify-center gap-[2px] mr-4 sm:mr-[2rem] rounded-3xl cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-100 bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
                    onClick={() => {
                      auth?.token
                        ? router(auth?.user && "/add-channel")
                        : setOpen(true);
                    }}
                  >
                    <FiPlus className="h-4 w-4 text-white" /> Start Selling
                  </button>
                  {/* Notification */}
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            auth?.token
                              ? `/api/v1/user/user-avatar/${auth?.user?.id}`
                              : "/user2.png"
                          }
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {auth?.user?.role === 1 && (
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                                onClick={() => {
                                  router("/admin/dashboard");
                                }}
                              >
                                Admin Dashboard
                              </span>
                            )}
                          </Menu.Item>
                        )}
                        {auth?.token ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                  onClick={() => {
                                    setProfileRoute("Profile");
                                    setProfileOpen(true);
                                  }}
                                >
                                  Your Profile
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                  onClick={() =>
                                    router(`/channels/${auth?.user?.id}`)
                                  }
                                >
                                  Your Selling Channel
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    " px-4 py-2 text-sm flex items-center gap-1 text-gray-700 cursor-pointer"
                                  )}
                                  onClick={() => router(`/channels/favorite`)}
                                >
                                  Favorite{" "}
                                  <MdFavorite className="h-4 w-4 text-red-500" />
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                  onClick={() => {
                                    setProfileRoute("UpdateProfile");
                                    setProfileOpen(true);
                                  }}
                                >
                                  Settings
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                  onClick={() => {
                                    handleLogout();
                                    setOpen(true);
                                    setRoute("Login");
                                  }}
                                >
                                  Sign out
                                </span>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                                onClick={() => setOpen(true)}
                              >
                                Login
                              </span>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      {/* Login */}
      {route === "Login" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      )}
      {/* Register */}
      {route === "Register" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Register}
            />
          )}
        </>
      )}
      {/* Varification */}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      )}
      {/* Reset Password */}
      {route === "ResetPassword" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={ResetPassword}
            />
          )}
        </>
      )}
      {/* Update Password */}
      {route === "UpdatePassword" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={UpdatePassword}
            />
          )}
        </>
      )}
      {/*--------------------- Profile--------------- */}
      {profileRoute === "Profile" && (
        <>
          {profileOpen && (
            <ProfileModel
              open={profileOpen}
              setOpen={setProfileOpen}
              setRoute={setProfileRoute}
              component={Profile}
            />
          )}
        </>
      )}
      {/* Update Profile */}
      {profileRoute === "UpdateProfile" && (
        <>
          {profileOpen && (
            <ProfileModel
              open={profileOpen}
              setOpen={setProfileOpen}
              setRoute={setProfileRoute}
              component={UpdateProfile}
            />
          )}
        </>
      )}
    </>
  );
}
