import React from "react";
import { Avatar } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";

const IntroCard = () => {
  return (
    <Container>
      <Container
        // maxWidth="sm"
        sx={{
          marginLeft: "0px",
          marginRight: "0px",
          width: "100%",
          backgroundColor: "#F5F5F7",
          borderRadius: "14px",
          // border: "solid 2px black",
          padding: "15px 0px",
          paddingRight: "0px",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Box sx={{ flex: "7", p: 2, textAlign: "left" }}>
            <h1>Hello There!</h1>
            <b>Its good to see you again</b>
          </Box>
          <Box
            sx={{
              flex: "3",
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
    </Container>
  );
};

export default IntroCard;
