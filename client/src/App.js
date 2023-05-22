import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Me } from "./middleware/auth";
import { useDispatch } from "react-redux";
import Header from "./components/header/Header";
import "./styles/style.css";
import Footer from "./components/footer/Footer";
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
        <Header />
        <Routes>
          <Route path="/" element={<>Hello Kt</>} />
          <Route path="/sign-in" element={<h1>Login page</h1>} />
          <Route path="/sign-up" element={<h1>Sign up page</h1>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
