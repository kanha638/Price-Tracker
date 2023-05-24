import React from "react";
import HeadSliderCard from "./HeadSliderCard";

const HeadSlider = ({ productItems, Title, number_of_slides = 4 }) => {
  return (
    <>
      <section style={{ background: "#f6f9fc", padding: " 50px 0" }}>
        <div className="container">
          <HeadSliderCard />
        </div>
      </section>
    </>
  );
};

export default HeadSlider;
