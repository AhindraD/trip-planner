import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { Input } from '@mui/material';

import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                AhindraD
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


export default function Planning() {
    let { user, logOut, setUser, username, setUsername, userID, setUserID, token, fetchTrips, addTrips } = useContext(UserContext);
    let [loading, setLoading] = useState(true);

    let [cats, setCats] = useState([]);
    let [input, setInput] = useState("paris");//place_name
    let [autoVals, setAutoVals] = useState([]);
    const goTo = useNavigate();

    async function fetchData() {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${token}`
        );
        const data = await response.json();
        setCats(data.features);
    }
    /*
        tripObj = {
            id:,
            title: ,
            desc: ,
            start: start || currDate.toISOString().split('T')[0],
            end: end || start || currDate.toISOString().split('T')[0],
            locations: locations.length > 0 ? locations : ['Unnamed location']
        }
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let newTrip = {
            id: Math.random().toString(32).slice(2, 13),
            title: data.get('title'),
            desc: data.get('desc'),
            start: data.get('start'),
            end: data.get('end'),
            locations: autoVals,
        };
        //console.log(autoVals);
        //console.log("submit");
        const fetch = await fetchTrips(user.userId);
        if (fetch === null) {
            addTrips(user.userId, [newTrip]);
        }
        else {
            let allTrips = fetch.UpcomingTrips;
            if (allTrips.length <= 0) {
                addTrips(user.userId, [newTrip]);
            }
            else {
                allTrips.push(newTrip);
                addTrips(user.userId, allTrips);
            }
        }
        goTo("/homepage/trips");
    };

    useEffect(() => {
        if (user === null) {
            setUser(() => JSON.parse(localStorage.getItem("userTrips")))
        }
        fetchData();
        setLoading(() => false);
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <MapTwoToneIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add New Trip
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Trip Title"
                                    name="title"
                                    autoComplete="Item Title"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="desc"
                                    label="Description"
                                    id="desc"
                                    autoComplete="Description"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="start"
                                    label="Start-Date"
                                    id="start"
                                    type="date"
                                    autoComplete="Date"
                                    focused
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="end"
                                    label="End-Date"
                                    id="end"
                                    type="date"
                                    autoComplete="Date"
                                    focused
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    multiple
                                    limitTags={2}
                                    options={cats}
                                    getOptionLabel={(option) => option.place_name.toString()}
                                    sx={{ width: 400 }}
                                    renderInput={(params) => <TextField {...params}
                                        required
                                        fullWidth
                                        id="locations"
                                        name="locations"
                                        label="Locations" />}
                                    onInputChange={(e) => {
                                        setInput(e.target.value);
                                        fetchData();
                                    }}
                                    onChange={(event, newValue) => {
                                        //console.log(newValue);
                                        setAutoVals(newValue);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Trip
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
