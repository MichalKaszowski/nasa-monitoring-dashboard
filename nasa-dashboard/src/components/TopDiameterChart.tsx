import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { COMPARISION_BUILDINGS } from "../Constants";
import type { ChartProps } from "../pages/MainPage";


export function TopDiameterChart({ asteroids }: ChartProps) {
  const topAsteroids = [...asteroids]
    .sort((a, b) => {
      return (
        b.estimated_diameter_meters_estimated_diameter_max -
        a.estimated_diameter_meters_estimated_diameter_max
      );
    })
    .slice(0, 5);

  const chartSetting = {
    yAxis: [
      {
        label: "diameter [m]  ",
        width: 60,
      },
    ],
    height: 300,
  };

  return (
    <Box sx={{ backgroundColor: "lightgray", borderRadius: "5px" }}>
      <Typography margin={2}>
        Top 5 largest asteroids (by max est. diameter) in comparison to some
        popular buildings{" "}
      </Typography>
      <BarChart
        dataset={
          [...topAsteroids, ...COMPARISION_BUILDINGS].sort((a, b) => {
            const sizeA =
              "building_height" in a
                ? a.building_height
                : a.estimated_diameter_meters_estimated_diameter_max;

            const sizeB =
              "building_height" in b
                ? b.building_height
                : b.estimated_diameter_meters_estimated_diameter_max;

            return Number(sizeB) - Number(sizeA);
          }) as Record<string, any>[]
        }
        xAxis={[{ dataKey: "name", label: "Object Name", scaleType: "band" }]}
        series={[
          {
            dataKey: "estimated_diameter_meters_estimated_diameter_max",
            label: "Asteroid",
          },
          {
            dataKey: "building_height",
            label: "Building",
            stackOrder: "descending",
          },
        ]}
        {...chartSetting}
      />
    </Box>
  );
}
