import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

const customPalette = {
  primary: "#723694",
  secondary: "#723694",
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
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
});

export default theme;
