import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, styled, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { flattenObject } from '../utils/FlattenObject';
import { dangerScore } from '../utils/DangerScore';
import { VelocityLunarChart } from '../components/VelocityLunarChart';
import { HazardousProportionChart } from '../components/HazardousProportionChart';
import { TopDiameterChart } from '../components/TopDiameterChart';
import SearchIcon from '@mui/icons-material/Search';



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

export interface FlattenedAsteroidDangerScore extends FlattenedAsteroid {
    danger_score: number;
    distance_lunar: number;
    velocity_km_per_sec: number;
}

export interface ChartProps {
  asteroids: FlattenedAsteroidDangerScore[];
}

interface NasaResponse {
    near_earth_objects: Record<string, Asteroid[]>;
}

interface Asteroid {
    name: string;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    estimated_diameter: Diameter;
    close_approach_data: ApproachData[]
}

interface ApproachData {
    relative_velocity: RelativeVelocity
    miss_distance: MissDistance
}

interface MissDistance {
    lunar: string
}

interface RelativeVelocity {
    kilometers_per_second: string
}

interface Diameter {
    meters: DiameterMeters;
}

interface DiameterMeters {
    estimated_diameter_min: number
    estimated_diameter_max: number
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
    const [flattenedAsteroids, setFlattenedAsteroids] = useState<FlattenedAsteroidDangerScore[]>([]);
    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${beginDate}&end_date=${endDate}&api_key=${apiKey}`);
            if (!response.ok) throw new Error('Failed fetch');

            const result = await response.json() as NasaResponse;

            if (result.near_earth_objects) {
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
        <>
            <PageTitle>
                <Typography color='lightgray'>Asteroids Dashboard ☄️</Typography>
            </PageTitle>
            <PageWrapper>
                <InputWrapper>
                    <DatePickerWrapper>
                        <Typography>Set date interval (date order is irrevelant) </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StyledDatePicker
                                defaultValue={dayjs()}
                                onChange={(date) => setBeginDate(date?.toISOString() || todayDate)}
                                label={"Choose threshold"} />
                            <StyledDatePicker
                                defaultValue={dayjs()}
                                onChange={(date) => setEndDate(date?.toISOString() || todayDate)}
                                label={"Choose threshold"} />
                        </LocalizationProvider>
                    </DatePickerWrapper>
                    <SearchButton
                        onClick={fetchData}
                        variant="contained"
                        endIcon={<SearchIcon />}
                        sx={{ backgroundColor: "darkblue" }}
                    >Search</SearchButton>
                </InputWrapper>

                {loading && <StyledCircProgress />}


                {(flattenedAsteroids.length == 0) ? (
                    <NoDataInfo>No data to display.</NoDataInfo>
                ) : (

                    <DataWrapper>
                        <DataGrid sx={{ backgroundColor: 'lightgray' }} columns={columns} rows={flattenedAsteroids} />
                        <TopDiameterChart asteroids={flattenedAsteroids} />
                        <VelocityLunarChart asteroids={flattenedAsteroids} />
                        <HazardousProportionChart asteroids={flattenedAsteroids} />
                    </DataWrapper>
                )}
            </PageWrapper>
        </>
    );
}

const PageWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    margin: '8px 16px',

    [theme.breakpoints.up('lg')]: {
        maxWidth: '1200px',
        margin: 'auto',
        marginTop: '2em'
    }
}));

const PageTitle = styled(Box)(() => ({
    backgroundColor: 'darkblue',
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const InputWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        gap: '1em',
        width: '100%'
    },

    [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
        gap: '2em',
    },

}));

const DatePickerWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
    padding: '0.5em',
    borderRadius: '5px',

    [theme.breakpoints.up('md')]: {
        flex: 4
    },


}));

const SearchButton = styled(Button)(() => ({
    flex: 1,
}))

const StyledDatePicker = styled(DatePicker)(() => ({
    borderRadius: '5px',
    borderWidth: '20px',
    flex: 3,
}))


const StyledCircProgress = styled(CircularProgress)(() => ({
    margin: '1.5em',
    alignSelf: 'center',
    color: 'purple'
}))

const NoDataInfo = styled(Typography)(() => ({
    backgroundColor: 'lightgray',
    borderRadius: '5px',
    padding: '1em',
    textAlign: 'center'
}));

const DataWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '3em'

}));