import { createTheme } from "@mui/material";
import "@mui/material/Button";
import "@mui/material/styles";

// MUI Styles Module Extensions
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

// Custom palette with primary, secondary and tertiary colors
const customPalette = {
  primary: "#723694",
  secondary: "#ECDBF7",
  tertiary: "#ffab00",
};

// Base theme with typography and contrast settings
let theme = createTheme({
  palette: {
    contrastThreshold: 3.47,
  },
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
});

// Previous theme with our custom palette
theme = createTheme(theme, {
  palette: {
    primary: theme.palette.augmentColor({
      color: {
        main: customPalette.primary,
      },
      name: "primary",
    }),
    secondary: theme.palette.augmentColor({
      color: {
        main: customPalette.secondary,
      },
      name: "secondary",
    }),
    tertiary: theme.palette.augmentColor({
      color: {
        main: customPalette.tertiary,
        contrastText: "#ffffff",
      },
      name: "tertiary",
    }),
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
});

export default theme;
