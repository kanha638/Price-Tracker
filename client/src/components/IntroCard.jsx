import React from "react";
import { Avatar } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";

const IntroCard = () => {
  return (
    <Container
      sx={{
        padding: "20px",
        maxWidth: "sx",
        backgroundColor: "#F5F5F7",
        borderRadius: "14px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "70%", p: 2, textAlign: "left" }}>
          <h1>Hello There!</h1>
          <b>Its good to see you again</b>
        </Box>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="Name"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default IntroCard;
