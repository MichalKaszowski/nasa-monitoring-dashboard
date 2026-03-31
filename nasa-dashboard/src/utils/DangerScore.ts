import type { AsteroidProps } from "../components/AsteroidCard"

export function dangerScore(asteroid: AsteroidProps): number{
    let value = (asteroid.velocity + ((asteroid.diameterMax + asteroid.diameterMin) / 2) )/ asteroid.lunarDistance
    if (asteroid.isHazardous) value = value * 1.5
    if (asteroid.isSentry) value = value * 1.5
    return value
}