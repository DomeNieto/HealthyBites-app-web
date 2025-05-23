import { AppBar, Box, Button, Toolbar, Typography, Theme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import logoSrc from "/src/assets/logoApp.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/auth/AuthSlice";
import { useGetUserByEmailQuery } from "../../store/users/UserApi";

// AppBar
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUserEmail = useSelector(
    (state: RootState) => state.auth.auth.email
  );

  const { data: user } = useGetUserByEmailQuery(currentUserEmail!, {
    skip: !currentUserEmail,
  });

  const handleLogout = () => {
    const confirmed = window.confirm("¿Estás seguro de que deseas salir?");
    if (confirmed) {
      navigate("/");
      dispatch(logout());
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar disableGutters>
        <img src={logoSrc} alt="Logo Hb" style={logoStyle} />

        <Button sx={navButtonStyle} onClick={() => handleNavigation("/home")}>
          Cuadro de mando
        </Button>

        <Button sx={navButtonStyle} onClick={() => handleNavigation("/users")}>
          Usuarios
        </Button>
        <Button
          sx={navButtonStyle}
          onClick={() => handleNavigation("/ingredients")}
        >
          Ingredientes
        </Button>
        <Button
          sx={navButtonStyle}
          onClick={() => handleNavigation("/advices")}
        >
          Consejos
        </Button>

        <Box sx={spacerStyle} />
        <Box sx={adminGroupStyle}>
          <PersonIcon sx={iconStyle} />

          <Typography variant="h6" component="div" sx={adminTextStyle}>
            Hola, {user?.name}
          </Typography>

          <Box sx={logoutBoxStyle} onClick={handleLogout}>
            <Button sx={logoutButtonStyle} aria-label="Cerrar sesión">
              <LogoutIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const appBarStyle = (theme: Theme) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.common.black,
  height: "65px",
  display: "flex",
  justifyContent: "center",
  paddingRight: "3%",
  paddingLeft: "3%",
});

const logoStyle = {
  height: "40px",
  width: "auto",
  marginRight: "15px",
  verticalAlign: "middle",
};

const navButtonStyle = (theme: Theme) => ({
  color: "inherit",
  textTransform: "none",
  margin: theme.spacing(5),
});

const spacerStyle = {
  flexGrow: 1,
};

const adminGroupStyle = {
  display: "flex",
  alignItems: "center",
};

const adminTextStyle = (theme: Theme) => ({
  fontSize: 17,
  marginRight: theme.spacing(1.5),
});

const iconStyle = (theme: Theme) => ({
  color: "inherit",
  margin: theme.spacing(0, 1),
});

const logoutButtonStyle = (theme: Theme) => ({
  color: theme.palette.primary.contrastText,
  padding: 0,
  minWidth: "auto",
});

const logoutBoxStyle = (theme: Theme) => ({
  display: "flex",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "5px",
  padding: theme.spacing(0.5, 1),
  marginLeft: theme.spacing(5),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
});

export default Navbar;
