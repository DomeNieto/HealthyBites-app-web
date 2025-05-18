import { LineChart } from "@mui/x-charts/LineChart";
import { useSelector } from "react-redux";
import { selectUserRegistrationByMonth } from "../../store/users/UserSlice";
import theme from "../../themes/CustomTheme";
import { Stack, Typography } from "@mui/material";

export default function UserRegistrationAreaChart() {
  const registrationData = useSelector(selectUserRegistrationByMonth);

  const sortedEntries = Object.entries(registrationData).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  const firstEntry = sortedEntries[0]?.[0];
  const displayedYear = firstEntry?.split("-")[0];

  const xLabels = sortedEntries.map(([date]) => {
    const monthNumber = Number(date.split("-")[1]);
    return new Date(0, monthNumber - 1).toLocaleString("default", {
      month: "short",
    });
  });

  const yValues = sortedEntries.map(([, count]) => count);

  return (
    <Stack direction="column" sx={{ width: "100%", pt: 2 }}>
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        Usuarios registrados por mes del año {displayedYear}
      </Typography>
      <LineChart
        xAxis={[{ data: xLabels, scaleType: "point", label: "Mes" }]}
        series={[
          {
            data: yValues,
            color: theme.palette.primary.main,
            area: true,
            label: "Usuarios registrados",
          },
        ]}
        height={200}
      />
    </Stack>
  );
}
