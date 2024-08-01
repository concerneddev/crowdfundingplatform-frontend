import React from "react";

// routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import Login from "./components/Authentication/Login";
import Logout from "./components/Authentication/Logout";
import Success from "./components/Success";
import Register from "./components/Authentication/Register";
import MyProfile from "./components/User/MyProfile";
import CampaignDetail from "./components/Campaign/CampaignDetail/CampaignDetail";
import DonationList from "./components/Donation/DonationList";
import DonationDetail from "./components/Donation/DonationDetail";

// styles

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/loginsuccess" element={<Success />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/campaign/:id" element={<CampaignDetail />} />
          <Route path="/donationdetail/:id" element={<DonationDetail />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
