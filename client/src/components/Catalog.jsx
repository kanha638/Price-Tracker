import { Box, Container } from "@mui/system";
import React from "react";
import AllProducts from "./AllProducts";
import IntroCard from "./IntroCard";
import {useSelector} from "react-redux"
import { selectUser, UserState } from "../slices/userSlice";
import ProductCount from "./ProductCount";

const Catalog = () => {
  const user = useSelector(selectUser)
  const userState = useSelector(UserState)

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
        display :"flex",
        flexWrap :"wrap"
      }}
    >
      <Container
        maxWidth="md"
        style={{
          marginLeft: "0px",
          flex:"2",
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
    <Container
      maxWidth="xs"
      style={{
        marginLeft: "0px",
        // padding: "0",
        flex:"1",
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
       <ProductCount /> 
    </Container>
    </Box>
  );
};

export default Catalog;
