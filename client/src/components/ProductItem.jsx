import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const ProductItem = (props) => {
  const { product } = props;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xl: 700,
      lg: 700,
      md: 500,
      sm: 500,
      xs: 400,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    // borderRadius: "10px",
  };

  const [imageOpen, setImageOpen] = React.useState(false);
  const handleImageOpen = () => setImageOpen(true);
  const handleImageClose = () => setImageOpen(false);

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
        src={product?.img_urn}
        alt={product?.product_title}
        onClick={() => handleImageOpen()}
      />
      <div style={{ flex: "3" }}>
        <a style={{ color: "#0C0B0B" }} href="#">
          <a
            href={product?.product_link}
            style={{
              padding: "0",
              margin: "0",
              textDecoration: "underline",
              fontWeight: "bolder",
            }}
          >
            {product?.product_title}
          </a>
        </a>
        <p style={{ padding: "0", margin: "0", color: "grey" }}>
          On {product.website}
        </p>
      </div>
      <div style={{ flex: "1" }}>{`${product?.current_price}₹`}</div>
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
        }}
      >
        {product?.rating} <StarHalfIcon sx={{ fontSize: "15px" }} />
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

      <Modal
        open={imageOpen}
        onClose={handleImageClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={product?.img_urn}></img>
        </Box>
      </Modal>
    </Stack>
  );
};

export default ProductItem;
