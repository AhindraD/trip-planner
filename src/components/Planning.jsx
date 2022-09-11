import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
    let { tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID, token } = useContext(UserContext);
    let [loading, setLoading] = useState(true);

    let [cats, setCats] = useState([]);
    let [input, setInput] = useState("paris");//place_name


    async function fetchData() {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${token}`
        );
        const data = await response.json();
        setCats(data.features);
    }


    const handleSubmit = async (event) => {

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
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
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
                                    options={cats}
                                    getOptionLabel={(option) => option.place_name.toString()}
                                    sx={{ width: 400 }}
                                    renderInput={(params) => <TextField {...params}
                                        required
                                        fullWidth
                                        id="location"
                                        name="location"
                                        label="Location" />}
                                    onInputChange={(e) => {
                                        setInput(e.target.value);
                                        fetchData();
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
