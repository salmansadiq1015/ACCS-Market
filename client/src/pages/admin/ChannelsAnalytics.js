import axios from "axios";
import Layout from "../../components/admin/Layout";

import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../utils/Loader";

export default function ChannelsAnalytics() {
  const [channelAnalytic, setChannelAnalytic] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/analytics/channel/analytics`
      );
      console.log("data A:", data);
      if (data) {
        setChannelAnalytic(data?.channel.last12Months);
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
  channelAnalytic &&
    channelAnalytic.forEach((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

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
                  color: "#047857",
                  textShadow: "-.1px 1px 0px #ccc",
                }}
              >
                Channels Analytics
              </h1>
              <p className="text-[15px]">Last 12 months analytics data</p>
            </div>
            <hr className="my-3 h-[2px] bg-gray-300" />

            <div className="w-full h-[90%] flex items-center justify-center">
              <ResponsiveContainer width="98%" height="80%">
                <ComposedChart
                  data={analyticsData}
                  width={500}
                  height={400}
                  margin={{
                    top: 20,
                    right: 5,
                    bottom: 20,
                    left: 5,
                  }}
                >
                  <CartesianGrid stroke={"#047857"} />
                  <XAxis
                    dataKey="name"
                    label={{
                      value: "Pages",
                      position: "insideBottomRight",
                      offset: 0,
                    }}
                    scale="band"
                  />
                  <YAxis
                    label={{
                      value: "Index",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#4d62d9"
                    fill={"#047857"}
                  />
                  <Bar dataKey="count" barSize={20} fill={"#047857"} />
                  <Line type="monotone" dataKey="count" stroke={"#047857"} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
