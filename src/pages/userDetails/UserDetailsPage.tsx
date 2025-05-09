import { Typography, Button, Box } from "@mui/material";
import { useGetUserByIdQuery } from "../../store/users/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SpinnerIsLoading from "../../components/loading/SpinnerLoading";
import { calculateImc } from "../user/HeaderColumns";
import BackButton from "../../components/backButton/BackBurtton";

const UserDetailsPage = () => {
  const { userId: _id } = useParams<{ userId: string }>();
  console.log("_id", _id);

  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(_id!, {
    skip: !_id,
  });

  console.log(user);

  if (!_id) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          ID de usuario no proporcionado en la URL.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2, color: "#9c27b0", borderColor: "#9c27b0" }}
        >
          Volver
        </Button>
      </Box>
    );
  }

  if (isLoading) {
    return <SpinnerIsLoading />;
  }

  if (isError) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center", mt: 4 }}>
        <Typography color="error" variant="h6">
          Error al cargar los datos del usuario.
        </Typography>
        <BackButton />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Usuario no encontrado.</Typography>
        <BackButton />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        /*   minHeight: "calc(100vh - 64px)", */
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          gap: { xs: 3, md: 5 },
          py: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <AccountCircleIcon
            sx={{ fontSize: { xs: 150, md: 200 }, color: "black" }}
          />
        </Box>

        {/* Right */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2.5 }}
          >
            {user.name || "Nombre no disponible"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            <strong>Altura:</strong>{" "}
            {user.infoUser.height
              ? `${user.infoUser.height.toString().replace(".", ",")}m`
              : "N/A"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            <strong>Peso:</strong>{" "}
            {user.infoUser.weight ? `${user.infoUser.weight} Kg` : "N/A"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            <strong>Nivel de Actividad Física:</strong>{" "}
            {user.infoUser.activityLevel || "N/A"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <strong>IMC (kg/m²):</strong> {calculateImc(user)}
          </Typography>

          <Button
            variant="contained"
            onClick={() => {
              console.log("Ver Recetas para usuario:", _id);
            }}
            sx={{
              textTransform: "none",
            }}
          >
            Ver Recetas
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: "50px", alignSelf: "flex-start" }}>
        <BackButton />
      </Box>
    </Box>
  );
};

export default UserDetailsPage;
