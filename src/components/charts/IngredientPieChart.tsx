import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import { selectHighestCalorieIngredients } from "../../store/ingredient/IngredientSlice";
import { Stack, Typography } from "@mui/material";
import { generateColorPalette } from "./UtilityCharts";

export default function IngredientPieChart() {
  const highestCalorieIngredients = useSelector(
    selectHighestCalorieIngredients
  );

  const chartData = Object.entries(highestCalorieIngredients).map(
    ([ingredient, calories], index) => ({
      id: index,
      label: ingredient,
      value: calories,
    })
  );

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
