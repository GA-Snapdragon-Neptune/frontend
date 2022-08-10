import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import Locate from './Locate';

  const mapContainerStyle = {
    width: '100vw',
    height: '75vh'
  }

  const center = {
    lat: 30.266666,
    lng: -97.733330
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }

const Map = ({ foodTruckList }) => {

    const [libraries] = useState(['places']);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })
    
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState([])

  
  //parse the addresses into coordinates to display on the map
  const getCoordinates =
  useCallback(() => {
    foodTruckList.map((foodtruck) => {
        const coordinates = {
              address: foodtruck.location
            }
            getGeocode(coordinates)
            .then((results) => {
              const { lat, lng } = getLatLng(results[0]);
      setMarkers(current => [...current, { name: foodtruck.name, address: foodtruck.location, id: foodtruck._id, lat, lng }])
        })
      })
  }, [foodTruckList]);

  useEffect(() => {
      getCoordinates()
    }, [getCoordinates])

 
  //a reference to the map instance
  //accessible anywhere in code - state is to rerender, ref is to use state without re rendering
  const mapRef = useRef()
  //when map loads, assign map to useRef without re-renders
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])


  //function to pan map to search input
  //useCallback so react only creates one function
  const panTo = useCallback(({ lat, lng }) => {
    //access googlemap ref
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(13)
  }, [])

      if (loadError) return "Error loading maps";
      if (!isLoaded) return "Loading Maps!"
      
    return (
      <div className='static flex flex-col items-center'>
          <Locate panTo={panTo} />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onLoad={onMapLoad}
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
                    onClick={() => {
                      setSelected(marker)
                      
                  }}
                    />
                ))}
          
            {selected ? (
            <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
            setSelected(null)
          }}>
              <div>
                <Link to={`/foodtrucks/${selected.id}`} className='font-bold underline cursor-pointer'>{selected.name}</Link>
                <p>{selected.address}</p>
            </div>
          </InfoWindow>
          ) : null }

        </GoogleMap> 

        </div>
    );
  }
  
  export default Map;