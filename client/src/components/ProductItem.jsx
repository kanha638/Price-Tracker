import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const ProductItem = (props) => {
  const { product } = props;
  const { id, name, website, currentPrice, rating, img } = product;
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        padding: "15px 10px",
        backgroundColor: "#F5F5F7",
        alignItems: "center",
        borderRadius: "14px",
        justifyContent: "space-between",
        cursor: "pointer",
        flexWrap: "wrap",
      }}
    >
      <img
        style={{ height: "64px", width: "64px", flex: "1" }}
        src="data:image/jpeg;base64,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"
        alt={name}
      />
      <div style={{ flex: "3" }}>
        <a style={{ color: "#0C0B0B" }} href="#">
          <h4 style={{ padding: "0", margin: "0" }}>{name}</h4>
        </a>
        <p style={{ padding: "0", margin: "0", color: "grey" }}>On {website}</p>
      </div>
      <div style={{ flex: "1" }}>{`${currentPrice}???`}</div>
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
        }}
      >
        {rating} <StarHalfIcon sx={{ fontSize: "15px" }} />
      </div>
      <Button
        sx={{
          flex: "1",
          border: "1px solid #0C0B0B",
          color: "#0C0B0B",
          borderRadius: "8px",
        }}
        variant="outlined"
        href="#outlined-buttons"
      >
        View
      </Button>
    </Stack>
  );
};

export default ProductItem;
