import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Map from './Map'
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'
import { LoadScript } from '@react-google-maps/api';
import AddFoodTruck from './AddFoodTruck';

const TruckList = () => {
    const [foodTruckList, setFoodTruckList] = useState([])
 

    useEffect(() => {
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/`)
            .then((res) => {
                setFoodTruckList(res.data)
            })
    }, []);

    const addressesArr = foodTruckList.map((foodtruck) => {
        return foodtruck.location
    })

    return (
        <div className='bg-[]'>
            <nav className='flex justify-between items-center h-16 max-w-[1240px] mx-auto px-2 text-black bg-white shadow-md'>
                <Link to='/'><BiArrowBack className='text-3xl' /></Link>
                <p><BiUserCircle className='text-3xl'/></p>
            </nav>

            {/* <AddFoodTruck /> */}

            <div className='flex justify-between overflow-auto'>
            {foodTruckList.map((foodtruck) => (
                    <Link to={foodtruck._id} key={foodtruck._id} >
                        <div className='my-5 mx-5 border rounded-lg shadow-md hover:scale-105 w-44 p-5'>
                        <h1 className='font-semibold'>{foodtruck.name}</h1>
                        <p className='text-xs'>{foodtruck.location}</p>
                    </div>
                    </Link>
                
            ))}
        </div>
            
            <div>
                <Map addressesArr={addressesArr} />
            </div>
        </div>
    );
};

export default TruckList;