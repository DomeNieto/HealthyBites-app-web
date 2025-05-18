import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { selectUserCountByAgeRange } from "../../store/users/UserSlice";
import theme from "../../themes/CustomTheme";
import { Stack, Typography } from "@mui/material";

export default function UserAgeRangeBarChart() {
  const ageRangeData = useSelector(selectUserCountByAgeRange);

  const labels = Object.keys(ageRangeData);
  const values = Object.values(ageRangeData);

  return (
    <Stack direction="column" sx={{ width: "100%", pt: 2 }}>
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        Rangos de edad registrados
      </Typography>
      <BarChart
        xAxis={[{ data: labels, scaleType: "band", label: "Rango de edad" }]}
        series={[{ data: values, label: "Usuarios" }]}
        height={150}
        colors={[theme.palette.primary.main]}
      />
    </Stack>
  );
}
