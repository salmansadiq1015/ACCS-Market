import Layout from "../../components/admin/Layout";

import axios from "axios";

import React, { useEffect, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { MdOutlineAutoDelete } from "react-icons/md";
import { TbLoader3 } from "react-icons/tb";
import Loader from "../../utils/Loader";

export default function Users() {
  const [load, setLoad] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Single User
  // const getSingleUsers = async (id) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.get(`/api/v1/users/single-user/${id}`);
  //     if (data?.success) {
  //       setUsers(data?.users);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/all-users`
      );
      if (data?.success) {
        setUsers(data?.users);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  // Update Role Of Users

  const handleRoleChange = async (role, id) => {
    if (!id) {
      return toast.error("User Id is required!");
    }
    setLoad(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/user/update-role/${id}`,
        {
          role,
        }
      );
      if (data?.success) {
        getAllUsers();
        toast.success(data?.message);
        setLoad(false);
      } else {
        toast.error(data?.message);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoad(false);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    if (!id) {
      return toast.error("User Id is required!");
    }
    setLoad(true);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/user/delete-user/${id}`
      );
      if (data?.success) {
        getAllUsers();
        toast.success(data?.message);
        setLoad(false);
      } else {
        toast.error(data?.message);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoad(false);
    }
  };

  const loaderProp = ({ src }) => {
    return src;
  };

  return (
    <Layout>
      <div className="w-full min-h-screen py-4 px-3 bg-white  ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold  ">All Users</h1>
          <span>
            {load && (
              <TbLoader3 className="h-5 w-5 animate-spin text-red-500" />
            )}
          </span>
        </div>
        <div className=" py-4">
          <hr className="w-full h-[2px] bg-gray-400" />
        </div>
        {loading ? (
          <div className="">
            <Loader />
          </div>
        ) : (
          <div className="w-full message overflow-y-auto">
            <div className="h-[70vh] pb-[6rem] ">
              <table
                className="border-2  w-full hidden sm:table shadow-md shadow-gray-300  rounded-md filter drop-shadow-md "
                style={{
                  border: `2px solid #D500F9 `,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#D500F9",
                    }}
                    color="#fff"
                  >
                    <th className="border-2 py-2  px-2 text-center hidden sm:block border-none">
                      Sr#
                    </th>
                    <th
                      className="border-2 py-2 px-2 text-center"
                      style={{
                        border: `2px solid #D500F9`,
                      }}
                    >
                      Avatar
                    </th>
                    <th
                      className="border-2 py-2 px-2 text-center"
                      style={{
                        border: `2px solid #D500F9`,
                      }}
                    >
                      Name
                    </th>
                    <th
                      className="border-2 py-2 px-2 text-center"
                      style={{
                        border: `2px solid #D500F9`,
                      }}
                    >
                      Email
                    </th>
                    <th
                      className="border-2 py-2 px-2 text-center"
                      style={{
                        border: `2px solid #D500F9`,
                      }}
                    >
                      Date
                    </th>
                    <th
                      className="border-2 py-2 px-2 text-center"
                      style={{
                        border: `2px solid #D500F9`,
                      }}
                    >
                      role
                    </th>
                    <th
                      className="border-2 py-2 px-2 text-center"
                      style={{
                        border: `2px solid #D500F9`,
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td
                        className="border-t-2 h-full  py-2 px-2 text-center hidden sm:block"
                        style={{
                          borderTop: `2px solid #D500F9`,
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="border-2 py-1 px-2 text-center"
                        style={{
                          border: `2px solid #D500F9`,
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <div className="relative w-[2.5rem] h-[2.5rem] overflow-hidden border border-sky-500  shadow-md shadow-gray-300 hover:shadow-lg filter  text-black rounded-full">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${user._id}`}
                              alt="Avatar"
                              loader={loaderProp}
                              className="w-[2.5rem] h-[2.5rem]  rounded-full"
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className="border-2 py-2 px-2 text-center"
                        style={{
                          border: `2px solid #D500F9`,
                        }}
                      >
                        {user?.name}
                      </td>
                      <td
                        className="border-2 py-2 px-2 text-center overflow-x-auto "
                        style={{
                          border: `2px solid #D500F9`,
                        }}
                      >
                        {user?.email}
                      </td>
                      <td
                        className="border-2 py-2 px-2 text-center"
                        style={{
                          border: `2px solid #D500F9`,
                        }}
                      >
                        {moment(user?.createdAt).format("MMMM Do YYYY")}
                      </td>
                      <td
                        className="border-2 py-2 px-2 text-center overflow-x-auto "
                        style={{
                          border: `2px solid #D500F9`,
                        }}
                      >
                        <select
                          value={user?.role}
                          onChange={(e) =>
                            handleRoleChange(e.target.value, user?._id)
                          }
                          className="bg-transparent h-full outline-none"
                        >
                          <option value={0}>User</option>
                          <option value={1}>Admin</option>
                        </select>
                      </td>
                      <td
                        className="border-2 py-2 px-2 text-center"
                        style={{
                          border: `2px solid #D500F9`,
                        }}
                      >
                        <div className="w-full flex items-center justify-center">
                          <span
                            className="p-1 rounded-md shadow-md  cursor-pointer transition-all duration-150 hover:bg-red-500 flex items-center justify-center text-red-500 hover:text-white"
                            onClick={() => handleDelete(user?._id)}
                          >
                            <MdOutlineAutoDelete className="w-6 h-6" />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Format */}

              <div className=" sm:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 min-h-screen pb-[4rem]">
                {users?.map((user, index) => (
                  <div
                    key={index}
                    className="py-4 flex flex-col gap-3 px-3 rounded-md box cursor-pointer border-2 border-sky-600 dark:border-fuchsia-600 bg-gray-50 text-black "
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-3xl py-1 px-2 border border-green-500 bg-green-500/30 cursor-pointer shadow-md text-xs">
                        {moment(user?.createdAt).format("MMMM Do YYYY")}
                      </span>
                      <span
                        className="p-1 rounded-md shadow-md  cursor-pointer transition-all duration-150 hover:bg-red-500 flex items-center justify-center text-red-500 hover:text-white"
                        onClick={() => handleDelete(user?._id)}
                      >
                        <MdOutlineAutoDelete className="w-5 h-5" />
                      </span>
                    </div>
                    <div className=" relative flex flex-col items-center justify-center  gap-2 w-full">
                      <div className="">
                        <div className="relative w-[4.5rem] h-[4.5rem] overflow-hidden border border-sky-500 dark:border-fuchsia-500 dark:shadow-gray-600 shadow-md shadow-gray-300 hover:shadow-lg filter  hover:drop-shadow-md rounded-full">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/api/v1/user/user-avatar/${user._id}`}
                            alt="Avatar"
                            className="w-full h-full  rounded-full"
                            loader={loaderProp}
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        value={user?.name}
                        disabled
                        className="border-2 w-full rounded-md border-gray-500 shadow-md py-2 px-3 text-black dark:text-white"
                      />

                      <input
                        type="text"
                        value={user?.email}
                        disabled
                        className="border-2 w-full rounded-md border-gray-500 shadow-md py-2 px-3 text-black dark:text-white"
                      />
                      <select
                        value={user?.role}
                        onChange={(e) =>
                          handleRoleChange(e.target.value, user?._id)
                        }
                        className="bg-transparent w-full border-2 h-[2.6rem] rounded-md border-gray-500 shadow-md  outline-none"
                      >
                        <option value={0} className="text-black">
                          User
                        </option>
                        <option value={1} className="text-black">
                          Admin
                        </option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
