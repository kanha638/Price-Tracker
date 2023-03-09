import React from "react";
import { useState, useEffect } from "react";
import { getFakeProducts } from "../fakeProducts";
import ProductItem from "./ProductItem";
import Stack from "@mui/material/Stack";

export default function CompletedProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const obj = getFakeProducts();
    setProducts(obj);
  }, [products]);
  return (
    <div style={{}}>
      <Stack
        spacing={2}
        sx={{
          backgroundColor: "white",
          padding: "10px",
          height: "600px",
          overflow: "scroll",
        }}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Stack>
    </div>
  );
}
