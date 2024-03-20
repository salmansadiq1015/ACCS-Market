import Lottie from "react-lottie";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import animationData from "../../assets/107043-success.json";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const { paymentDetails, setPaymentDetails } = useAuth();

  const storeOrder = async () => {
    if (!paymentDetails) {
      return;
    }

    try {
      // Show loading state while waiting for the response
      toast.loading("Storing order...");

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/orders/create/order`,
        {
          buyerEmail: paymentDetails.metaData.buyerEmail,
          channelId: paymentDetails.metaData.channelId,
          channelLink: paymentDetails.metaData.channelLink,
          channelName: paymentDetails.metaData.channelName,
          price: paymentDetails.metaData.price,
          sellerEmail: paymentDetails.metaData.sellerEmail,
          sellerId: paymentDetails.metaData.sellerId,
          sellerName: paymentDetails.metaData.sellerName,
          paymentId: paymentDetails.paymentId,
        }
      );

      if (data.success) {
        localStorage.removeItem("metaData");
        setPaymentDetails([]);
        toast.success("Your payment is successful!");
      }
    } catch (error) {
      console.error("Error storing order:", error);
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    storeOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentDetails]);

  // ------------------------->
  const navigate = useNavigate();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full min-h-[90vh]">
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-8 text-[25px] text-gray-900">
        Your payment is successful 😍
      </h5>
      <div className="flex items-center justify-center w-full ">
        <button
          className="text-[16px] border-2 flex w-[14rem] items-center justify-center gap-1 bg-fuchsia-500 hover:bg-fuchsia-600 cursor-pointer transition-all duration-150 text-white rounded-3xl py-2 px-5 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
          onClick={() => {
            storeOrder();
            navigate("/");
          }}
        >
          <MdKeyboardBackspace className="h-5 w-5 text-white" />
          Back to Home
        </button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
