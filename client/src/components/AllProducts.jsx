import React from "react";
import { useState, useEffect } from "react";
import { getFakeProducts } from "../fakeProducts";
import SearchBar from "./SearchBar";
import ProductItem from "./ProductItem";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../slices/userSlice";
import { fetchAllProducts } from "../middleware/product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const userState = useSelector(UserState);
  const getAllProducts = async () => {
    await fetchAllProducts(dispatch);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Container
      // maxWidth="sm"
      style={{
        width: "100%",
        margin: "0px",
        overflow: "scroll",
        focus: "within",
        "scroll-behavior": "smooth",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3>All Products</h3>
        <SearchBar type={"text"} placeholder={"Search Product"} />
      </div>

      <Stack spacing={2} sx={{ overflow: "scroll" }}>
        {userState?.allProducts.map((product, idx) => (
          <ProductItem key={idx} product={product} />
        ))}
      </Stack>
    </Container>
  );
};

export default AllProducts;
