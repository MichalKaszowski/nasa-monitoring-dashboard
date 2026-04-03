import { ScatterChart } from "@mui/x-charts/ScatterChart";
import type { ChartProps } from "../pages/MainPage";
import { Box, Typography } from "@mui/material";

export function VelocityLunarChart({ asteroids }: ChartProps) {
  const safeData = asteroids
    .filter((a) => !a.is_potentially_hazardous_asteroid)
    .map((a) => ({
      id: a.name,
      x: Number(a.distance_lunar),
      y: Number(a.velocity_km_per_sec),
    }));

  const hazardousData = asteroids
    .filter((a) => a.is_potentially_hazardous_asteroid)
    .map((a) => ({
      id: a.name,
      x: Number(a.distance_lunar),
      y: Number(a.velocity_km_per_sec),
    }));

  const chartSeries: any[] = [];

  if (safeData.length > 0) {
    chartSeries.push({
      type: "scatter",
      label: "Bezpieczne",
      data: safeData,
      color: "green",
    });
  }

  if (hazardousData.length > 0) {
    chartSeries.push({
      type: "scatter",
      label: "Zagrożenie",
      data: hazardousData,
      color: "red",
    });
  }

  if (chartSeries.length === 0) {
    return (
      <div style={{ padding: "2rem" }}>
        Brak punktów do wyświetlenia na wykresie.
      </div>
    );
  }

  return (
    <Box sx={{ backgroundColor: "lightgray", borderRadius: "5px" }}>
      <Typography margin={2}>
        Hazard Map with Velocity and Lunar Distance
      </Typography>
      <ScatterChart
        height={300}
        series={chartSeries}
        xAxis={[{ id: "distance", label: "Odległość (Lunar Distance)" }]}
        yAxis={[{ id: "velocity", label: "Prędkość (km/s)" }]}
      />
    </Box>
  );
}
