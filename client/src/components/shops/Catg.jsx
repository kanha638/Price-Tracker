import React from "react";
import { Categories } from "../../common/data";

const Catg = () => {
  return (
    <>
      <div className="category">
        <div className="chead d_flex">
          <h1>Categories </h1>
        </div>
        {Categories.map((value, index) => {
          return (
            <div
              className="box f_flex"
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <i className={value.icon}></i>
              <span>{value.name}</span>
            </div>
          );
        })}
        <div className="box box2">
          <button>More Filters to be added</button>
        </div>
      </div>
    </>
  );
};

export default Catg;
