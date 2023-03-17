import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { getFakeProducts } from "../fakeProducts";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Box } from "@mui/system";
import Man from "../images/man.jpg";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { selectUser, UserState } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function UserProfile2() {
  const userState = useSelector(UserState);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const obj = getFakeProducts();
    setProducts(obj);
    if (!userState?.isLoggedIn) {
      navigate("/sign-in");
    }
  }, [products]);

  const user = useSelector(selectUser);
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0C0B0B",
      },
      secondary: {
        main: "#F5F5F7",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:ml-12 lg:ml-24 md:mr-10 md:my-10">
        <div className="col-span-1 my-5 ">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              alt="Sharp"
              src={Man}
              sx={{ height: 200, width: 200, borderRadius: 100 }}
            />
          </Box>

          <Box
            paddingTop={8}
            paddingX={4}
            display="flex"
            flexDirection="column"
            overflow="hidden"
            sx={{ gap: "10px", margin: "auto", maxWidth: "350px" }}
            component="form"
            // sx={{
            //   '& > :not(style)': { m: 1, width: '25ch' },
            // }}
            noValidate
            autoComplete="off"
          >
            <TextField
              sx={{ padding: "0.7rem 0rem" }}
              id="standard-basic"
              label="Name"
              variant="standard"
              defaultValue={user?.name}
            />
            <TextField
              sx={{ padding: "0.7rem 0rem" }}
              id="standard-basic"
              label="Email"
              variant="standard"
              defaultValue={user?.email}
            />
            <TextField
              sx={{ padding: "0.7rem 0rem" }}
              id="standard-basic"
              label="Phone Number"
              variant="standard"
              defaultValue={user?.mobileNum}
            />
            <button className="w-20 border-2 bg-primary text-white p-1 rounded-xl mt-4">
              Save
            </button>
          </Box>
        </div>

        <div className="md:col-span-1 lg:col-span-2">
          <h1 className="flex text-2xl m-6 justify-center md:justify-start">
            My Products
          </h1>
          <div className="flex flex-row justify-center  md:justify-end gap-2">
            <button className="w-24 border-2 bg-primary text-white p-2 rounded-xl">
              Add Item
            </button>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Item One" />
            <Tab value="two" label="Item Two" />
            <Tab value="three" label="Item Three" />
          </Tabs>

          <div
            style={{ height: "75vh" }}
            className="container my-5 overflow-scroll mx-auto "
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 bg-secondary p-3 ">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default UserProfile2;
