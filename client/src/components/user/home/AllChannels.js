import React, { useEffect, useState } from "react";
import MainLayout from "../../MainLayout";
import axios from "axios";
import Loader from "../../../utils/Loader";
import Channels from "./Channels";

export default function AllChannels() {
  const [channelsData, setChannelsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get All Channels Data
  const getChannels = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/channel/get-channels`
      );
      setChannelsData(data?.channels || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching channels:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);
  return (
    <MainLayout>
      <div className="w-full min-h-[90vh] py-6 px-4">
        <h1 className="text-3xl sm:text-4xl ml-0 sm:ml-7 font-bold">
          All Channels
        </h1>
        <div className="py-6">
          {loading ? <Loader /> : <Channels channelsData={channelsData} />}
        </div>
      </div>
    </MainLayout>
  );
}
