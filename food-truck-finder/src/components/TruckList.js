import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Map from './Map'
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'


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
        <div>
            <nav className='flex justify-between items-center h-14 w-screen mx-auto px-2 text-black shadow-md z-50'>
                <Link to='/'><BiArrowBack className='text-3xl' /></Link>

                <p className='font-extrabold text-xl'>GRUBTRUCK</p>
                <Link to='/user'><BiUserCircle className='text-3xl' /></Link>
            </nav>

            <div className='flex justify-between overflow-auto'>
            {foodTruckList.map((foodtruck) => (
                    <Link to={foodtruck._id} key={foodtruck._id} >
                        <div className='bg-white my-5 mx-5 border rounded-lg shadow-md hover:scale-105 w-44 p-5'>
                        <h1 className='font-semibold'>{foodtruck.name}</h1>
                        <p className='text-xs'>{foodtruck.location}</p>
                        <p className='text-xs'>⭐⭐⭐⭐</p>
                    </div>
                    </Link>
                
            ))}
        </div>
            
            <div>
                <Map
                    addressesArr={addressesArr}
                    foodTruckList={foodTruckList}
                    className='z-0' />
            </div>
        </div>
    );
};

export default TruckList;