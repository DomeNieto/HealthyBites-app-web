import { Box, Card, Container, Theme } from "@mui/material";
import LoginForm from "../../components/login-form/LoginForm";

const LoginPage = () => {
  return (
    <Container maxWidth={false} sx={signInContainer}>
      <Card variant="outlined" sx={cardStyle}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifySelf: "center",
            verticalAlign: "center",
            flexDirection: "column",
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
    </Container>
  );
};

const cardStyle = () => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "50%",
  padding: "8px",
  paddingTop: "40px",
  paddingBottom: "40px",
  gap: "24px",
  minWidth: 335,
});

const signInContainer = (theme: Theme) => ({
  flexGrow: 1,
  width: "60vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
});

export default LoginPage;
