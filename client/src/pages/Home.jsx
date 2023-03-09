import { Container } from "@mui/system";
import React from "react";
import AllProducts from "../components/AllProducts";
import IntroCard from "../components/IntroCard";
import SideBar from "../components/SideBar";
import UserProfile from "../components/UserProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from "../components/Catalog";
import Error from "../components/Error";

const Home = () => {
  return (
    <div>
      <SideBar />

      {/* <UserProfile /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <EnterEmail /> */}
      {/* <SideBar /> */}
      <Routes>
        <Route path="" element={<Catalog />} />
        <Route path="profile" element={<UserProfile />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
};

export default Home;
