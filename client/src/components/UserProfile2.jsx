import React from "react";

import { getFakeProducts } from "../fakeProducts";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Box } from "@mui/system";
import Man from "../images/man.jpg";
import { Avatar, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { getProfilePicImageURL } from "../utils/utilities";
import { uploadProfilePicture } from "../middleware/user";

function UserProfile2() {


  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    mobileNum: user?.mobileNum,
    currentPassword: "",
  });
  const [userImage, setUserImage] = useState(
    user?.profile_pic ? getProfilePicImageURL(user?.profile_pic) : Man
  );
  const [file, setFile] = useState(null);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const obj = getFakeProducts();
    setProducts(obj);
  }, [products]);

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const changeHandlerFile = (e) => {
    setFile(e.target.files[0]);
    setUserImage(URL.createObjectURL(e.target.files[0]));
  };

  const saveImageHandler = async () => {
    await uploadProfilePicture(file, dispatch, setFile, user?.id);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:ml-12 lg:ml-24 md:mr-10 md:my-10">
      <div className="col-span-1 my-5 ">
        <Box display="flex" flexDirection="column" alignItems="center">
          <label htmlFor="profilePicture">
            <Avatar
              alt="Sharp"
              src={userImage}
              sx={{
                height: 200,
                width: 200,
                borderRadius: 100,
                cursor: "pointer",
              }}
            />
          </label>
          {file && (
            <Button
              sx={{
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
                color: "green",
                "&:hover": {
                  color: "purple",
                },
              }}
              onClick={() => saveImageHandler()}
            >
              Save image
            </Button>
          )}
        </Box>
        <input
          type="file"
          id="profilePicture"
          accept="image/png, image/gif, image/jpeg"
          onChange={changeHandlerFile}
          style={{ display: "none" }}
        ></input>

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
            name="name"
            required
            type="text"
            variant="standard"
            defaultValue={userData?.name}
          />
          <TextField
            sx={{ padding: "0.7rem 0rem" }}
            id="standard-basic"
            label="Email"
            type="email"
            required
            name="email"
            variant="standard"
            defaultValue={userData?.email}
          />
          <TextField
            sx={{ padding: "0.7rem 0rem" }}
            id="standard-basic"
            label="Phone Number"
            name="mobileNum"
            required
            variant="standard"
            defaultValue={userData?.mobileNum}
          />
          <TextField
            sx={{ padding: "0.7rem 0rem" }}
            id="standard-basic"
            label="Current Password"
            required
            name="currentPassword"
            variant="standard"
            defaultValue={userData?.currentPassword}
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
  );
}

export default UserProfile2;
