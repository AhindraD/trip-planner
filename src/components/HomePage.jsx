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
    let [loading, setLoading] = useState(false);

    let { tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID } = useContext(UserContext);
    let goTo = useNavigate();

    useEffect(() => {
        

        return () => {
        }
    }, [])




    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    <div className='display-cont'>
                        <div className="nav-bar" >
                            <p className="title">Trip<b>Planner</b></p>
                            <button onClick={() => goTo("/homepage/")} className="home" >Profile</button>
                            <button onClick={() => goTo("/homepage/planning")} className="my-Ad" >Planning</button>
                            <button onClick={() => goTo("/homepage/trips")} className="my-interest" >Trips</button>
                            <button onClick={() => goTo("/homepage/trips/add")} className="sold" >Add Trip</button>
                            <div className="user-name">
                                {username}</div>
                        </div>

                        <div className='ad-cont'>
                            <Routes>
                                <Route path='/' element={<Profile />} />
                                <Route path='/planning' element={<Planning />} />
                                <Route path='/trips' element={<Trips />} />
                                <Route path='/trips/:tripID' element={<Modify />} />
                                <Route path='/trips/add' element={<NewTrip />} />
                            </Routes>
                        </div>
                    </div>
            }
        </>
    )
}
