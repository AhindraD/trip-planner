import React from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let goTo = useNavigate();
    return (
        <div className="home-cont">
            <h1>Welcome to Trip PLanner</h1>
            <button className='login-home' onClick={() => goTo('/login')}>Login</button>
            <button className='signup-home' onClick={() => goTo('/signup')} > Sign Up</button>
        </div >
    )
}