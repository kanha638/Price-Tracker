import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<>Main landing page</>} />
        <Route path="subscribed/my" element={<>Subscribed products</>} />
        <Route path="products/my" element={<>My Products</>} />
        <Route
          path="settings/notification"
          element={<>Notification setting page</>}
        />
        <Route path="profile" element={<>Profile page</>} />
      </Routes>
    </>
  );
};

export default Home;
