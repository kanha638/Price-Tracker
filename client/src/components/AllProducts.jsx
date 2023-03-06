import React from "react";
import { useState, useEffect } from "react";
import { getFakeProducts } from "../fakeProducts";
import SearchBar from "./SearchBar";
import ProductItem from "./ProductItem";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/system";
import { Box } from "@mui/material";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const obj = getFakeProducts();
    setProducts(obj);
  }, [products]);
  return (
    <Container
      // maxWidth="sm"
      style={{ width: "100%", margin: "0px", overflow: "scroll" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>All Products</h3>
        <SearchBar type={"text"} placeholder={"Search Product"} />
      </div>

      <Stack spacing={2} sx={{ overflow: "scroll" }}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Stack>
    </Container>
  );
};

export default AllProducts;
