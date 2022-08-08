import './App.css';
import TruckList from './components/TruckList';
import FoodTruck from './components/FoodTruck'
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route, Link } from 'react-router-dom';
import AddFoodTruck from './components/AddFoodTruck';


import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import axios
  from 'axios';



function App() {

  //create nav and links with react router
  //'/' to home/login in page
  //'/signup' for new user
  //'/signin' for existing user
  //'/foodtrucks' to map link with nearest food trucks rendered
  //'/foodtrucks/:id' to individual food truck site


  return (
    <div>
      <Routes>
      {/* <Route path='/' element={<Map />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/foodtrucks' element={<TruckList />} />
				<Route path='/foodtrucks/:id' element={<FoodTruck />} />
			</Routes>
    </div>
  );
}

//   const mapContainerStyle = {
//     width: '100vw',
//     height: '100vh'
//   }
//   const center = {
//     lat: 30.266666,
//     lng: -97.733330
//   }


// const Map = () => {
//     const [ libraries ] = useState(['places']);

//     const {isLoaded, loadError} = useLoadScript({
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//         libraries
//     })

//     if (loadError) return "Error loading maps";
//     if (!isLoaded) return "Loading Maps!"
    
//     return (
//         <div>
//             <GoogleMap
//                 mapContainerStyle={mapContainerStyle}
//                 zoom={8}
//                 center={center}
//             ></GoogleMap>
//         </div>
//     );
//   };
  
  // export default Map;

export default App;
