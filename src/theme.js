import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: "51px",
          minHeight: "51px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          "&.MuiToolbar-root": {
            height: "51px",
            minHeight: "51px",
          },
        },
      },
    },
  },
});

export default theme;
