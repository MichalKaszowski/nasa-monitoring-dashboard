import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import AsteroidGrid from '../components/AsteroidGrid';


export interface Asteroid {
    name: string;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    estimated_diameter: Diameter;
    close_approach_data: ApproachData[]

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

export default function MainPage() {
    const todayDate = new Date().toISOString().split('T')[0];
    const [beginDate, setBeginDate] = useState(todayDate);
    const [endDate, setEndDate] = useState(todayDate);

    // const [asteroids, setAsteroids] = useState<NasaResponse>();
    const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${beginDate}&end_date=${endDate}&api_key=${apiKey}`);
            if (!response.ok) throw new Error('Failed fetch');

            const result = await response.json() as NasaResponse;

            if (result.near_earth_objects) {
                setAsteroids(Object.values(result.near_earth_objects).flat())
            }

        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

useEffect(() => {
    console.log("Dane w stanie właśnie się zmieniły:", asteroids);
}, [asteroids]);


    // Właściwe renderowanie listy
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
                // <ul>
                //     {asteroids.map((asteroid) => (
                //         <li key={asteroid.id} style={{ marginBottom: '8px' }}>
                //             <strong>{asteroid.name}</strong> <br />
                //         </li>
                //     ))}
                // </ul>
                <AsteroidGrid asteroids={asteroids} />
            )
            }
        </div>
    );
}