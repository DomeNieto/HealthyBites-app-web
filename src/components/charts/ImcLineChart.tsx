import { useSelector } from "react-redux";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { selectUserCountByImcCategory } from "../../store/users/UserSlice";
import { categories } from "./UtilityCharts";

/**
 * Componente ImcLineChart muestra un gráfico de barras que representa
 * la cantidad de usuarios en diferentes categorías de IMC (Índice de Masa Corporal).
 * Utiliza datos del estado global (Redux) y renderiza un SparkLineChart.
 */
export default function ImcLineChart() {
  const theme = useTheme();

  // Get the count of users by BMI category from Redux store
  const imcCount = useSelector(selectUserCountByImcCategory);

  // Create an array of data values for the chart, defaulting to 0 if no users in category
  const data = categories.map((category) => imcCount[category] || 0);

  return (
    <Stack direction="column" sx={{ width: "100%", pt: 2 }}>
      {/* Chart title */}
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        Users by BMI Category
      </Typography>

      {/* Chart container */}
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <SparkLineChart
          plotType="bar" // Chart type: bar
          data={data} // Data for the chart
          height={100} // Chart height
          color={theme.palette.secondary.main} // Bar color from theme
          showHighlight={true} // Highlight bars on hover
          showTooltip={true} // Show tooltip on hover
        />
      </Box>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        {categories.map((category, index) => (
          <Typography
            key={index}
            variant="body2"
            align="center"
            sx={{ width: "100%" }}
          >
            {category}
          </Typography>
        ))}
      </Stack>

      {/* Label at the bottom */}
      <Typography>BMI</Typography>
    </Stack>
  );
}
