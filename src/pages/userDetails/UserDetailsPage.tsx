import { Typography, Button, Box } from "@mui/material";
import { useGetUserByIdQuery } from "../../store/users/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SpinnerIsLoading from "../../components/loading/SpinnerLoading";

import BackButton from "../../components/backButton/BackBurtton";
import { calculateImc } from "../../store/users/UtitilitySelector";

const UserDetailsPage = () => {
  const { userId: _id } = useParams<{ userId: string }>();
  console.log("_id", _id);

  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUserByIdQuery(_id!, {
    skip: !_id,
  });

  const handleViewRecipes = () => {
    navigate(`/recipes/user/${_id}`);
  };

  if (isLoading) {
    return <SpinnerIsLoading />;
  }

  if (!user) {
    // USAR HANDEL
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
        p: { xs: 1, md: 2 },
        display: "flex",
        flexDirection: "column",
        height: "80%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },

          justifyContent: "center",
          gap: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ textAlign: "center", alignSelf: "center" }}>
          <AccountCircleIcon
            sx={{ fontSize: { xs: 100, md: 300 }, color: "black" }}
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
            <strong>Edad:</strong>{" "}
            {user.infoUser.age ? `${user.infoUser.age} años` : "N/A"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            <strong>Sexo:</strong>{" "}
            {user.infoUser.sex === "F" ? "Femenino" : "Másculino"}
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
            onClick={() => handleViewRecipes()}
            sx={{
              textTransform: "none",
            }}
          >
            Ver Recetas
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: "50px", ml: "15px", alignSelf: "flex-start" }}>
        <BackButton />
      </Box>
    </Box>
  );
};

export default UserDetailsPage;
