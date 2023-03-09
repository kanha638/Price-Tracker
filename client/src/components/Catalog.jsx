import { Box, Container } from "@mui/system";
import React from "react";
import AllProducts from "./AllProducts";
import IntroCard from "./IntroCard";

const Catalog = () => {
  return (
    <Box
      sx={{
        marginLeft: {
          xl: "100px",
          lg: "100px",
          md: "100px",
          sm: "0px",
          xs: "0px",
        },
      }}
    >
      <Container
        maxWidth="md"
        style={{
          marginLeft: "0px",
          // padding: "0",
          marginTop: "10px",
          height: "95vh",
          // border: "solid 2px black",
          display: "flex",
          flexDirection: "column",
          // paddingRight: "0px",
          justifyContent: "space-between",
          gap: "10px",
          padding: "0px 0px",
        }}
      >
        <IntroCard />
        <AllProducts />
      </Container>
      {/* <ProductCount /> */}
    </Box>
  );
};

export default Catalog;
