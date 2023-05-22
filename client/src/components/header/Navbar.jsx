import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useSelector } from "react-redux";
import { UserState } from "../../slices/userSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = ["HealthCare", "Sports", "Personal Hygene", "Sex", "Clothes"];

const Navbar = () => {
  // Toogle Menu
  const theme = useTheme();
  const [MobileMenu, setMobileMenu] = useState(false);
  const [personName, setPersonName] = useState([]);

  const userState = useSelector(UserState);

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="catgrories d_flex">
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              placeholder="Categories"
              sx={{
                width: 250,
              }}
              input={<OutlinedInput label="Category" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to="/">home</Link>
              </li>
              {userState?.isLoggedIn === true ? (
                <>
                  {" "}
                  <li>
                    <Link to="/subscribed/my">My Subscribed</Link>
                  </li>
                  <li>
                    <Link to="/products/my">My Products</Link>
                  </li>
                  <li>
                    <Link to="/settings/notification">
                      Notifications & alert
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">Profile</Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li>
                    <Link to="/sign-in">Login</Link>
                  </li>
                  <li>
                    <Link to="/sign-up">Signup</Link>
                  </li>
                </>
              )}
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
