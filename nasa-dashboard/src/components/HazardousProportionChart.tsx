import { PieChart } from "@mui/x-charts/PieChart";
import type { ChartProps } from "../pages/MainPage";
import { Box, Typography } from "@mui/material";

export function HazardousProportionChart({ asteroids }: ChartProps) {
  const hazardousCount = asteroids.filter(
    (a) => a.is_potentially_hazardous_asteroid,
  ).length;

  const safeCount = asteroids.length - hazardousCount;

  const pieData = [
    {
      id: 0,
      value: hazardousCount,
      label: "Zagrożenie",
      color: "#d32f2f",
    },
    {
      id: 1,
      value: safeCount,
      label: "Bezpieczne",
      color: "#4caf50", // Zielony
    },
  ];

  return (
    <Box sx={{ backgroundColor: "lightgray", borderRadius: "5px" }}>
      <Typography margin={2}>Hazardous Asteroids Proportion</Typography>
      <PieChart
        sx={{ margin: "16px" }}
        height={150}
        series={[
          {
            data: pieData,
            innerRadius: 50,
            paddingAngle: 3,
            cornerRadius: 5,
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
      />
    </Box>
  );
}
