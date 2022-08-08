import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import axios
  from 'axios';

  const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
  }
  const center = {
    lat: 30.266666,
    lng: -97.733330
  }
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }


const Map = (foodTruckList) => {
    const [ libraries ] = useState(['places']);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps!"
    
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
            ></GoogleMap>
        </div>
    );
  };
  
  export default Map;