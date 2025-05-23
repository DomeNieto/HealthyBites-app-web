import "./App.css";
import { Provider } from "react-redux";

import { store } from "./store/store";
import Router from "./pages/router/Router";
import { Box, ThemeProvider, useTheme } from "@mui/material";

/**
 * Main application component.
 *
 * Wraps the app with Redux Provider and Material-UI ThemeProvider.
 * Provides the Redux store and MUI theme to all child components.
 *
 * Layout uses a flex container that fills the viewport height,
 * with the Router component taking flexible space inside.
 */
function App() {
  const theme = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Router />
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
