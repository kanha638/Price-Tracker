import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "../components/Error404";
import Header from "../components/header/Header";

import LandingPage from "../components/LandingPage/LandingPage";

const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="subscribed/my" element={<>Subscribed products</>} />
        <Route path="products/my" element={<>My Products</>} />
        <Route
          path="settings/notification"
          element={<>Notification setting page</>}
        />
        <Route path="profile" element={<>Profile page</>} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Home;
