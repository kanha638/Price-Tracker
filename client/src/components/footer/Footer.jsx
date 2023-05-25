import React from "react";
import "./Footer.css";
import logo from "../../assets/images/favicon.jpeg";

const Footer = () => {
  return (
    <>
      <footer>
        <div
          className="container grid2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div className="box">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 100,
                height: 100,
                border: "solid 1px white",
                margin: "10px",
              }}
            />
            <p style={{ maxWidth: 400 }}>
              We track your product so you can focus on using them .<br></br>
            </p>
            <p>For Contributing to this project</p>
            <div className="icon d_flex">
              <a
                href="http://github.com/kanha638"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="img d_flex">
                  <i class="fa-brands fa-github"></i>
                  <span>Github</span>
                </div>
              </a>
            </div>
          </div>

          <div className="box">
            <h2>About Us</h2>
            <ul>
              <li>
                <a
                  href="http://github.com/kanha638"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Kanha Tiwari
                </a>
              </li>
              <li>
                <a
                  href="http://github.com/kamalkish0r"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Kamal Kishor
                </a>
              </li>
              <li>
                <a
                  href="http://github.com/karanveer962"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Karanveer Singh
                </a>
              </li>
              <li>
                <a
                  href="http://github.com/ChahitKolte2112"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Chahit Kolte
                </a>
              </li>
              <li>
                <a
                  href="http://github.com/Hyper-ActiveX"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Jay Kumar
                </a>
              </li>
            </ul>
          </div>
          <div className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>Kanha Tiwari </li>
              <li>Email : tiwarikanha26@gmail.com</li>
              <li>Phone : +91 1123 456 780</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
