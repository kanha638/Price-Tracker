import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Me } from "./middleware/auth";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const CallMeRoute = async () => {
    await Me(dispatch);
  };
  useEffect(() => {
    CallMeRoute();
  }, []);

  return <div>Hello from frontene</div>;
}

export default App;
