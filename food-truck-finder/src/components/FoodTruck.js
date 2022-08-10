import React, { useState, useEffect, useRef } from 'react';
import Reviews from './Reviews';
import Menu from './Menu'
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import pinkfoodtruck from '../assets/pinkfoodtruck.jpg'
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import './foodtruck.css'

const FoodTruck = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [foodTruck, setFoodTruck] = useState({})
    //check if the user is food truck owner, then render food truck settings
    // const [isOwner, setIsOwner] = useState(false)
    let avgRating = useRef(null)
    const [rating, setRating] = useState(avgRating.current);

    //get all food truck data, only renders when [id] has changed
    useEffect(() => {
		axios.get(`http://localhost:8000/foodtrucks/${id}`)
            .then((res) => {
                setFoodTruck(res.data)
                avgRating.current = res.data.ratings.reduce((a,b) => a+b,0)/res.data.ratings.length;
                setRating(avgRating.current)
            })
    }, [id]);
    
    //delete a foodtruck, navigate back to food trucks list
    const handleDelete = () => {
        axios({
            method: 'delete',
            url:`http://localhost:8000/foodtrucks/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
            .then((res) => {
            console.log(`${res.data} was deleted`)
        })
		navigate('/foodtrucks');
    };

    const [edit, setEdit] = useState(false)
    //edit a food truck, set Edit state to false
    const handleEdit = (event) => {
		event.preventDefault();
        axios({
            method: 'put',
            url: `http://localhost:8000/foodtrucks/${id}`, 
            data: foodTruck,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
            .then((res) => {
                setEdit(false)
            })
    };
    
    //set edit state to true when clicking edit button
    const editFoodTruck = (e) => {
        e.preventDefault()
        setEdit(true)
    }

    //setfoodtruck state to new input on value change
    const handleChange = (event) => {
		setFoodTruck({ ...foodTruck, [event.target.id]: event.target.value });
	};


    //toggle between showing menu and showing reviews
    const [menu, setMenu] = useState(true)
    const [reviews, setReviews] = useState(false)
    
    function showMenu() {
        setMenu(true)
        setReviews(false)
    }

    function showReviews() {
        setMenu(false)
        setReviews(true)
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
        <div className='h-full w-full'>
            
            <nav className='bg-white flex justify-between items-center h-14 w-screen mx-auto px-2 text-black shadow-md z-50'>
                <Link to='/foodtrucks'><BiArrowBack className='text-3xl' /></Link>

                <p className='font-extrabold text-xl'>GRUBTRUCK</p>

                <Link to='/user'><BiUserCircle className='text-3xl' /></Link>
            </nav>
        
        <div className='flex flex-col items-center md:flex-row'>
            <div className='max-w-[800px] w-full h-60 mx-auto text-center flex flex-col justify-center text-black '>
                <img src={pinkfoodtruck} alt='pink food truck' className='mx-auto -z-10' />
            </div>

                <div className='bg-white md:mt-20 mt-[-2rem] max-w-xl h-auto z-20 rounded-3xl shadow-xl pb-20'>
                
                {!edit && !(foodTruck.owner === localStorage.getItem('id')) ? 
                    <div className='px-4 py-4'>
                        <h1 className='text-3xl font-bold'>{foodTruck.name}</h1>
                        <ul className='text-md'>
                            <li>{foodTruck.location}</li>
                            <Typography component="legend">Star Rating:</Typography>
                            <Rating name="read-only" value={rating} readOnly />
                            <li>hours:</li> 
                        </ul>
                    </div>
                : 
                    <form onSubmit={handleEdit}>
                        <h1><input
                            type='text'
                            id='name'
                            placeholder={foodTruck.name}
                            onChange={handleChange} /></h1>
                        <ul>
                            <li><input
                                type='text'
                                id='location'
                                placeholder={foodTruck.location}
                                onChange={handleChange} /></li>
                            <Typography component="legend">Star Rating:</Typography>
                            <Rating name="read-only" value={rating} readOnly />
                            <li>hours:</li>
                        </ul>
                        <button>Submit changes</button>
                    </form>

                    }
                    
                <div>

                    {(foodTruck.owner === localStorage.getItem('id')) ?
                        <div>
                            <button onClick={editFoodTruck}>edit foodtruck</button>
                            <button onClick={checkForDelete}>delete foodtruck</button>
                        </div> : null}
                    
                    {checkDelete ? <div>
                        Are you sure you want to delete {foodTruck.name}?
                        <button onClick={handleDelete}>confirm</button>
                        <button onClick={exitDelete}>exit</button>
                    </div> : null}

                </div>
                <hr></hr>
                <div className='flex justify-evenly text-l font-semibold pt-2 pb-4'>
                    <button onClick={showMenu}>Menu</button>
                    <button onClick={showReviews}>Reviews</button>
                </div>

                    {menu ? <Menu /> : <Reviews /> } 
                
                </div>
            </div>
        </div>
    );
};

export default FoodTruck;