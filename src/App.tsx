import "./App.css";
import { Provider } from "react-redux";

import { store } from "./store/store";
import Router from "./pages/router/Router";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./themes/CustomTheme";
import Footer from "./components/layout/Footer";

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
              flexGrow: 1, // Ocupa el espacio vertical disponible
              display: "flex", // Necesario para que height: 100% funcione en hijos
              flexDirection: "column", // Apila el contenido del router verticalmente
            }}
          >
            <Router /> {/* AdminGuard será renderizado aquí dentro */}
          </Box>

          <Footer />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
