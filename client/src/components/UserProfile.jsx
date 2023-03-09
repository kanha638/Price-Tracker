import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Badge,
  CssBaseline,
  Grid,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Man from "../images/man.jpg";
import EditIcon from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CompletedProducts from "./CompleteProduct";
import IncompleteProducts from "./IncompleteProduct";
import SearchBar from "./SearchBar";
import AllProducts from "./AllProducts";
import SideBar from "./SideBar";

const theme = createTheme({
  palette: {
    neutral: {
      main: "lightBlue",
      contrastText: "#fff",
    },
  },
  blacks: {
    neutral: {
      main: "black",
      contrastText: "#fff",
    },
  },
});

export default function UserProfile() {
  return (
    <>
      {" "}
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: {
            md: "100px",
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xl">
            {/* <CssBaseline /> */}

            <Box sx={{ margin: "4", paddingTop: "20px" }}>
              <Grid container spacing={2} columns={12} display="flex">
                <Container
                  sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    bgcolor="whitesmoke"
                    marginTop={2}
                    borderRadius={3}
                    padding={2}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar
                        alt="Sharp"
                        src={Man}
                        sx={{ height: 200, width: 200, borderRadius: 100 }}
                      />
                      {/* <Typography variant="Subtitle1">{"User Name"}</Typography> */}
                      {/* <hr width="80%" /> */}
                    </Box>

                    <Box
                      paddingTop={4}
                      paddingX={4}
                      display="flex"
                      flexDirection="column"
                      sx={{ gap: "10px" }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        padding={3}
                        bgcolor="skyblue"
                        borderRadius={3}
                      >
                        <Typography variant="subtitle2" color="grey">
                          Name*
                        </Typography>
                        <Typography
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography variant="subtitle1">User Name</Typography>
                          <EditIcon />
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        padding={3}
                        bgcolor="skyblue"
                        borderRadius={3}
                      >
                        <Typography variant="subtitle2" color="grey">
                          Email*
                        </Typography>
                        <Typography
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography variant="subtitle1">
                            {"User123@gmail.com"}
                          </Typography>
                          <EditIcon />
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        padding={3}
                        bgcolor="skyblue"
                        borderRadius={3}
                      >
                        <Typography variant="subtitle2" color="grey">
                          Phone Number*
                        </Typography>
                        <Typography
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography variant="subtitle1">
                            +91 834593XXXX
                          </Typography>
                          <EditIcon />
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* <Grid item xs={12} sm={0.2} borderRadius={3}></Grid> */}

                  <Grid
                    item
                    xs={12}
                    sm={7.5}
                    padding={4}
                    bgcolor="whitesmoke"
                    marginTop={2}
                    borderRadius={3}
                    display="flex"
                    flexDirection="column"
                  >
                    {/* test */}
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid display="flex" flexDirection="row" sx={{}}>
                        {/* <Typography color='blue' >{'Incomplete Tasks'}</Typography>
                                    <Typography paddingLeft={2} color='Blue'>{'Completed Tasks'}</Typography> */}
                        <Link href="#" underline="hover">
                          {"Incomplete Tasks"}
                        </Link>
                        <Link
                          href="#"
                          underline="hover"
                          style={{ paddingLeft: "20px" }}
                        >
                          {"Completed Tasks"}
                        </Link>
                      </Grid>
                      <Grid>
                        <FormControl
                          size="small"
                          variant="standard"
                          sx={{ width: "10ch" }}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Duration
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={"customize"}
                            label="customize"
                          >
                            <MenuItem value={10}>Week</MenuItem>
                            <MenuItem value={20}>Month</MenuItem>
                            <MenuItem value={30}>Year</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CompletedProducts />
                      {/* <IncompleteProducts /> */}
                      {/* <AllProducts/> */}
                    </Grid>
                  </Grid>
                </Container>
              </Grid>

              {/* </Grid> */}
            </Box>
          </Container>
        </ThemeProvider>
      </Container>
    </>
  );
}
