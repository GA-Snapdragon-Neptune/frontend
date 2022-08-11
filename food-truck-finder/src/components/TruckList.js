import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Map from './Map'
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'
import Rating from '@mui/material/Rating';

const TruckList = () => {
    const [foodTruckList, setFoodTruckList] = useState([])
 

    useEffect(() => {
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/`)
            .then((res) => {
                setFoodTruckList(res.data)
            
            })
    }, []);

    
    return (
        <div>
            <nav className='bg-[#7ed957] flex justify-between items-center h-12 w-screen mx-auto px-2 text-black shadow-md z-50'>
                <Link to='/'><BiArrowBack className='text-3xl' /></Link>

                <Link to='/foodtrucks' className='font-extrabold text-xl'>GRUBTRUCK</Link>
                <Link to='/user'><BiUserCircle className='text-3xl' /></Link>
            </nav>

            <div className='flex justify-between overflow-auto'>
            {foodTruckList.map((foodtruck) => (
                    <Link to={foodtruck._id} key={foodtruck._id}>
                    <div className='bg-white my-5 mx-5 border rounded-lg shadow-md hover:scale-105 w-44 h-28 px-3 pt-2 mb-3'>
                        <h1 className='font-semibold leading-tight'>{foodtruck.name}</h1>
                        <p className='text-xs'>{foodtruck.location}</p>
                        <Rating name="read-only" value={foodtruck.ratings.reduce((a,b) => a+b,0)/foodtruck.ratings.length} readOnly />
                    </div>
                    </Link>
                
            ))}
        </div>
            
            <div>
                <Map 
                    className='z-0' />
            </div>
        </div>
    );
};

export default TruckList;
