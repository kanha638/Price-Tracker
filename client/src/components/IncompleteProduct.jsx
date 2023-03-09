import React from "react";
import { useState, useEffect } from "react";
import { getFakeProducts } from "../fakeProducts";
import ProductItem from "./ProductItem";
import Stack from "@mui/material/Stack";

export default function  IncompleteProducts() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const obj = getFakeProducts();
      setProducts(obj);
    }, [products]);
    return (
      <div style={{ }}>
        <Stack spacing={2}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </div>
    );
  };