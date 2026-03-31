import { CardActions, CardContent, Collapse, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { dangerScore } from "../utils/DangerScore";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export interface AsteroidProps {
    name: string,
    isHazardous: boolean;
    isSentry: boolean;
    lunarDistance: number
    velocity: number
    diameterMin: number
    diameterMax: number
}


export default function AsteroidCard(asteroid: AsteroidProps) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h3">{asteroid.name}</Typography>
                <Typography>Risk Score: {dangerScore(asteroid)}</Typography>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={handleExpandClick}>
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>lunar distance: {asteroid.lunarDistance} LD</Typography>
                    <Typography>velocity: {asteroid.velocity} km/s</Typography>
                    <Typography>diameter: {asteroid.diameterMin} - {asteroid.diameterMax} m</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )

}