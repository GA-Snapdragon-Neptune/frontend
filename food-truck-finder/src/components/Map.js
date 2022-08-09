import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';
import axios
  from 'axios';
import Locate from './Locate';

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

const Map = ({ addressesArr }) => {

    const [libraries] = useState(['places']);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })
    
    const [markers, setMarkers] = useState([])

    const getCoordinates = useCallback(() => {
        addressesArr.map((address) => {
          return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then((res) => {
              const { lat, lng } = res.data.results[0].geometry.location
                setMarkers(current => [...current, { lat, lng }])
            })
          })
    }, [addressesArr]);
    
    useEffect(() => {
        getCoordinates()
    }, [getCoordinates])

   

      if (loadError) return "Error loading maps";
      if (!isLoaded) return "Loading Maps!"
      
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
            >
 
                {markers.map((marker, index) => (
                    <MarkerF
                        key={index}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: '/Grubtruck (1).svg',
                            origin: new window.google.maps.Point(30, 30),
                            anchor: new window.google.maps.Point(40, 20),
                            scaledSize: new window.google.maps.Size(150, 150),
                        }}
                    />
                ))}

            </GoogleMap> 

        </div>
    );
  };
  
  export default Map;