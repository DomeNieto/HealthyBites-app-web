import { useParams } from "react-router";
import SpinnerIsLoading from "../../components/loading/SpinnerLoading";
import { Box, Grid, Typography } from "@mui/material";
import BackButton from "../../components/backButton/BackBurtton";
import { useGetUserRecipesQuery } from "../../store/users/UserApi";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import { Recipe } from "../../interfaces/Recipe";

// UserRecipesPage page
const UserRecipesPage = () => {
  // Extract userId from URL parameters
  const { userId: _id } = useParams<{ userId: string }>();

  // Fetch recipes for the given user ID, skip if no ID
  const { data: recipes, isLoading } = useGetUserRecipesQuery(_id!, {
    skip: !_id,
  });

  // Show loading spinner while fetching recipes
  if (isLoading) {
    return <SpinnerIsLoading />;
  }

  // If no recipes found, show message and back button
  if (!recipes) {
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
        pr: { xs: 1, md: 4 },
        pl: { xs: 1, md: 4 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "410px",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={3} justifyContent="center" overflow={"auto"}>
          {recipes.map((recipe: Recipe) => (
            <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: "20px", alignSelf: "flex-start" }}>
        <BackButton />
      </Box>
    </Box>
  );
};

export default UserRecipesPage;
