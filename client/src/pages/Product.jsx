import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Data from "../assets/dummyData";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import graph2 from "../assets/images/graph2.png";
import amazon from "../assets/images/amazon.png";
import flipkart from "../assets/images/flipkart.png";
import myntra from "../assets/images/myntra.png";

const Product = () => {
  const [product, setProduct] = useState(null);
  let { productId } = useParams();

  useEffect(() => {
    const item = Data.productItems.find((p) => p.id === parseInt(productId));
    if (item) setProduct(item);
  }, []);

  return (
    <>
      <div
        style={{
          marginLeft: "20px",
          marginTop: "1rem",
        }}
      >
       
      </div>
      {product ? (
        <>
          <div className="p-page">
          <div
          className="p-id1"
        >
          <img className="p-img"
            src={product.cover}
            alt={product.id}
          ></img>
        </div>
            <div
              className="p-id2"
            >
               <div >
               <p style={{ width: "250px", fontSize: "x-large",textAlign:"left" }}>
               {product.name}
             </p>
             <p style={{textAlign:"left"}}>Today: ₹ {product.price} </p>
             <p style={{textAlign:"left"}}>({product.discount}% off)</p>
             <p style={{ fontSize: "x-small",textAlign:"left" }}>
               Price inclusive of all taxes
             </p>
               </div>
             
              <div style={{display:"flex" ,width:"100%",justifyContent:"center",marginTop:"2rem"}}>
                <Button
                className="p-Btn p-Btn-1"
                  // sx={{
                  //   marginTop: 3,
                  //   width: "30%",
                  //   height: "40px",
                  //   
                  // }}
                  style={{
                  //   borderRadius: 3,
                    backgroundColor: "black",
                  //   padding: "10px 10px",
                  //   fontSize: "15px",
                    color: "white",
                    marginRight:"1rem"
                  }}
                  variant="contained"
                  type="submit"
                >
                  SHOP
                </Button>
                <Button
                className="p-Btn p-Btn-2"
                  // sx={{
                  //   marginTop: 3,
                  //   width: "30%",
                  //   height: "40px",
                  // }}
                  style={{
                  //   borderRadius: 3,
                    backgroundColor: "white",
                  //   padding: "10px 10px",
                  //   fontSize: "15px",
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
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <h1 style={{ margin: "2rem" }}>Price Statistics</h1>
            <img src={graph2} style={{ height: "50%", width: "80%" }}></img>
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" ,marginBottom:"1rem",padding:"2rem"}}>
            <h1 style={{ marginBottom: "1rem" }}>Price Comparison</h1>

            <table style={{ margin: "auto", width: "50%" ,borderCollapse:"collapse" }}>
              <tr style={{borderBottom: "1px solid black"}}>
                <td>
                  <img
                    src={amazon}
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                </td>
                <td>₹ {product.price}</td>
                <td>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Go to Amazon
                  </Button>
                </td>
              </tr>
              <tr style={{borderBottom: "1px solid black"}}>
                <td>
                  <img
                    src={flipkart}
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                </td>
                <td>₹ {product.price}</td>
                <td>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Go to Flipkart
                  </Button>
                </td>
              </tr>
              <tr style={{borderBottom: "1px solid black"}}>
                <td>
                  <img
                    src={myntra}
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                </td>
                <td>₹ {product.price}</td>
                <td>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Go to Myntra
                  </Button>
                </td>
              </tr>
            </table>
          </div>
        </>
      ) : (
        <div>Not Found product</div>
      )}
    </>
  );
};

export default Product;
