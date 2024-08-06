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
import DonationDetail from "./components/Donation/DonationDetail";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import GlobalStateProvider from "./contexts/GlobalStateProvider";
import CreateCampaign from "./components/CreateCampaign/CreateCampaign";
import DonateCampaign from "./components/CreateDonation/CreateDonation";
import AppWrapper from "./components/AppWrapper";
import WithdrawCampaign from "./components/WithdrawCampaign/WithdrawCamapign";

// styles

const App = () => {
  return (
    <>
      <Router>
        <GlobalStateProvider>
          <AppWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/loginsuccess" element={<Success />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/createcampaign" element={<CreateCampaign />} />
              <Route path="/donatecampaign/:id" element={<DonateCampaign />} />
              <Route path="/campaign/:id" element={<CampaignDetail />} />
              <Route path="/withdrawcampaign/:id" element= {<WithdrawCampaign />} />
              <Route path="/donationdetail/:id" element={<DonationDetail />} />
            </Routes>
          </AppWrapper>
        </GlobalStateProvider>
      </Router>
    </>
  );
};

export default App;
