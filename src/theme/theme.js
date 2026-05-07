import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a6fb",
    },
    secondary: {
      main: "#0b132b",
    },
    background: {
      default: "#f7fbff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
  },
  shape: {
    borderRadius: 14,
  },
});

export default theme;