import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { format } from "date-fns";
import Loader from "../../utils/Loader";
import { useAuth } from "../../context/authContext";
import axios from "axios";

export default function Deals() {
  const { auth } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    if (!auth.token) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/orders/seller-orders/${auth.user.id}`
      );
      if (data) {
        setOrders(data.orders);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, [auth]);

  const columns = [
    { field: "id", headerName: "Employee ID", flex: 0.2 },
    { field: "buyerEmail", headerName: "Buyer Email", flex: 0.4 },
    { field: "channelName", headerName: "Channel Name", flex: 0.5 },
    { field: "paymentId", headerName: "Payment Id", flex: 0.3 },
    {
      field: "price",
      headerName: "Price",
      flex: 0.3,
      renderCell: (params) => (
        <div style={{ whiteSpace: "nowrap" }}>$ {params.value}</div>
      ),
    },
    { field: "channelLink", headerName: "ChannelLink", flex: 0.3 },
    { field: "created_at", headerName: "Created_At", flex: 0.3 },
  ];

  const rows = [];

  if (orders && Array.isArray(orders)) {
    orders.forEach((chan, i) => {
      if (chan) {
        const formattedDate = format(new Date(chan?.createdAt), "dd-MM-yyyy");
        const chanObject = {
          id: i + 1, // Assign a unique id based on the index
          buyerEmail: chan?.buyerEmail,
          channelName: chan?.channelName,
          paymentId: chan?.paymentId,
          price: chan?.price,
          channelLink: chan?.channelLink,
          created_at: formattedDate,
        };

        rows.push(chanObject);
      }
    });
  }

  return (
    <MainLayout>
      <h1 className="font-semibold text-2xl sm:text-3xl ml-4 mt-6 ">
        LIST OF YOUR DEALS
      </h1>
      <div className="w-full h-full overflow-x-auto ">
        {/* Employee Data */}
        {loading ? (
          <div className="">
            <Loader />
          </div>
        ) : (
          <div className="w-full pb-[1rem] min-w-[700px] px-4 ">
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
                  backgroundColor: "#7C3AED",
                  color: "#",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#fff",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#7C3AED",
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
    </MainLayout>
  );
}
