import { createTheme } from "@mui/material";
import "@mui/material/Button";
import "@mui/material/styles";

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

const customPalette = {
  primary: "#723694",
  secondary: "#ECDBF7",
  tertiary: "#ffab00",
};

let theme = createTheme({
  palette: {
    contrastThreshold: 3.47,
  },
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

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
