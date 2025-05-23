import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import { selectHighestCalorieIngredients } from "../../store/ingredient/IngredientSlice";
import { Stack, Typography } from "@mui/material";
import { generateColorPalette } from "./UtilityCharts";

/**
 * IngredientPieChart component displays a pie chart showing
 * the ingredients with the highest calorie values.
 * It pulls data from the Redux store and generates a color palette dynamically.
 */
export default function IngredientPieChart() {
  // Fetch highest calorie ingredients from the store
  const highestCalorieIngredients = useSelector(
    selectHighestCalorieIngredients
  );

  // Convert object to array of data suitable for the PieChart
  const chartData = Object.entries(highestCalorieIngredients).map(
    ([ingredient, calories], index) => ({
      id: index,
      label: ingredient,
      value: calories,
    })
  );

  // Dynamically generate a color for each ingredient
  const dynamicColors = generateColorPalette(chartData.length);

  return (
    <Stack direction="column" sx={{ width: "100%", pt: 2 }}>
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        Calorías de los Ingredientes
      </Typography>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter: (item: { value: number }) => `${item.value} cal`,
          },
        ]}
        width={150}
        height={150}
        colors={dynamicColors}
      />
    </Stack>
  );
}
