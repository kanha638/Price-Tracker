import React from "react";
import logo from "../../assets/images/favicon.jpeg";
import { Link } from "react-router-dom";

const Search = () => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width">
            <img src={logo} alt="" style={{ width: 50, height: 50 }} />
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <button
              style={{
                width: "20%",
                opacity: "0.7",
                backgroundColor: "#000000",
                color: "white",
                cursor: "pointer",
                borderRadius: "0px 10px 10px 0px",
              }}
            >
              Search here
            </button>
          </div>

          <div className="icon f_flex width">
            <i
              className="fa fa-user icon-circle"
              style={{ cursor: "pointer" }}
            ></i>
            <div className="notification">
              <Link to="/notification">
                <i className="fa fa-bell icon-circle"></i>
                <span>2</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
