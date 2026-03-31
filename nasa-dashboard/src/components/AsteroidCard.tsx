import { CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { dangerScore } from "../utils/DangerScore";

export interface AsteroidProps{
    name: string, 
    isHazardous: boolean;
    isSentry: boolean;
    lunarDistance: number
    velocity: number
    diameterMin: number
    diameterMax: number
}

export default function AsteroidCard( asteroid: AsteroidProps ){
    return(
        <Card>
            <CardContent>
                <Typography variant="h3">{asteroid.name}</Typography>
                <Typography>Risk Score: {dangerScore(asteroid)}</Typography>
            </CardContent>
        </Card>
    )

}