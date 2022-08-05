import React, { useState, useEffect } from 'react';
import Reviews from './Reviews';
import Menu from './Menu'
import './foodtruck.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FoodTruck = () => {

    const { id } = useParams()
    const [foodTruck, setFoodTruck] = useState({})

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setFoodTruck(res.data)
            })
	}, [id]);

    const [menu, setMenu] = useState(true)
    const [reviews, setReviews] = useState(false)

    function showReviews() {
        setMenu(false)
        setReviews(true)
    }
    
    function showMenu() {
        setMenu(true)
        setReviews(false)
    }
    
    return (
        <div>

            <div>Food truck images carousel</div>
                <div className='food-truck-container'>
                
                    <h1>{foodTruck.name}</h1>
                    <ul className='food-truck-info'>
                        <li>{foodTruck.location}</li>
                        <li>star rating:</li>
                        <li>hours:</li>
                    </ul>

                    <button onClick={showMenu}>Menu</button>
                    <button onClick={showReviews}>Reviews</button>

                    {menu ?
                        <div>
                        <Menu />
                        </div>
                        :
                        <div>
                            <Reviews />
                        </div>} 
                
                </div>
        </div>
    );
};

export default FoodTruck;