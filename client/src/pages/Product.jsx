import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Data from "../assets/dummyData";

import { Button } from "@mui/material";
import graph2 from "../assets/images/graph2.png";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { getProductByID } from "../middleware/product";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const getPFromID = async () => {
      await getProductByID(productId,setProduct,dispatch)
    }
    getPFromID()
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
                    src={product?.img_urn}
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
                        {product?.product_title}
                      </p>
                      <p  className="p-price" >
                        Today: ₹ {product.current_price}{" "}
                      </p>
                      <p  className="p-discount" >
                        ({product.discount}% off)
                      </p>
                      <p  className="p-tag" >
                        Price inclusive of all taxes
                      </p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                     
                     <Link href={product?.product_link}>
                      <Button
                      className="p-btn"
                        sx={{
                          marginTop: 3,
                          width: "",
                          height: "40px",
                          backgroundColor: "black",
                          color: "white",
                          // marginRight: "1rem",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        SHOP
                        </Button>
                        </Link>
                      <Button
                      className="p-btn"
                        sx={{
                          marginTop: 3,
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
