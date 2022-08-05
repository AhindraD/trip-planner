import './App.css';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

import { } from './slices/TripSlice'

import { Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login';
import Planning from './components/Planning';
import Trips from './components/Trips';
import Modify from './components/Modify'
import { useState } from 'react';

// import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  let trips = useSelector(state => state.trips);
  const dispatchREDUX = useDispatch();

  let [user, setUser] = useState(null);
  let [loginMsg, setLoginMsg] = useState('Login');

  function logInEmail() {
    if (loginMsg === 'Login') {
      createUserWithEmailAndPassword(auth, )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
    else {
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        const errorMessage = error.message;
        alert(errorMessage);
      });
      navigate('/');
    }
  }

  let navigate = useNavigate();




  return (
    <div className="App">
      {/* <div className="head">
        <div className="title1" onClick={() => { navigate('/') }}
        >Trip Planner</div>

        {user !== null ?
          <div className='user-preview'>
            <img src={user.userPicture} alt="" className="user-img" />
            <p className="user-name">{user.userName}</p>
          </div> : null}

        <button className="login1" onClick={() => {
          logInEmail();
        }}>{loginMsg}</button>
      </div> */}

      {/* <div className="mid"> */}
        <Routes>
          <Route path='/' element={<Login logInEmail={logInEmail} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/planning' element={<Planning />} />
          <Route path='/trips' element={<Trips />} />
          <Route path='/trips/tripID' element={<Modify />} />
        </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
