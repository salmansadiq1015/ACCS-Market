import React from "react";
import Layout from "../../components/admin/Layout";
import SubscriptionAnalytics from "../../components/admin/Analytics/SubscriptionAnalytics";

export default function SubscriptionAnalytic() {
  return (
    <Layout>
      <div className="w-full h-[89%] pt-[1rem]  pb-[1rem] px-3 sm:px-5 overflow-y-auto message">
        <div className=" flex flex-col gap-2">
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
        <SubscriptionAnalytics />
      </div>
    </Layout>
  );
}
