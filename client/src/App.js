import React from "react";
import AllProducts from "./components/AllProducts";
import IntroCard from "./components/IntroCard";
import { Container } from "@mui/system";
import ProductCount from "./components/ProductCount";
import SideBar from "./components/SideBar";
import "./styles/style.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EnterEmail from "./components/EnterEmail";
import UserProfile from "./components/UserProfile";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="/*" element={<Home />} />
        </Routes>
        {/* <Home /> */}
      </Router>
    </div>
  );
}

export default App;
