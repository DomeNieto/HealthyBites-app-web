import { Box, Card, Theme } from "@mui/material";
import LoginForm from "../../components/login-form/LoginForm";
import Footer from "../../components/layout/Footer";

const LoginPage = () => {
  return (
    <Box sx={outerWrapper}>
      <Box sx={innerWrapper}>
        <Card variant="outlined" sx={cardStyle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginBottom: 4,
            }}
          >
            <img
              src="/src/assets/logoApp.png"
              alt="Logo Healthy Bites"
              style={{ width: "25%", maxHeight: "25%" }}
            />
          </Box>
          <LoginForm />
        </Card>

        <Box sx={{ marginTop: 4 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

const outerWrapper = (theme: Theme) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
});

const innerWrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const cardStyle = {
  width: "50%",
  padding: "40px 8px",
  gap: "24px",
  minWidth: 335,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default LoginPage;
