import Layout from "../../components/admin/Layout";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoAnalyticsOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { TbFileAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import UserAnalytics from "../../components/admin/Analytics/UserAnalytics";
import axios from "axios";
import { MdShop2 } from "react-icons/md";
import { AiOutlineRead } from "react-icons/ai";
import ChannelAnalytics from "../../components/admin/Analytics/ChannelAnalytics";
import { useAuth } from "../../context/authContext";
import SubscriptionAnalytics from "../../components/admin/Analytics/SubscriptionAnalytics";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const [price, setPrice] = useState(0);
  const [channels, setChannels] = useState([]);
  // Get Users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/all-users`
      );
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  // Get Order

  const getOrders = async () => {
    if (!auth.token) {
      return;
    }

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/orders/all-orders`
      );
      if (data) {
        const sum = data.orders.reduce(
          (acc, order) => acc + parseFloat(order.price),
          0
        );
        setPrice(sum);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, [auth]);

  function formatPrice(price) {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    } else {
      return `$${price}`;
    }
  }

  // Get All Channels Data
  const getChannels = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/channel/get-channels`
      );
      setChannels(data?.channels || []);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <Layout>
      {/* <Heading
        title="Admin-Dashboard"
        description="ChatDoc.ai is a plateform for business, teachers, professionals ,students to upload their knowledge documents and chat this documents"
        keywords="ChatDoc.ai, MERN, SASS,Redux, Context API, education, learning, , JavaScript, React, Node, Express, MongoDB, Next JS, TypeScript, CSS"
      /> */}
      <div className="w-full message overflow-y-auto px-2 md:px-[2rem] pt-6 pb-[5rem]">
        <div className="h-[70vh] pb-[6rem] transition-all duration-200 ">
          <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-4">
            <div className=" md:flex-[.3] py-4 px-3 bg-gray-100  rounded-md shadow shadow-gray-300 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-gray-800 ">
                  Congratulations! 🥳
                </h3>
                <span className="text-[14px] font-[400] text-gray-700 ">
                  Best seller of the month
                </span>
              </div>
              <div className="flex items-center gap-4 justify-between sm:justify-normal  mt-4">
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl font-[500] text-fuchsia-600">
                    {formatPrice(price)}
                  </h1>

                  <button className=" flex items-center gap-2 justify-center bg-fuchsia-500 py-2 px-[1.1rem] font-medium rounded-md shadow shadow-gray-300 text-white  cursor-pointer hover:scale-[1.01] active:scale-[1]">
                    View <GoArrowRight className="h-5 w-5 " />
                  </button>
                </div>
                <div className=" ml-[1rem] xl:ml-[4rem]">
                  <img
                    src="/dash.png"
                    alt="AdminLogo"
                    width={90}
                    height={120}
                  />
                </div>
              </div>
            </div>
            <div className="flex-[.6] md:flex-[.7] py-4 px-3 bg-gray-100  rounded-md shadow shadow-gray-300  cursor-pointer  ">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-gray-800 ">
                  Statistics Card
                </h3>
                <p className="text-[14px] font-[400] text-gray-700 ">
                  Total number of growth 😎 this month
                </p>
              </div>
              {/* 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-[2rem] md:mt-[3.5rem] md:pt-[.5rem] sm:pt-[2rem]">
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-green-600 font-medium rounded-md shadow shadow-gray-300 text-white  cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <FaUsers className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-[18px] font-medium text-gray-800 
                    "
                    >
                      Users
                    </h3>
                    <span className="text-[16px] font-medium text-green-600 ">
                      {users ? users?.length : "128K"}
                      {users?.length > 1000 && "k"}
                    </span>
                  </div>
                </Link>

                {/* 2 */}
                <Link
                  to="/admin/assistants"
                  className="flex items-center gap-2"
                >
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-pink-600 font-medium rounded-md shadow shadow-gray-300 text-white  cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <MdShop2 className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-[18px] font-medium text-gray-800 
                    "
                    >
                      Channels
                    </h3>
                    <span className="text-[16px] font-medium text-pink-600 ">
                      {channels?.length}
                    </span>
                  </div>
                </Link>

                {/* 3 */}
                <Link to="/admin/files" className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-sky-600 font-medium rounded-md shadow shadow-gray-300 text-white  cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <TiShoppingCart className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-[18px] font-medium text-gray-800 
                    "
                    >
                      Sellers
                    </h3>
                    <span
                      className="text-[16px] font-medium text-sky-600 
                    "
                    >
                      197k
                    </span>
                  </div>
                </Link>
                {/* 4 */}
                <Link to="/admin/leads" className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-fuchsia-600 font-medium rounded-md shadow shadow-gray-300 text-white  cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <AiOutlineRead className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-[18px] font-medium text-gray-800 
                    "
                    >
                      Blogs
                    </h3>
                    <span
                      className="text-[16px] font-medium text-fuchsia-600 
                    "
                    >
                      75.5k
                    </span>
                  </div>
                </Link>

                {/* End */}
              </div>
            </div>
          </div>
          {/* Analytics */}
          <div className="pb-[6rem] sm:pb-[1rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem] gap-4 ">
              {/* User Analytics */}
              <div className=" h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100  rounded-md shadow shadow-gray-300  cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3
                  className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-gray-800 
                "
                >
                  <IoAnalyticsOutline className=" text-3xl sm:text-4xl " />
                  Users Analytics
                </h3>
                <UserAnalytics />
              </div>
              <div className="flex-[.4] h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100  rounded-md shadow shadow-gray-300  cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3
                  className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800 
                "
                >
                  <TbBrandGoogleAnalytics className="  text-3xl sm:text-4xl text-sky-500 " />{" "}
                  Channels Analytics
                </h3>
                <ChannelAnalytics />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-4 mt-[2rem]">
              <div className="flex-[1] md:flex-[.7] h-[22rem] py-4 px-3 bg-gray-100  rounded-md shadow shadow-gray-300  cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3
                  className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-gray-800 
                "
                >
                  <GrAnalytics className=" text-3xl sm:text-4xl text-green-500 " />
                  Subscription Analytics
                </h3>
                <SubscriptionAnalytics />
              </div>
              <div className="md:flex-[.3] py-4 px-3 h-[17rem] flex-col gap-4 bg-gray-100  rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1]">
                <h2
                  className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-gray-800 
                "
                >
                  <RiMoneyDollarCircleLine
                    className="text-3xl sm:text-4xl "
                    style={{ color: "orangered" }}
                  />
                  Total Earning{" "}
                </h2>
                <p className="mt-1">Last Month Subscription Revenue ⚡</p>
                <div className="flex flex-row ">
                  <h3 className="text-2xl ml-2 sm:text-3xl mt-[1rem] ">
                    {formatPrice(price)}
                  </h3>
                  <img
                    src="/money.png"
                    alt="Analytics"
                    height={300}
                    width={230}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem] gap-4 ">
              {/* User Analytics */}
              <div className=" h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100  rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3
                  className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800 
                "
                >
                  <TbFileAnalytics className="  text-3xl sm:text-4xl text-pink-600 " />{" "}
                  Sellers Analytics
                </h3>
                {/* <FilesAnalytics /> */}
              </div>
              <div className=" h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100  rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3
                  className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800 
                "
                >
                  <AiOutlineRead className="  text-3xl sm:text-4xl text-fuchsia-500  " />{" "}
                  Blogs Analytics
                </h3>
                {/* <LeadAnalytics /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
