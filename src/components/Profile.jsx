import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

export default function Profile() {
    let { tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID, token } = useContext(UserContext);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            setUser(() => JSON.parse(localStorage.getItem("userTrips")))
        }
        setLoading(() => false);
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
                    <h2>Here are your completed trips:</h2>
                    <div className="trips-cont">
                        {user.CompletedTrips.map((elem) => {
                            <div className="trip-ind" key={elem.id}>
                                <p>Title: {elem.title}</p>
                                <p>Description: {elem.desc}</p>
                                <p>Locations: {elem.locations}</p>
                                <p>Start: {elem.start}</p>
                                <p>End: {elem.end}</p>
                            </div>
                        })}
                    </div>
                </div>
            }
        </>
    )
}
