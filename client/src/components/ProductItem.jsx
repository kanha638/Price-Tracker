import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const ProductItem = (props) => {
  const { product } = props;
  const {
    id,
    product_title,
    current_price,
    product_link,
    mrp,
    availabe,
    rating,
    rating_count,
    currecy_type,
    img_urn,
    website,
  } = product;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
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
          style={{ maxHeight: "100px", maxWidth: "100px", flex: "1" }}
          src={img_urn}
          alt={product_title}
          onClick={() => setOpen(true)}
          // onMouseEnter={() => setOpen(true)}
          // onMouseLeave={() => setOpen(false)}
        />
        <div style={{ flex: "3" }}>
          <a style={{ color: "#0C0B0B" }} href={product_link}>
            {" "}
            <h4 style={{ padding: "0", margin: "0" }}>{product_title}</h4>
          </a>
          <p style={{ padding: "0", margin: "0", color: "grey" }}>
            On {website}
          </p>
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",

            fontWeight: "bold",
          }}
        >{`${current_price}₹`}</div>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            // border: "2px solid #000",
            boxShadow: 24,
            padding: "30px",
            // p: 4,
          }}
        >
          <img src={img_urn}></img>
        </Box>
      </Modal>
    </>
  );
};

export default ProductItem;
