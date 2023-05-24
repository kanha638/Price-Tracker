import React from "react";
import Corousel from "../carousel/Corousel";
import Data from "../../assets/dummyData";

const LandingPage = () => {
  return (
    <>
      <Corousel
        productItems={Data.productItems}
        Title="Recommended for you"
        number_of_slides={4}
      />
      <Corousel
        productItems={Data.productItems}
        Title="Trending"
        number_of_slides={3}
      />
      <Corousel
        productItems={Data.productItems}
        Title="Electronics"
        number_of_slides={4}
      />
      <Corousel
        productItems={Data.productItems}
        Title="Healthcare & personal"
        number_of_slides={3}
      />
    </>
  );
};

export default LandingPage;
