import React from "react";
import AllProducts from "./components/AllProducts";
import IntroCard from "./components/IntroCard";
import ProductCount from "./components/ProductCount";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div>
      <SideBar />
      <div style={{ marginLeft: "220px" }}>
        <IntroCard />
        <div style={{ marginTop: "10px" }}>
          <ProductCount />
        </div>
        <AllProducts />
      </div>
    </div>
  );
}

export default App;
