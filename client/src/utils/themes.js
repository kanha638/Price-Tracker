import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    neutral: {
      main: "#0C0B0B",
      contrastText: "#fff",
    },
  },
});

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#0C0B0B",
    },
    secondary: {
      main: "#F5F5F7",
    },
  },
});
