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

function App() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <EnterEmail /> */}
      <SideBar />
      <div
        style={{
          marginLeft: "90px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          overflow: "scroll",
        }}
      >
        <Container
          maxWidth="md"
          fixed
          style={{
            marginLeft: "0px",
            // padding: "0",
            marginTop: "10px",
            height: "95vh",
            // border: "solid 2px black",
            display: "flex",
            flexDirection: "column",
            // paddingRight: "0px",
            justifyContent: "space-between",
            gap: "10px",
            padding: "0px 0px",
          }}
        >
          <IntroCard />
          <AllProducts />
        </Container>
        <Container
          maxWidth="sm"
          fixed
          style={{
            marginLeft: "0px",
            // padding: "0",
            marginTop: "10px",
            height: "95vh",
            // border: "solid 2px black",
            display: "flex",
            flexDirection: "column",
            // paddingRight: "0px",
            justifyContent: "space-between",
            gap: "10px",
            padding: "0px 0px",
          }}
        >
          <ProductCount />
        </Container>
      </div>
    </div>
  );
}

export default App;
