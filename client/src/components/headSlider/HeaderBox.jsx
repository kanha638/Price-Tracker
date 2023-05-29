import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import logo_pt from "../../assets/images/favicon.jpeg";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { removeAddProductStatus, UserState } from "../../slices/userSlice";
import { signIn } from "../../middleware/auth";
import { AddProduct } from "../../middleware/product";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

export const HeaderBox = ({ img }) => {
  const [errorAlertopen, setErrorAlertopen] = useState(true);
  const [successAlertopen, setSuccessAlertopen] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState({
    credential: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    credential: false,
    password: false,
  });

  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function changeHandler(e) {
    console.log(e.target.name);
    if (e.target.name === "credential") {
      setErrors({ ...errors, credential: false });
    }
    if (e.target.name === "password") {
      setErrors({ ...errors, password: false });
    }

    setDetails({ ...details, [e.target.name]: e.target.value });
    console.log(details);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (details.credential === "" && details.password === "") {
      setErrors({ credential: true, password: true });
      return;
    }
    if (details.credential === "") setErrors({ ...errors, credential: true });
    if (details.password === "") setErrors({ ...errors, password: true });
    await signIn(details, dispatch, navigate, handleClose);
  };

  const [productLink, setProductLink] = useState("");
  const [productInputError, setProductInputError] = useState(false);

  const addProduct = async () => {
    if (userState?.isLoggedIn === false) {
      setOpen(true);
      return;
    } else {
      if (productLink === "") {
        setProductInputError(true);
        return;
      }
      await AddProduct(
        { product_url: productLink, website: "flipkart" },
        dispatch
      );
    }
  };
  return (
    <div className="box">
      {" "}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "30px",

            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            className="link-redirect"
            style={{ textDecoration: "none", color: "black" }}
          >
            {" "}
            <h1 style={{ fontWeight: "bolder", fontSize: "2.9rem" }}>
              50% Off on this product
            </h1>
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, omnis
            laboriosam provident in iusto atque, nostrum consequuntur fuga, sed
            laudantium error fugit sequi labore recusandae tempora dicta ipsa
            nesciunt rerum?
          </p>
          <div style={{ width: "100%", display: "flex" }}>
            <TextField
              sx={{
                width: "80%",
                borderRadius: "10px 0px 0px 10px",
                border: `solid 1px ${
                  productInputError === true ? "red" : "gray"
                }`,
                borderRight: "none",
                outline: "none",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px 0px 0px 10px",
                  border: "none",
                  "&.Mui-focused fieldset": {
                    border: "none",
                    borderRadius: "10px 0px 0px 10px",
                  },
                  "&.Mui-hovered fieldset": {
                    borderColor: "transparent",
                  },
                },
                "&:hover": {
                  border: `solid 1px ${
                    productInputError === true ? "red" : "gray"
                  }`,
                },
              }}
              value={productLink}
              name="product"
              placeholder="Paste product link here"
              onChange={(e) => {
                setProductLink(e.target.value);
                setProductInputError(false);
              }}
            />
            <Button
              style={{
                width: "20%",
                marginLeft: "-2px",
                border: `solid 1px ${
                  productInputError === true ? "red" : "gray"
                }`,
                padding: "5.5px",
                borderRadius: "0px 20px 20px 0px",
                cursor: "pointer",
                color: "white",
                background: "black",
                // fontSize: "20px",
                height: "100%",
              }}
              disabled={userState?.isPending === true}
              onClick={addProduct}
            >
              {userState?.isPending === true ? (
                <CircularProgress size="1.9rem" color="inherit" />
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <i className="fa-solid fa-chart-column"></i> Track
                </div>
              )}
            </Button>
          </div>
          {productInputError && (
            <p style={{ marginTop: "-25px", fontSize: "14px", color: "red" }}>
              Please enter some value
            </p>
          )}

          {userState?.addproductSuccess === true && (
            <Collapse in={successAlertopen}>
              <Alert
                severity="success"
                sx={{ width: "100%" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSuccessAlertopen(false);
                      dispatch(removeAddProductStatus());
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Success</AlertTitle>
                Product Added successfully — <strong>check it out!</strong>
              </Alert>
            </Collapse>
          )}
          {userState?.addproductError === true && (
            <Collapse in={errorAlertopen}>
              <Alert
                severity="error"
                sx={{ width: "100%" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorAlertopen(false);
                      dispatch(removeAddProductStatus());
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {userState?.addproductErrorMessage}
              </Alert>
            </Collapse>
          )}
        </div>
        <div style={{ flex: "1", maxHeight: "500px" }}>
          <Link to="/">
            <img src={img} alt="" style={{ width: "100%", height: "100%" }} />
          </Link>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submitHandler}>
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marign="auto"
            // marginTop={5}
            padding={2}
            borderRadius={2}
            sx={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "white",
              minWidth: "300px",
              maxWidth: "550px",
              width: "90%",
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{
                width: "90%",
              }}
            >
              <span
                to="/"
                className="link-redirect"
                style={{ color: "black", cursor: "pointer" }}
                onClick={handleClose}
              >
                <i
                  class="fa-solid fa-arrow-left"
                  style={{ fontSize: "25px" }}
                ></i>
              </span>
            </div>
            <Link to="/">
              <img
                alt="logo"
                src={logo_pt}
                style={{
                  height: "120px",
                  width: "120px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </Link>
            <Typography
              variant="h4"
              style={{ fontSize: "40px", marginTop: "20px" }}
              padding={0}
              textAlign="center"
            >
              Login
            </Typography>

            <TextField
              variant={"outlined"}
              margin="normal"
              placeholder="Email / mobile-number"
              type={"text"}
              autoComplete="email"
              name="credential"
              onChange={changeHandler}
              value={details.credential}
              sx={{ width: "90%" }}
              error={errors.credential}
              helperText={errors.credential && "Please enter you email/mobile."}
            />
            <TextField
              // id="outlined-password-input"
              variant={"outlined"}
              placeholder="Password"
              type={"password"}
              margin="normal"
              name="password"
              value={details.password}
              onChange={changeHandler}
              sx={{ width: "90%" }}
              error={errors.password}
              helperText={errors.password && "Please enter you password."}
            />
            <div style={{ width: "90%" }}>
              {userState?.isErrors === true && (
                <p style={{ marginTop: "30px", color: "red" }}>
                  {userState?.errorMessage?.authForms}
                </p>
              )}

              <Button
                sx={{
                  marginTop: 3,
                  width: "100%",
                  height: "50px",
                }}
                style={{
                  borderRadius: 3,
                  backgroundColor: "black",
                  padding: "10px 10px",
                  fontSize: "20px",
                }}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
              <Grid container>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "100%",
                    marginTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Don't have an account ?</p>
                  <Link to="/sign-up" className="link-redirect">
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  );
};
