import { useSelector } from "react-redux";
import { selectUserCountBySex } from "../../store/users/UserSlice";
import { PieChart } from "@mui/x-charts";
import { Stack, Typography } from "@mui/material";
import theme from "../../themes/CustomTheme";

export default function SexPieChart() {
  const sexCount = useSelector(selectUserCountBySex);

  const data = [
    { id: 0, value: sexCount.M || 0, label: "Masculino" },
    { id: 1, value: sexCount.F || 0, label: "Femenino" },
  ];

  return (
    <Stack direction="column" sx={{ width: "100%" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        Personas por sexo
      </Typography>
      <PieChart
        colors={[theme.palette.primary.main, theme.palette.secondary.main]}
        series={[
          {
            data: data,
          },
        ]}
        width={150}
        height={150}
      />
    </Stack>
  );
}
