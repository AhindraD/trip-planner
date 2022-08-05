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

  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);

  function logInEmail() {
    console.log([email, password])
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        navigate('/profile');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  function signUpEmail() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        navigate('/profile');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  function logOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      const errorMessage = error.message;
      alert(errorMessage);
    });
    navigate('/');
  }

  let navigate = useNavigate();




  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login setEmail={setEmail} setPassword={setPassword} logInEmail={logInEmail} signUpEmail={signUpEmail} logOut={logOut} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/planning' element={<Planning />} />
        <Route path='/trips' element={<Trips />} />
        <Route path='/trips/tripID' element={<Modify />} />
      </Routes>
    </div>
  );
}

export default App;
