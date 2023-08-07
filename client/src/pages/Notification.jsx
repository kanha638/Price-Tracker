import React, { useEffect } from "react";
import profileimg from "../assets/images/favicon.jpeg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../middleware/notification";
import { UserState } from "../slices/userSlice";
import { Link } from "react-router-dom";

const a = [{ a: "7" }, { a: "7" }, { a: "7" }, { a: "7" }, { a: "7" }];
const Notification = () => {
  const dispatch = useDispatch()
  const userState = useSelector(UserState);
  useEffect(() => {
    const fetchNF = async () => {
      await getNotifications(dispatch);
    }
    fetchNF();
  },[])
  return (
    <>
      <Box
        sx={{
          //   border: "1px solid black",
          width: { xs: "90%", sm: "85%", md: "70%", lg: "50%" },

          margin: "auto",
          padding: "1rem",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          marginBottom: "20px",
          paddingBottom: "40px",
        }}
      >
        {userState?.notifications.map((data, idx) => {
          return (
            <>
              <Box
                key={idx}
                sx={{
                  width: "100%",
                  // height: 100,
                  marginBottom: "1rem",
                  borderRadius: "10px",
                  marginTop: "1rem",
                  padding: "15px 9px",
                  margin: "auto",
                  // backgroundColor: "#0a66c2",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    backgroundColor: "",
                  },
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{ width: 60, height: 60, marginRight: "1rem" }}
                    src={profileimg}
                    alt="not found"
                  ></img>
                  <div>
                    <p
                      style={{
                        textAlign: "justify",
                        fontSize: "13px",
                        color: "gray",
                      }}
                    >
                      {data?.text}
                    </p>
                    <Link to={`/product/${data?.product_id}`}>
                    <Button
                      variant="outlined"
                      sx={{
                        marginRight: "1rem",
                        borderWidth: "0.7px",
                        borderRadius: "10px",
                        backgroundColor: "transparent",
                        borderColor: "black",
                        color: "black",
                        fontSize: "9px",
                        margin: "3px",
                        marginLeft: "0px",
                        "&:hover": {
                          borderColor: "blue",
                          borderWidth: "0.7px",
                          color: "blue",
                        },
                      }}
                    >
                      Go to product
                    </Button>
                    </Link>
                  </div>
                </div>
              </Box>
            </>
          );
        })}
        <Button
          disabled
          sx={{
            position: "absolute",
            bottom: "0",
            fontSize: "15px",
            padding: "0px",
            left: "20px",
            border: "solid 1px gray",
            color: "black",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          {"<"}
        </Button>
        <Button
          sx={{
            position: "absolute",
            bottom: "0",
            fontSize: "15px",
            padding: "0px",
            right: "20px",
            color: "black",
            border: "solid 1px black",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          {">"}
        </Button>
      </Box>
    </>
  );
};

export default Notification;
