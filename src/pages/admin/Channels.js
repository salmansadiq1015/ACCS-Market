import React, { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { format } from "date-fns";
import Loader from "../../utils/Loader";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Channels() {
  const [channelData, setChannelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get All Channels Data
  const getChannels = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/channel/get-channels`
      );
      setChannelData(data?.channels || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching channels:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/channel/delete/channels/${id}`
      );
      if (data) {
        getChannels();
        toast.success(data?.message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  // Display Data

  const columns = [
    { field: "id", headerName: "Channel ID", flex: 0.2 },
    {
      field: "avatar",
      headerName: "Channel Logo",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params?.row.avatar ? params?.row.avatar : "/profile.jpeg"}
              layout="fill"
              objectFit="contain"
              className="w-[2.5rem] h-[2.5rem] rounded-full border border-gray-400 shadow-md shadow-gray-300"
              alt="Icon"
            />
          </>
        );
      },
    },
    { field: "channelName", headerName: "Channel Name", flex: 0.4 },
    { field: "sellerName", headerName: "Seller Name", flex: 0.4 },
    {
      field: "price",
      headerName: "Price",
      flex: 0.3,
      renderCell: (params) => (
        <div style={{ whiteSpace: "nowrap" }}>$ {params.value}</div>
      ),
    },
    { field: "channelLink", headerName: "Channel Link", flex: 0.3 },
    { field: "sellerId", headerName: "Seller Id", flex: 0.2 },
    { field: "created_at", headerName: "Created_At", flex: 0.2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      renderCell: (params) => (
        <div className=" flex items-center gap-3">
          <button
            onClick={() => navigate(`/admin/Update/Channel/${params.row.id}`)}
          >
            <MdOutlineModeEditOutline className="w-5 h-5 text-fuchsia-500 hover:text-fuchsia-600 hover:scale-[1.05] active:scale-[1] cursor-pointer" />
          </button>
          <button onClick={() => handleDelete(params.row.id)}>
            <MdOutlineDeleteOutline className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer hover:scale-[1.05] active:scale-[1]" />
          </button>
        </div>
      ),
    },
  ];

  const rows = [];

  if (channelData && Array.isArray(channelData)) {
    channelData.forEach((chan, i) => {
      if (chan) {
        const formattedDate = format(new Date(chan?.createdAt), "dd-MM-yyyy");
        const empObject = {
          id: chan?._id,
          avatar: chan?.logo,
          channelName: chan?.name,
          sellerName: chan?.userName,
          price: chan?.price,
          channelLink: chan?.channelLink,
          sellerId: chan?.userId,
          created_at: formattedDate,
        };

        rows.push(empObject);
      }
    });
  }

  return (
    <Layout>
      <div className=" w-full h-[85vh] sm:h-[88.5vh] overflow-y-auto  pb-[3rem] px-4 mt-3">
        <h1 className="text-3xl sm:text-4xl font-bold  ">All Channels</h1>

        <div className="w-full h-full overflow-x-auto ">
          {/* Employee Data */}
          {loading ? (
            <div className="">
              <Loader />
            </div>
          ) : (
            <div className="w-full pb-[1rem] min-w-[700px] ">
              <Box
                m="40px 0 0 0"
                height="68vh"
                width="98%"
                boxShadow=".3rem .3rem .4rem rgba(0,0,0,.3)"
                filter="drop-shadow(0rem 0rem .6rem .1rem rgb(0, 149, 255))"
                overflow={"auto"}
                sx={{
                  "& .MuiDataGrid-root": {
                    border: `2px solid #555`,
                    outline: "none",
                  },
                  "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                    color: "#fff",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    color: "#000",
                  },
                  "& .MuiDataGrid-row": {
                    color: "#000",
                    borderBottom: `2px solid #000`,
                  },
                  "& .MuiTablePagination-root": {
                    color: "#000",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: "#000",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgb(0, 207, 138)",
                    color: "#",
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#fff",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "rgb(0, 207, 138)",
                    color: "#000",
                    borderBottom: "none",
                  },
                  "& .MuiCheckbox-root": {
                    color: "#000",
                  },
                  "& .MuiCheckbox-root:nth-child(1)": {
                    color: "#000",
                  },
                  "& .MuiDataGrid--toolbarContainer .MuiButton-text": {
                    color: `#fff !important`,
                  },
                }}
              >
                <DataGrid
                  class="light:text-black dark:text-white "
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 6 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20, 50]}
                  checkboxSelection
                />
              </Box>
              {/* Mobile Format */}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
