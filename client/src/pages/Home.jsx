
import React from "react";

import SideBar from "../components/SideBar";

import UserProfile2 from "../components/UserProfile2";
import {Route, Routes } from "react-router-dom";
import Catalog from "../components/Catalog";
import Error from "../components/Error";
import { UserState } from "../slices/userSlice";
import { useSelector } from "react-redux";
import SignIn from "../components/SignIn";

const Home = () => {
  const userState = useSelector(UserState);
  return (
    <div>
      <SideBar />

      <Routes>
        <Route path="" element={<Catalog />} />
        <Route
          path="profile"
          element={
            userState?.isLoggedIn === true ? <UserProfile2 /> : <SignIn />
          }
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
};

export default Home;
