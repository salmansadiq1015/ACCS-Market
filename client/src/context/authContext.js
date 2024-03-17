import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [token, setToken] = useState("");
  const [active, setActive] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);

  // check token
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth((prevAuth) => ({
        ...prevAuth,
        user: parseData?.user,
        token: parseData?.token,
      }));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    if (favorite) {
      setFavorite(favorite);
    }
  }, []);

  useEffect(() => {
    const metadata = JSON.parse(localStorage.getItem("metaData")) || [];
    if (metadata) {
      setPaymentDetails(metadata);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        token,
        setToken,
        active,
        setActive,
        favorite,
        setFavorite,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        onlineUsers,
        setOnlineUsers,
        paymentDetails,
        setPaymentDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
