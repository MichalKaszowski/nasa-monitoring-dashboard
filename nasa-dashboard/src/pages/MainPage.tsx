import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import AsteroidGrid from '../components/AsteroidGrid';
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';
import { flattenObject } from '../utils/FlattenObject';
import { dangerScore } from '../utils/DangerScore';


export interface Asteroid {
    name: string;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    estimated_diameter: Diameter;
    close_approach_data: ApproachData[]
}

export interface FlattenedAsteroid {
    name: string;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    close_approach_data_0_relative_velocity_kilometers_per_second: string;
    close_approach_data_0_miss_distance_lunar: string; 
    estimated_diameter_meters_estimated_diameter_min: number;
    estimated_diameter_meters_estimated_diameter_max: number;
}

export interface FlattenedAsteroidDangerScore extends FlattenedAsteroid{
    danger_score: number;
    distance_lunar: number;
    velocity_km_per_sec: number;
}


export interface ApproachData{
    relative_velocity: RelativeVelocity
    miss_distance: MissDistance
}

export interface MissDistance{
    lunar: string
}

export interface RelativeVelocity{
    kilometers_per_second: string
}


export interface Diameter{
    meters: DiameterMeters;
}

export interface DiameterMeters{
    estimated_diameter_min: number
    estimated_diameter_max: number
}

interface NasaResponse {
    near_earth_objects: Record<string, Asteroid[]>;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'is_potentially_hazardous_asteroid', headerName: 'Is Hazardous', width: 150 },
  { field: 'is_sentry_object', headerName: 'Is Sentry Object', width: 150 },
  { field: 'distance_lunar', headerName: 'Lunar Distance', width: 300 },
  { field: 'velocity_km_per_sec', headerName: 'Velocity', width: 200 },
  { field: 'estimated_diameter_meters_estimated_diameter_max', headerName: 'Max Diameter', width: 200 },
  { field: 'danger_score', headerName: 'Danger Score', width: 200 }
];

export default function MainPage() {
    const todayDate = new Date().toISOString().split('T')[0];
    const [beginDate, setBeginDate] = useState(todayDate);
    const [endDate, setEndDate] = useState(todayDate);

    const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
    const [flattenedAsteroids, setFlattenedAsteroids] = useState<FlattenedAsteroid[]>([]);

    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${beginDate}&end_date=${endDate}&api_key=${apiKey}`);
            if (!response.ok) throw new Error('Failed fetch');

            const result = await response.json() as NasaResponse;

            if (result.near_earth_objects) {
                setAsteroids(Object.values(result.near_earth_objects).flat())
                const flattened = Object.values(result.near_earth_objects).flat().map(asteroid => {
                    const flattenedAsteroid = flattenObject(asteroid) as FlattenedAsteroid;
                    return {
                        ...flattenedAsteroid,
                        velocity_km_per_sec: Number(flattenedAsteroid.close_approach_data_0_relative_velocity_kilometers_per_second),
                        distance_lunar: Number(flattenedAsteroid.close_approach_data_0_miss_distance_lunar),
                        danger_score: dangerScore(flattenedAsteroid)
                    } as FlattenedAsteroidDangerScore                
            });
                setFlattenedAsteroids(flattened);
            }
                
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Main Page - Asteroidy blisko Ziemi</h1>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker defaultValue={dayjs()}
                        onChange={(date) => setBeginDate(date?.toISOString() || todayDate)} />
                    <DatePicker defaultValue={dayjs()}
                        onChange={(date) => setEndDate(date?.toISOString() || todayDate)} />
                </LocalizationProvider>
                <Button onClick={fetchData} variant="contained">Wyszukaj</Button>
            </div>


            {(asteroids.length == 0) ? (
                <div>Brak danych do wyświetlenia.</div>
            ) : (
                <DataGrid columns={columns} rows={flattenedAsteroids} />
                //   <AsteroidGrid asteroids={asteroids} />  
                )
            }
        </div>
    );
}