import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import { Box, Container } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../middleware/auth";
import { useDispatch, useSelector } from "react-redux";
import Man from "../images/man.jpg";
import { selectUser, UserState } from "../slices/userSlice";
import { Avatar } from "@mui/material";
import { getProfilePicImageURL } from "../utils/utilities";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(UserState);
  const user = useSelector(selectUser);
  const signOutHandler = async () => {
    await signOut(dispatch, navigate);
  };
  return (
    <Box
      sx={{
        borderRadius: "20px",
        marginLeft: "5px",
        padding: "25px 30px",
        display: {
          xs: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
          xl: "flex",
        },
        height: "95vh",
        top: "10px",
        border: "1px solid black",
        position: "absolute",
        background: "#0C0B0B",
        color: "white",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1", fontSize: "30px" }}>
        <h1>PT</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "2",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ color: `grey`, cursor: "pointer" }}>
          <HomeIcon />
        </Link>
        <Link
          style={{
            color: `grey`,
            cursor: "pointer",
            display: `${userState?.isLoggedIn ? "" : "none"}`,
          }}
        >
          <MessageIcon />
        </Link>
        <Link
          to="/profile"
          style={{
            color: `grey`,
            cursor: "pointer",
            display: `${userState?.isLoggedIn ? "" : "none"}`,
          }}
        >
          <PersonIcon />
        </Link>
        <Link
          style={{
            color: `grey`,
            cursor: "pointer",
            display: `${userState?.isLoggedIn ? "" : "none"}`,
          }}
        >
          <SettingsIcon />
        </Link>
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "50px",
          alignItems: "center",
          borderRadius: "14px",
        }}
      >
        <Link to="/profile">
          <Avatar
            src={
              user?.profile_pic ? getProfilePicImageURL(user?.profile_pic) : Man
            }
            sx={{
              border: "solid 1px white",
              cursor: "pointer",
            }}
          />
        </Link>
        <LogoutIcon
          onClick={() => {
            signOutHandler();
          }}
          sx={{
            cursor: "pointer",
            display: `${userState?.isLoggedIn ? "" : "none"}`,
          }}
        />
      </div>
    </Box>
  );
};

export default SideBar;
