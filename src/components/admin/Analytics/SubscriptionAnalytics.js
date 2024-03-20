import axios from "axios";
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
import Loader from "../../../utils/Loader";

export default function SubscriptionAnalytics() {
  const [orderAnalytic, setOrderAnalytic] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/analytics/sub/analytics`
      );
      console.log("data A:", data);
      if (data) {
        setOrderAnalytic(data?.orders.last12Months);
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

  orderAnalytic &&
    orderAnalytic &&
    orderAnalytic.forEach((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-full  h-[100%] flex items-center justify-center ">
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              data={analyticsData}
              width={600}
              height={400}
              margin={{
                top: 10,
                right: 5,
                bottom: 10,
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
      )}
    </>
  );
}
