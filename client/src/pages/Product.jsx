import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Data from "../assets/dummyData";

import { Button } from "@mui/material";
import graph2 from "../assets/images/graph2.png";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Product = () => {
  const [product, setProduct] = useState(null);
  let { productId } = useParams();

  useEffect(() => {
    const item = Data.productItems.find((p) => p.id === parseInt(productId));
    if (item) setProduct(item);
  }, []);

  return (
    <>
      {product ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ display: "flex" ,flexDirection:{xs:"column",sm:"column",md:"row",lg:"row"}}}>
              <Grid item sx={{ flex:{xs:"100%",sm:"100%",md:"50%",lg:"50%"} }}>
                <div style={{textAlign:"center",paddingTop:"3rem"}}>
                  <img
                    className="p-img"
                    src={product.cover}
                    alt={product.id}
                  ></img>
                </div>
              </Grid>
              <Grid item sx={{ flex:{xs:"100%",sm:"100%",md:"50%",lg:"50%"} }}>
                <div className="grid-2">
                  <div >
                    <div style={{ width: "50%",margin:"auto"}} >
                      <p
                      className="p-name"
                      >
                        {product.name}
                      </p>
                      <p  className="p-price" >
                        Today: ₹ {product.price}{" "}
                      </p>
                      <p  className="p-discount" >
                        ({product.discount}% off)
                      </p>
                      <p  className="p-tag" >
                        Price inclusive of all taxes
                      </p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                      <Button
                      className="p-btn"
                        sx={{
                          marginTop: 3,
                          width: "21%",
                          height: "20%",
                          backgroundColor: "black",
                          color: "white",
                          marginRight: "1rem",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        SHOP
                      </Button>
                      <Button
                      className="p-btn"
                        sx={{
                          marginTop: 3,
                        //   width: "30%",
                        //   height: "40px",
                          backgroundColor: "white",
                          color: "black"
                        }}
                        variant="contained"
                        type="submit"
                      >
                        <i
                          className={"fa-regular fa-heart"}
                          style={{ marginRight: "4px" }}
                        ></i>
                        SAVE TO WISHLIST
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <h1 style={{ margin: "2rem" }}>Price Statistics</h1>
            <img src={graph2} style={{ height: "50%", width: "80%" }}></img>
          </div>
        </>
      ) : (
        <div>Not Found product</div>
      )}
    </>
  );
};

export default Product;
