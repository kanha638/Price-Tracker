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
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const fetchData = async () => {
    let result = await fetch("http://localhost:8005/api/product/all-products", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    result = await result.json();
    console.log(result);
    setData(result);
  };
  useEffect(() => {
    const obj = getFakeProducts();
    setProducts(obj);
    fetchData();
  }, [products]);
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
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
        }}
      >
        <h3>All Products</h3>
        <SearchBar
          type={"text"}
          placeholder={"Search Product"}
          value={value}
          onChange={changeHandler}
        />
      </div>

      <Stack spacing={2} sx={{ overflow: "scroll" }}>
        {/* {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))} */}
        {data.map((value, idx) => {
          return <ProductItem key={idx} product={value} />;
        })}
        {data.map((value, idx) => {
          return <ProductItem key={idx} product={value} />;
        })}
        {data.map((value, idx) => {
          return <ProductItem key={idx} product={value} />;
        })}
      </Stack>
    </Container>
  );
};

export default AllProducts;
