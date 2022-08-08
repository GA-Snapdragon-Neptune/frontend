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
    const [markers, setMarkers] = useState([])

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    const coordinates = []

    useEffect(() => {

        addressesArr.map((address) => (
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then((res) => {
                const { lat, lng } = res.data.results[0].geometry.location
                coordinates.push({ lat, lng })
                setMarkers(coordinates)
            })
        ))
        console.log(markers)
    }, []);

    
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps!"

    
    return (
        <div>
            {/* <Locate panTo={panTo} /> */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                // onLoad={onMapLoad}
            >
                
                           
                <MarkerF
                    position={center}
                    icon={{
                        url: '/food-truck.svg',
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                      }}
                />

            </GoogleMap>


        </div>
    );
  };
  
  export default Map;