import React from "react";
import CorouselCard from "./CorouselCard";

const Corousel = ({ productItems, Title, number_of_slides = 4 }) => {
  return (
    <>
      <section style={{ background: "#f6f9fc", padding: " 50px 0" }}>
        <div className="container">
          <div className="heading f_flex">
            <i className="fa fa-bolt"></i>
            <h1>{Title}</h1>
          </div>

          <CorouselCard
            productItems={productItems}
            number_of_slides={number_of_slides}
          />
        </div>
      </section>
    </>
  );
};

export default Corousel;