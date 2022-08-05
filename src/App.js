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

function App() {
  let trips = useSelector(state => state.trips);
  const dispatchREDUX = useDispatch();

  let navigate = useNavigate();
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <div className="head">
          <div className="title1" onClick={() => { navigate('/') }}
          >Trip Planner</div>

          {user !== null ?
            <div className='user-preview'>
              <img src={user.userPicture} alt="" className="user-img" />
              <p className="user-name">{user.userName}</p>
            </div> : null}

          <button className="login1" onClick={() => {
            logInGoogle();
          }}>{loginMsg}</button>
        </div>
*/}
      <div className="mid">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/planning' element={<Planning />} />
          <Route path='/trips' element={<Trips />} />
          <Route path='/trips/tripID' element={<Modify />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
