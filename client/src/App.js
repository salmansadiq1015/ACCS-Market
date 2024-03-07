import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Channels from "./pages/admin/Channels";
import CreateChannels from "./pages/user/CreateChannels";
import ChannelDetails from "./pages/Home/ChannelDetails";
import UserChannel from "./pages/user/UserChannel";
import FavoriteChannel from "./pages/user/FavoriteChannel";
import UpdateChannels from "./pages/user/UpdateChannel";
import Success from "./pages/user/Success";
import Error from "./pages/user/Error";
import Privacy from "./pages/user/Privacy";
import Terms from "./pages/user/Terms";
import FAQ from "./pages/user/FAQ";
import Comments from "./pages/user/Comments";
import Features from "./pages/user/Features";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-channel" element={<CreateChannels />} />
          <Route path="/channel-details/:id" element={<ChannelDetails />} />
          <Route path="/channels/:id" element={<UserChannel />} />
          <Route path="/channels/favorite" element={<FavoriteChannel />} />
          <Route path="/update/channel/:id" element={<UpdateChannels />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/term-&-services" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/Features" element={<Features />} />

          {/* Admin-Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/channels" element={<Channels />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
