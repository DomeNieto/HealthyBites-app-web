import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import { Recipe } from "../../interfaces/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Card
      sx={{
        bgcolor: "secondary.main",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          justifyItems: "flex-start",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {recipe.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Ingredientes:
        </Typography>
        <List
          dense
          sx={{
            p: 0,
            maxHeight: "21px",
            overflowY: "auto",
            width: "100%",
          }}
        >
          {recipe.ingredients.map((ingredient) => (
            <ListItem key={ingredient.id} sx={{ fontSize: "13px", p: 0 }}>
              {ingredient.name} ({ingredient.quantityCalories} cal)
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Preparación:
        </Typography>
        <Typography
          sx={{
            maxHeight: "40px",
            overflowY: "auto",
            width: "100%",
            overflowX: "hidden",
            fontSize: "13px",
            textAlign: "left",
          }}
        >
          {recipe.preparation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
