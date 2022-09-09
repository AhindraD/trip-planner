import './App.css';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import UserContext from './Contexts/UserContext'
import { } from './slices/TripSlice'

import { Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Planning from './components/Planning';
import Trips from './components/Trips';
import Modify from './components/Modify'
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

// import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

function App() {
  //let trips = useSelector(state => state.trips);
  const dispatchREDUX = useDispatch();

  let [user, setUser] = useState({});
  let [username, setUsername] = useState(null);
  let [userID, setUserID] = useState(null);
  let [tripsUp, setTripsUp] = useState([]);
  let [tripsComp, setTripsComp] = useState([]);
  let [tripsCan, setTripsCan] = useState([]);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);

  function logInEmail() {
    //console.log([email, password])
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user);
        let userId = email.replaceAll('.', '_dot_');
        setUserID(() => userId);
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
        let userId = email.replaceAll('.', '_dot_');
        setUserID(() => userId);
        let userObj = {
          userName: username,
          userEmail: email,
          userId: userId,
        }
        // Storing user to FireBase Data
        //console.log(user);
        setDoc(doc(db, "Users", userId), userObj);
        //const docRef = await addDoc(collection(db, "Users"), userObj);
        //userObj.id = docRef.id;
        setUser(() => userObj);
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
    <UserContext.Provider value={{ tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID }}>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={<Login setEmail={setEmail} setPassword={setPassword} logInEmail={logInEmail} signUpEmail={signUpEmail} logOut={logOut} />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/planning' element={<Planning />} />
          <Route path='/trips' element={<Trips />} />
          <Route path='/trips/tripID' element={<Modify />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;