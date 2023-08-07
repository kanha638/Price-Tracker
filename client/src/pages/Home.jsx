import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "../components/Error404";
import Header from "../components/header/Header";

import LandingPage from "../components/LandingPage/LandingPage";
import MyProducts from "../components/myproducts/MyProducts";
import SubscribedProducts from "../components/subscribedProducts/SubscribedProducts";
import Notification from "./Notification";
const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="subscribed/my" element={<SubscribedProducts />} />
        <Route path="products/my" element={<MyProducts />} />
        <Route
          path="settings/notification"
          element={<Notification/>}
        />
        <Route path="profile" element={<>Profile page</>} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Home;
