import React from "react";
import { Container} from "@mui/system";
import Box from "@mui/material/Box";

const ProductCount = (props) => {
  return (
    <Container
      sx={{
        padding: "20px",
        width: "100%",
        backgroundColor: "#F5F5F7",
        borderRadius: "14px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{ width: "30%", p: 2, textAlign: "center", fontSize: "1.9rem" }}
        >
          <h1>11</h1>
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            fontSize: "1.9rem",
            justifyContent: "space-between",
          }}
        >
          <b1>
            Products
            <br />
            Purchased
          </b1>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductCount;
