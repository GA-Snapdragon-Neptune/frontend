import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import AddFoodTruck from './AddFoodTruck';
import FoodTruck from './FoodTruck';
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'

//use this laterrrrr for map
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";


const TruckList = () => {
    const [foodTruckList, setFoodTruckList] = useState([])

    useEffect(() => {
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/`)
            .then((res) => {
                setFoodTruckList(res.data)
            })
    }, []);

    //this is for the map later
    const addresses = [{}]

    foodTruckList.map((foodtruck) => {
        addresses.push(foodtruck.location)
        // console.log(addresses)
    })


    return (
        <div className='bg-[]'>
            <nav className='flex justify-between items-center h-16 max-w-[1240px] mx-auto px-2 text-black bg-white'>
                <Link to='/'><BiArrowBack className='text-3xl' /></Link>
                <p><BiUserCircle className='text-3xl'/></p>
            </nav>
            this page will display the map with food truck locations with card components for each food truck
            <AddFoodTruck />
            {foodTruckList.map((foodtruck) => (
                <div key={foodtruck._id} className='my-5 mx-10'>
                    <Link to={foodtruck._id} className='underline'>{foodtruck.name}</Link>
                    <p className='text-sm'>{foodtruck.location}</p>
                </div>
            ))}
        </div>
    );
};

export default TruckList;