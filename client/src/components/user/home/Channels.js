import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { FiCheck } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import Empty from "../../../utils/Empty";
import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PaymentModel from "../../../utils/PaymentModel";

export default function Channels({ channelsData }) {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 20;
  const pagesVisited = pageNumber * itemsPerPage;
  const [channelData, setChannelData] = useState([]);

  const pageCount = Math.ceil(channelsData?.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="relative w-full min-h-screen py-8 px-3 sm:px-6">
      {channelsData?.length === 0 ? (
        <div className="">
          <Empty messsage={"Channels not found. Create your first channel"} />
        </div>
      ) : (
        <>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {channelsData &&
              channelsData
                .slice(pagesVisited, pagesVisited + itemsPerPage)
                .map((c, i) => (
                  <div
                    className="rounded-md relative card border border-gray-300 filter drop-shadow hover:drop-shadow-lg transition-all duration-150 cursor-pointer shadow-md hover:shadow-xl overflow-hidden "
                    key={c?._id}
                    data-aos="fade-down-right"
                  >
                    <div className="show absolute top-0 left-0 w-full  py-[5rem] flex items-center justify-center ">
                      <span
                        className="bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-150 py-2 px-4 rounded-3xl shadow-md border"
                        onClick={() => navigate(`/channel-details/${c?._id}`)}
                      >
                        Show details
                      </span>
                    </div>

                    <span
                      className="absolute h-[2rem] flex items-center justify-center top-[10.5rem] right-2 text-[13px] bg-green-500 text-white transition-all duration-150 px-4 rounded-3xl shadow-md"
                      onClick={() => navigate(`/channel-details/${c._id}`)}
                    >
                      {c?.status === "Processing" ? (
                        <span className="flex items-center gap-1 text-white">
                          <FaCog className="h-4 w-4 text-white" />
                          {c?.status}
                        </span>
                      ) : c?.status === "Verify" ? (
                        <span className="flex items-center gap-1 text-white">
                          <FiCheck className="h-4 w-4 text-white" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-white">
                          <FaTimesCircle className="h-4 w-4 text-white" />
                          Not Varify
                        </span>
                      )}
                    </span>
                    <img
                      src={c?.logo}
                      alt="Logo"
                      className="w-full h-[13rem]"
                    />

                    <div className="flex flex-col gap-4 py-4 sm:px-2 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={c?.logo}
                          alt="Logo"
                          className="w-[2.5rem] h-[2.5rem] rounded-full border border-green-500 shadow-md object-fill"
                        />
                        <h3 className="text-xl font-semibold text-gray-90 text-center">
                          {c?.name}
                        </h3>
                      </div>
                      <div className=" flex items-center gap-3 justify-between">
                        <span className="text-center text-[15px] font-[400] text-zinc-600">
                          {c?.category}
                        </span>
                        <span className="text-center text-[15px] font-[400] text-zinc-600">
                          {c?.subject}
                        </span>
                      </div>
                      <span className="text-center text-xl font-[400] text-gray-800">
                        Price: $ {c?.price}
                      </span>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-center text-xl font-[400] text-gray-800">
                          {c?.subscriber}
                        </span>
                        <span className="bg-gray-600 h-[2px] w-[2rem] "></span>
                        <span className="text-center text-xl font-[400] text-gray-800">
                          Subscribers
                        </span>
                      </div>
                      {/*  */}
                      <button
                        type="button "
                        className={`btn flex items-center justify-center gap-1 `}
                        onClick={() => {
                          setChannelData(c);
                          setIsOpen(true);
                        }}
                      >
                        Buy this Channel
                      </button>
                    </div>
                  </div>
                ))}
          </div>
          {channelsData.length > 20 && (
            <div className="pagination-container mt-[3rem] py-2 w-full bg-fuchsia-600 rounded-[5rem] text-white">
              <ReactPaginate
                previousLabel={
                  <MdKeyboardArrowLeft className="p-1 rounded-full hover:bg-black/50 h-9 w-9" />
                }
                nextLabel={
                  <MdKeyboardArrowRight className="p-1 rounded-full hover:bg-black/50 h-9 w-9" />
                }
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                pageClassName={"pagination__page"}
                className="flex items-center justify-center gap-4 font-medium text-[17px] text-white"
              />
            </div>
          )}
        </>
      )}

      {/* Payment Model */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <PaymentModel setIsOpen={setIsOpen} channelData={channelData} />
        </div>
      )}
    </div>
  );
}
