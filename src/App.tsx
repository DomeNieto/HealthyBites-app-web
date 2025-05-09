import "./App.css";
import { Provider } from "react-redux";

import { store } from "./store/store";
import Router from "./pages/router/Router";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./themes/CustomTheme";

function App() {
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
