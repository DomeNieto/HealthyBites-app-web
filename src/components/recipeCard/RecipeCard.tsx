import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import { Recipe } from "../../interfaces/Recipe";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Card
      sx={{
        bgcolor: "secondary.main",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          justifyItems: "flex-start",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {recipe.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Ingredientes:
        </Typography>
        <List dense sx={{ p: 0 }}>
          {recipe.ingredients.map((ingredient) => (
            <ListItem key={ingredient.id} sx={{ fontSize: "13px", m: 0 }}>
              {ingredient.name} ({ingredient.quantityCalories} cal)
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Preparación:
        </Typography>
        <Typography variant="subtitle2">{recipe.preparation}</Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
