import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import axios from "axios";
import Filter from "../../components/user/home/Filter";
import Channels from "../../components/user/home/Channels";
import Loader from "../../utils/Loader";

export default function Home() {
  const [channelsData, setChannelsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [fromIncome, setFromIncome] = useState("");
  const [toIncome, setToIncome] = useState("");
  const [fromSubscriber, setFromSubscriber] = useState("");
  const [toSubscriber, setToSubscriber] = useState("");
  const [loading, setLoading] = useState(false);

  // Get All Channels Data
  const getChannels = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/channel/get-channels`);
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

  // Filter Channel
  const filteredChannels = channelsData.filter((channel) => {
    // Filter by searchQuery
    if (
      searchQuery &&
      channel.category &&
      channel.category.toLowerCase().indexOf(searchQuery.toLowerCase()) === -1
    ) {
      return false;
    }

    // Filter by name
    if (name && channel.name.toLowerCase().indexOf(name.toLowerCase()) === -1) {
      return false;
    }

    // Filter by subject
    if (subject && channel.subject !== subject) {
      return false;
    }

    // Filter by price
    if (fromPrice && parseInt(channel.price) < parseInt(fromPrice)) {
      return false;
    }
    if (toPrice && parseInt(channel.price) > parseInt(toPrice)) {
      return false;
    }

    // Filter by subscribers
    if (
      fromSubscriber &&
      parseInt(channel.subscriber) < parseInt(fromSubscriber)
    ) {
      return false;
    }
    if (toSubscriber && parseInt(channel.subscriber) > parseInt(toSubscriber)) {
      return false;
    }

    // Filter by income
    if (fromIncome && parseInt(channel.income) < parseInt(fromIncome)) {
      return false;
    }
    if (toIncome && parseInt(channel.income) > parseInt(toIncome)) {
      return false;
    }

    return true;
  });

  return (
    <MainLayout>
      <div className="overflow-x-hidden">
        {/* Filterations */}
        <div className="w-full min-h-[60vh]">
          <Filter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            name={name}
            setName={setName}
            fromPrice={fromPrice}
            setFromPrice={setFromPrice}
            toPrice={toPrice}
            setToPrice={setToPrice}
            subject={subject}
            setSubject={setSubject}
            fromSubscriber={fromSubscriber}
            setFromSubscriber={setFromSubscriber}
            toSubscriber={toSubscriber}
            setToSubscriber={setToSubscriber}
            fromIncome={fromIncome}
            setFromIncome={setFromIncome}
            toIncome={toIncome}
            setToIncome={setToIncome}
            getChannels={getChannels}
          />
        </div>

        {/* Channel Data */}
        {loading ? (
          <Loader />
        ) : (
          <section>
            <Channels
              channelsData={filteredChannels ? filteredChannels : channelsData}
            />
          </section>
        )}
      </div>
    </MainLayout>
  );
}
