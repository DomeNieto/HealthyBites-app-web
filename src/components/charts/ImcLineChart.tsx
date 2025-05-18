import { useSelector } from "react-redux";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Box, Stack, Typography } from "@mui/material";
import { selectUserCountByImcCategory } from "../../store/users/UserSlice";
import theme from "../../themes/CustomTheme";

export default function ImcLineChart() {
  const imcCount = useSelector(selectUserCountByImcCategory);

  const data = [
    imcCount["Bajo peso"] || 0,
    imcCount["Normal"] || 0,
    imcCount["Sobrepeso"] || 0,
    imcCount["Obesidad grado 1"] || 0,
    imcCount["Obesidad grado 2"] || 0,
  ];

  const categories = [
    "Bajo peso",
    "Normal",
    "Sobrepeso",
    "Obesidad grado 1",
    "Obesidad grado 2",
  ];

  return (
    <Stack direction="column" sx={{ width: "100%", pt: 2 }}>
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        Categoría IMC de los usuarios
      </Typography>

      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <SparkLineChart
          plotType="bar"
          data={data}
          height={100}
          color={theme.palette.secondary.main}
          showHighlight={true}
          showTooltip={true}
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
      <Typography>Imc</Typography>
    </Stack>
  );
}
