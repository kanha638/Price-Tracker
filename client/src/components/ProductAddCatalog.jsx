import React, { useState} from "react";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { supportedWebsites } from "../common/data";
import { AddProduct } from "../middleware/product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserState } from "../slices/userSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const ProductAddCatalog = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({
    website: "",
    product_url: "",
  });
  const userState = useSelector(UserState);

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userState?.isLoggedIn) await AddProduct(formValues, dispatch, setOpen);
    else navigate("/sign-in");
  };

  return (
    <>
      <Container
        sx={{
          padding: "20px",
          width: "100%",
          backgroundColor: "#F5F5F7",
          borderRadius: "14px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              handleOpen();
            }}
            style={{
              backgroundColor: "gray",
              color: "#000",
              borderRadius: "10px",
              padding: "15px",
              cursor: "pointer",
            }}
          >
            Add Product
          </Button>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              marginBottom: "20px",
            }}
          >
            Add New Product
          </h1>
          <form
            style={{
              m: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onSubmit={submitHandler}
          >
            <InputLabel id="demo-multiple-name-label">Website</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              required
              name="website"
              value={formValues?.website}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {supportedWebsites.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, formValues?.website, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              name="product_url"
              required
              value={formValues?.product_url}
              onChange={handleChange}
            />
            <Button
              type="submit"
              style={{
                backgroundColor: "#0C0B0B",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ProductAddCatalog;
