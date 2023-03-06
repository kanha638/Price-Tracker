import React from "react";
import AllProducts from "./components/AllProducts";
import IntroCard from "./components/IntroCard";
import { Container } from "@mui/system";
import ProductCount from "./components/ProductCount";
import SideBar from "./components/SideBar";
import "./styles/style.css";

function App() {
  return (
    <div>
      <SideBar />
      <div style={{ marginLeft: "100px" }}>
        <Container
          maxWidth="sm"
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
        {/* <ProductCount /> */}
      </div>
    </div>
  );
}

export default App;
