import { React, useState } from "react";
import logo from "../../assets/images/favicon.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, UserState } from "../../slices/userSlice";
import { getProfilePicImageURL } from "../../utils/utilities";
import { Button, Modal, TextField, Box, Typography, Grid } from "@mui/material";
import { designVar } from "../../common/data";
import profileimg from "../../assets/images/profileimg.avif";
const Search = () => {
    // fixed Header
    window.addEventListener("scroll", function () {
        const search = document.querySelector(".search");
        search.classList.toggle("active", window.scrollY > 100);
    });

    const user = useSelector(selectUser);
    const userState = useSelector(UserState);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <section className="search">
                <div className="container c_flex">
                    <div className="logo width">
                        <Link to="/">
                            <img
                                src={logo}
                                alt=""
                                style={{ width: 50, height: 50 }}
                            />
                        </Link>
                    </div>

                    <div className="search-box f_flex">
                        <i className="fa fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search and hit enter..."
                        />
                        <button
                            style={{
                                width: "20%",
                                opacity: "0.7",
                                backgroundColor: "#000000",
                                color: "white",
                                cursor: "pointer",
                                borderRadius: "0px 10px 10px 0px",
                            }}
                        >
                            Search here
                        </button>
                    </div>

                    <div className="icon f_flex width">
                        {userState?.isLoggedIn ? (
                            <>
                                {" "}
                                {user.profile_pic ? (
                                    <img
                                        onClick={handleOpen}
                                        src={getProfilePicImageURL(
                                            user.profile_pic
                                        )}
                                        alt="profile"
                                        style={{
                                            height: 48,
                                            width: 48,
                                            borderRadius: "50%",
                                        }}
                                    />
                                ) : (
                                    <i
                                        onClick={handleOpen}
                                        className="fa fa-user icon-circle"
                                        style={{ cursor: "pointer" }}
                                    ></i>
                                )}
                                <div className="notification">
                                    <Link to="/notification">
                                        <i className="fa fa-bell icon-circle"></i>
                                        <span
                                            style={{
                                                backgroundColor:
                                                    designVar.colors
                                                        .iconBackgroundColor,
                                            }}
                                        >
                                            2
                                        </span>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <a
                                    href="https://github.com/kanha638/Price-Tracker"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Button
                                        style={{
                                            backgroundColor: "black",
                                            color: "white",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "5px",
                                            border: "solid 2px green",
                                        }}
                                    >
                                        <i class="fa-brands fa-github"></i>
                                        <span>Github</span>
                                    </Button>
                                </a>
                            </>
                        )}
                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <form>
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            marign="auto"
                            // marginTop={5}
                            padding={2}
                            borderRadius={2}
                            sx={{
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundColor: "white",
                                minWidth: "300px",
                                
                                maxWidth: "550px",
                                width: "90%",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                            }}
                        >
                            <div
                                style={{
                                    width: "90%",
                                }}
                            >
                                <Button onClick={handleClose}>
                                    <i
                                        class="fa-solid fa-arrow-left"
                                        style={{
                                            fontSize: "25px",
                                            color: "black",
                                        }}
                                    ></i>
                                </Button>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    alt="logo"
                                    src={profileimg}
                                    style={{
                                        // zIndex:"2",
                                        height: "8rem",
                                        width: "8rem",
                                        borderRadius: "50%",
                                        border: "2px solid black",
                                        // outline: "1px solid black",
                                        // outlineOffset: "0px",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            <Typography
                                variant="h4"
                                style={{ fontSize: "38px", marginTop: "20px" }}
                                padding={0}
                                textAlign="center"
                            >
                                {/* Profile */}
                            </Typography>
                            <TextField
                                variant={"outlined"}
                                margin="normal"
                                // placeholder={"XYZ"}
                                type={"text"}
                                autoComplete="name"
                                name="credential"
                                value={"xyz"}
                                sx={{ width: "90%" }}
                            />
                            <TextField
                                variant={"outlined"}
                                margin="normal"
                                value={"XYZ@gmail.com"}
                                type={"text"}
                                autoComplete="email"
                                name="credential"
                                sx={{ width: "90%" }}
                            />
                            <TextField
                                variant={"outlined"}
                                value={"8450054420"}
                                type={"number"}
                                margin="normal"
                                name="password"
                                sx={{ width: "90%" }}
                            />
                            <TextField
                                variant={"outlined"}
                                value={"*********"}
                                type={"password"}
                                margin="normal"
                                name="password"
                                sx={{ width: "90%" }}
                            />

                            <Button
                                sx={{
                                    marginTop: 3,
                                    width: "90%",
                                    height: "50px",
                                }}
                                style={{
                                    borderRadius: 3,
                                    backgroundColor: "black",
                                    padding: "10px 10px",
                                    fontSize: "20px",
                                }}
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </Button>
                            <Grid container>
                                <Grid
                                    item
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        marginTop: "20px",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <p>Want to reset the password?</p>
                                    <Link
                                        to="/" //link of reset password page here
                                        className="link-redirect"
                                    >
                                        Reset Password
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Modal>
            </section>
        </>
    );
};

export default Search;
