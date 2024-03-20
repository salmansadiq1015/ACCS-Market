import React, { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Loader from "../../../utils/Loader";
import axios from "axios";

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
  console.log("User AnalData:", analyticsData);
  userAnalytic &&
    userAnalytic &&
    userAnalytic.forEach((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

  const minValue = 0;
  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-full  h-[100%] flex items-center justify-center ml-[-1rem]">
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart
              data={analyticsData}
              margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
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
      )}
    </>
  );
}
