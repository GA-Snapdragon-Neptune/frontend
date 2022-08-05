import React, { useState, useEffect } from 'react';
import Reviews from './Reviews';
import Menu from './Menu'
import './foodtruck.css'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodTruck = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [foodTruck, setFoodTruck] = useState({})

    useEffect(() => {
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setFoodTruck(res.data)
            })
    }, [id]);
    
    const handleDelete = () => {
		axios.delete(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
			.then((res) => {
			console.log(`${res.data} was deleted`)
		})
		navigate('/foodtrucks');
    };

    const handleSubmit = (event) => {
		event.preventDefault();
		axios.put(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`, foodTruck)
		.then((res) => navigate(`/`))
	};


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


    //set state of checkdelete button to false
    //when click 1st delete button, set checkdelete state to true which will render checkdelete confirmation modal
    //on click confirm: call handledelete and navigate to food trucks page

    const [checkDelete, setCheckDelete] = useState(false)

    const checkForDelete = () => {
        setCheckDelete(true)
    }

    const exitDelete = () => {
        setCheckDelete(false)
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
                <div>
                    <button>edit foodtruck</button>
                    <button onClick={checkForDelete}>delete foodtruck</button>
                    
                    {checkDelete ? <div>
                        Are you sure you want to delete {foodTruck.name}?
                        <button onClick={handleDelete}>confirm</button>
                        <button onClick={exitDelete}>exit</button>
                    </div> : null}

                </div>
                <hr></hr>
                <div>
                    <button onClick={showMenu}>Menu</button>
                    <button onClick={showReviews}>Reviews</button>
                </div>

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