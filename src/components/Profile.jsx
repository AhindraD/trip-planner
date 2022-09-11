import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    let { tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID, token, fetchTrips, addTrips } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    const goTo = useNavigate();
    // const searchLoc = async (input) => {
    //     const response = await fetch(
    //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${token}`
    //     );
    //     const data = await response.json();
    //     setList(data.features);
    // };
    useEffect(() => {
        if (user === null) {
            setUser(() => JSON.parse(localStorage.getItem("userTrips")))
        }
        async function getData() {
            const fetch = await fetchTrips(user.userId);
            //console.log(fetch.UpcomingTrips)
            setTripsUp(() => fetch.UpcomingTrips)
            setTripsComp(() => fetch.CompletedTrips)
            setTripsCan(() => fetch.CancelledTrips)
            setLoading(() => false);
        }
        getData();
    }, [])

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


    return (
        <>
            {loading ? <h1>Loading...</h1> :
                <div className='prof'>
                    <h1>Welcome to Trip PLanner, <b>{user.userName}</b></h1>
                    <br />
                    <h2 className='sesc'>Upcoming Trips: </h2>
                    <div className="trips-cont">
                        {tripsUp.map((elem, indx) => {
                            if (elem != "") {
                                return <div className="trip-ind" key={elem.id}>
                                    <p>Title: <b>{elem.title}</b></p>
                                    <p>Description: <b>{elem.desc}</b></p>
                                    <p>Locations: <b>{elem.locations.map((e) => e)}</b></p>
                                    <p>Start: <b>{elem.start}</b></p>
                                    <p>End: <b>{elem.end}</b></p>
                                    <button className='update' onClick={() => goTo(`/trips/:${indx}=up`)}>Update</button>
                                </div>
                            }
                        })}
                    </div>
                </div>
            }
        </>
    )
}
