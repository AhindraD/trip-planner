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
import { collection, getDoc, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import HomePage from './components/HomePage';

function App() {
  //let trips = useSelector(state => state.trips);
  const dispatchREDUX = useDispatch();
  let [token, setToken] = useState("pk.eyJ1IjoiYWhpbmRyYSIsImEiOiJjbDd4aDZxN2Ewdm9xM3JvNjQyc28zNXRvIn0.9jrs6FAqdsKVmOzRdgmnbA");
  let [user, setUser] = useState(null);
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
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user);
        let userId = email.replaceAll('.', '_dot_');
        setUserID(() => userId);
        const docRef = doc(db, "Users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(() => docSnap.data());
          setTripsUp(() => docSnap.data().UpcomingTrips);
          setTripsComp(() => docSnap.data().CompletedTrips);
          setTripsCan(() => docSnap.data().CancelledTrips);
          setUsername(() => docSnap.data().userName);

          localStorage.setItem("userTrips", JSON.stringify(docSnap.data()));
          //console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        navigate('/homepage');
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
          UpcomingTrips: [],
          CompletedTrips: [],
          CancelledTrips: [],
        }
        // Storing user to FireBase Data
        //console.log(user);
        setDoc(doc(db, "Users", userId), userObj);
        //const docRef = await addDoc(collection(db, "Users"), userObj);
        //userObj.id = docRef.id;
        setUser(() => userObj);
        localStorage.setItem("userTrips", JSON.stringify(userObj));
        navigate('/homepage');
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

  async function fetchTrips(id) {
    try {
      const userRef = doc(db, "Users", id);
      const response = await getDoc(userRef);
      if (response.exists()) {
        return response.data();
      } else {
        return null;
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
      return null;
    }
  };

  async function addTrips(id, tripsArr, status) {

    try {
      const userRef = doc(db, "Users", id);

      if (status === "Upcoming") {
        await updateDoc(userRef, {
          UpcomingTrips: tripsArr,
        });
      }
      else if (status === "Completed") {
        await updateDoc(userRef, {
          CompletedTrips: tripsArr,
        });
      } else if (status === "Cancelled") {
        await updateDoc(userRef, {
          CancelledTrips: tripsArr,
        });
      }

      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
      return null;
    }
  };


  return (
    <UserContext.Provider value={{ tripsUp, setTripsUp, tripsComp, setTripsComp, tripsCan, setTripsCan, email, setEmail, user, logOut, setUser, logInEmail, signUpEmail, password, setPassword, username, setUsername, userID, setUserID, token, fetchTrips, addTrips }}>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={<Login setEmail={setEmail} setPassword={setPassword} logInEmail={logInEmail} signUpEmail={signUpEmail} logOut={logOut} />} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/homepage/*' element={<HomePage />} />
          {/* <Route path='/homepage/profile' element={<Profile />} /> */}
          {/* <Route path='/homepage/planning' element={<Planning />} />
          <Route path='/homepage/trips' element={<Trips />} />
          <Route path='/homepage/trips/:tripID' element={<Modify />} /> */}
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
