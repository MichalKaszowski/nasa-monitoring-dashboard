import { Grid } from "@mui/material";
import AsteroidCard from "./AsteroidCard";
import type { Asteroid } from "../pages/MainPage";


export default function AsteroidGrid({ asteroids }: { asteroids: Asteroid[] }){
    return(
      <Grid container spacing={3} justifyContent="center">
        {asteroids.map( asteroid => (
          <Grid key={asteroid.id}>
            <AsteroidCard 
                name={asteroid.name}
                isHazardous={asteroid.is_potentially_hazardous_asteroid}
                isSentry={asteroid.is_sentry_object}
                lunarDistance={Number(asteroid.close_approach_data[0].miss_distance.lunar)}
                velocity={Number(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second)}
                diameterMin={asteroid.estimated_diameter.meters.estimated_diameter_min}
                diameterMax={asteroid.estimated_diameter.meters.estimated_diameter_max}
            />
            </Grid>
        ))}
      </Grid>
    )
}