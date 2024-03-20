import Layout from "../../components/admin/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Loader from "../../utils/Loader";

export default function UserAnalytics() {
  const [userAnalytic, setUserAnalytic] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/analytics/user/analytics`
      );
      console.log("data A:", data);
      if (data) {
        setUserAnalytic(data?.users.last12Months);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAnalytics();
  }, []);

  const analyticsData = [];
  userAnalytic &&
    userAnalytic.forEach((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

  const minValue = 0;
  return (
    <Layout>
      <div className="w-full h-[89%]  py-7 px-2 sm:px-5 overflow-y-auto message">
        {loading ? (
          <Loader />
        ) : (
          <div className="h-full w-full">
            <div className="mt-3 flex flex-col gap-2">
              <h1
                className="text-2xl sm:text-3xl font-semibold "
                style={{
                  color: "#4facfe",
                  textShadow: "-.1px 1px 0px #ccc",
                }}
              >
                User Analytics
              </h1>
              <p className="text-[15px]">Last 12 months analytics data</p>
            </div>
            <hr className="my-3 h-[2px] bg-gray-300" />

            <div className="w-full h-[90%] flex items-center justify-center">
              <ResponsiveContainer width="98%" height="80%">
                <AreaChart
                  data={analyticsData}
                  className="top-4 right-5 left-0 bottom-0"
                >
                  <XAxis dataKey={"name"} />
                  <YAxis domain={[minValue, "auto"]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke={"#4facfe"}
                    fill={"#4facfe"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
