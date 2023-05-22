import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Me } from "./middleware/auth";
import { useDispatch } from "react-redux";
import Header from "./components/header/Header";
import "./styles/style.css";
import Footer from "./components/footer/Footer";
import Signin from "./pages/Signin";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
function App() {
  const dispatch = useDispatch();
  const CallMeRoute = async () => {
    await Me(dispatch);
  };
  useEffect(() => {
    CallMeRoute();
  }, []);

  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
