import { Container } from "@mui/system";
import React from "react";
import AllProducts from "../components/AllProducts";
import IntroCard from "../components/IntroCard";
import SideBar from "../components/SideBar";
import SignUp from "../components/SignUp";
import UserProfile from "../components/UserProfile";
import UserProfile2 from "../components/UserProfile2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from "../components/Catalog";
import Error from "../components/Error";
import { UserState } from "../slices/userSlice";
import {useSelector} from "react-redux"
import SignIn from "../components/SignIn";

const Home = () => {
  const userState = useSelector(UserState)
  return (
    <div>
     <SideBar/>
    
      <Routes>
        <Route path="" element={<Catalog />} />
        <Route path="profile" element={ <UserProfile2 />} ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
     
    </div>
    
  );
};

export default Home;
