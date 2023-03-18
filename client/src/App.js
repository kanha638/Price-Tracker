import React, { useEffect } from "react";
import "./styles/style.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import { Me } from "./middleware/auth";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { globalTheme } from "../src/utils/themes";

function App() {
  const dispatch = useDispatch();
  const CallMeRoute = async () => {
    await Me(dispatch);
  };
  useEffect(() => {
    CallMeRoute();
  }, []);

  return (
    <div>
      <ThemeProvider theme={globalTheme}>
        <Router>
          <Routes>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
