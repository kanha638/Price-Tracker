import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Box
      sx={{
        borderRadius: "24px",
        padding: "25px 30px",
        display: {
          xs: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
          xl: "flex",
        },
        height: "90vh",
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
      <div style={{ flex: "1" }}>
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
        <Link style={{ color: `grey`, cursor: "pointer" }}>
          <MessageIcon />
        </Link>
        <Link to="/profile" style={{ color: `grey`, cursor: "pointer" }}>
          <PersonIcon />
        </Link>
        <Link style={{ color: `grey`, cursor: "pointer" }}>
          <SettingsIcon />
        </Link>
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "14px",
        }}
      >
        <LogoutIcon />
      </div>
    </Box>
  );
};

export default SideBar;
