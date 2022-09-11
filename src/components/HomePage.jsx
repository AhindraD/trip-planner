import React from 'react';
import { useContext, useEffect, useState } from "react";
import { useNavigate, Route, Routes } from 'react-router-dom';
import UserContext from "../Contexts/UserContext";

import Profile from './Profile';
import Planning from './Planning';
import Trips from './Trips';
import Modify from './Modify'
import NewTrip from './NewTrip'

export default function HomePage() {
    let [loading, setLoading] = useState(true);

    let { tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID } = useContext(UserContext);
    let goTo = useNavigate();

    useEffect(() => {
        if (user === null) {
            setUser(() => JSON.parse(localStorage.getItem("userTrips")))
        }
        setLoading(() => false);
    }, [])




    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    <div className='display-cont'>
                        <div className="nav-bar" >
                            <p className="title">Trip<b>PLanner</b></p>
                            <button onClick={() => goTo("/homepage/")} className="home" >Profile</button>
                            <button onClick={() => goTo("/homepage/trips")} className="my-interest" >My Trips</button>
                            <button onClick={() => goTo("/homepage/planning")} className="my-Ad" >Plan Trip</button>
                            <button onClick={() => goTo("/homepage/modify")} className="sold" >Modify Trip</button>
                            <div className="user-name">
                                {user.userName}</div>
                        </div>

                        <div className='ad-cont'>
                            <Routes>
                                <Route path='/' element={<Profile />} />
                                <Route path='/planning' element={<Planning />} />
                                <Route path='/trips' element={<Trips />} />
                                <Route path='/trips/:id' element={<Modify />} />
                                <Route path='/modify' element={<Modify />} />
                                {/* <Route path='/trips/add' element={<NewTrip />} /> */}
                            </Routes>
                        </div>
                    </div>
            }
        </>
    )
}
