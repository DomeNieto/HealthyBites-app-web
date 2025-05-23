import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../store/auth/AuthApi";
import { saveEmail, saveRol, saveToken } from "../../store/auth/TokenUtility";
import CustomSnackbar from "../snackbar/CustomSnackbar";

// LoginForm component handles user login with email and password.
const LoginForm = () => {
  const userInitial = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInitial);
  const [keepSession, setKeepSession] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  const navigate = useNavigate();

  // Update user state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission and login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(user).unwrap();
      if (data.token && data.role && data.email) {
        saveToken(data.token, keepSession);
        saveRol(data.role, keepSession);
        saveEmail(data.email, keepSession);
        setSnackbar({
          open: true,
          message: "Inicio de sesión exitoso.",
          severity: "success",
        });
        navigate("/home");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Credenciales inválidas. Inténtalo de nuevo.",
        severity: "error",
      });
      console.log("DEBUG: Error iniciar sesión, query", error);
    } finally {
      setUser(userInitial);
    }
  };

  return (
    <>
      <Container
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={formContainerStyle}
      >
        <FormControl>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="Dirección de correo eléctronico"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            value={user.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            name="password"
            placeholder="Constraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            value={user.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={keepSession}
              onChange={() => setKeepSession(!keepSession)}
              color="primary"
            />
          }
          label="Recordarme"
        />
        <Box
          display="flex"
          justifyContent="center"
          width={"80%"}
          alignSelf={"center"}
        >
          <Button type="submit" fullWidth variant="contained">
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </Box>
      </Container>

      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
};

export default LoginForm;

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 2,
};
