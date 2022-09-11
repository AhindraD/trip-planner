import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from 'react-router-dom';


export default function Trips() {
    let { tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID, token, fetchTrips, addTrips } = useContext(UserContext);
    let [loading, setLoading] = useState(true);

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


    return (<>
        {loading ? <h1>Loading...</h1> :
            <div className='trips'>
                <p className='sesc'>Upcoming Trips</p>
                <div className="row">
                    {tripsUp.map((elem) => {
                        if (elem != "") {
                            return <div className="trip-ind" key={elem.id}>
                                <p>Title: <b>{elem.title}</b></p>
                                <p>Description: <b>{elem.desc}</b></p>
                                <p>Locations: <b>{elem.locations.map((e) => e.place_name)}</b></p>
                                <p>Start: <b>{elem.start}</b></p>
                                <p>End: <b>{elem.end}</b></p>
                            </div>
                        }
                    })}
                </div>

                <p className='sesc'>Completed Trips</p>
                <div className="row">
                    {tripsComp.map((elem) => {
                        if (elem != "") {
                            return <div className="trip-ind" key={elem.id}>
                                <p>Title: <b>{elem.title}</b></p>
                                <p>Description: <b>{elem.desc}</b></p>
                                <p>Locations: <b>{elem.locations.map((e) => e.place_name)}</b></p>
                                <p>Start: <b>{elem.start}</b></p>
                                <p>End: <b>{elem.end}</b></p>
                            </div>
                        }
                    })}
                </div>

                <p className='sesc'>Cancelled Trips</p>
                <div className="row">
                    {tripsCan.map((elem) => {
                        if (elem != "") {
                            return <div className="trip-ind" key={elem.id}>
                                <p>Title: <b>{elem.title}</b></p>
                                <p>Description: <b>{elem.desc}</b></p>
                                <p>Locations: <b>{elem.locations.map((e) => e.place_name)}</b></p>
                                <p>Start: <b>{elem.start}</b></p>
                                <p>End: <b>{elem.end}</b></p>
                            </div>
                        }
                    })}
                </div>
            </div>
        }
    </>
    )
}
