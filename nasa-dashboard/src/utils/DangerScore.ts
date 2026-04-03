import type { FlattenedAsteroid } from "../pages/MainPage";

export function dangerScore(asteroid: FlattenedAsteroid): number {
  let value =
    (Number(
      asteroid.close_approach_data_0_relative_velocity_kilometers_per_second,
    ) +
      asteroid.estimated_diameter_meters_estimated_diameter_max) /
    Number(asteroid.close_approach_data_0_miss_distance_lunar);
  if (asteroid.is_potentially_hazardous_asteroid) value = value * 1.5;
  if (asteroid.is_sentry_object) value = value * 1.5;
  return value;
}
