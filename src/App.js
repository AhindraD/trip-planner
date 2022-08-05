import './App.css';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

import { } from './slices/TripSlice'
import { Provider } from "react-redux";
import store from "./store";

function App() {
  let trips = useSelector(state => state.trips);
  const dispatchREDUX = useDispatch();

  return (
    <Provider store={store}>
      <div className="App">

      </div>
    </Provider>
  );
}

export default App;
