import React, { useState, useEffect } from 'react';
import Reviews from './Reviews';
import Menu from './Menu'
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import pinkfoodtruck from '../assets/pinkfoodtruck.jpg'
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'

import './foodtruck.css'

const FoodTruck = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const [foodTruck, setFoodTruck] = useState({})

    //get all food truck data, only renders when [id] has changed
    useEffect(() => {
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setFoodTruck(res.data)
            })
    }, [id]);
    
    //delete a foodtruck, navigate back to food trucks list
    const handleDelete = () => {
		axios.delete(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
			.then((res) => {
			console.log(`${res.data} was deleted`)
		})
		navigate('/foodtrucks');
    };


    //check if the user is food truck owner, then render food truck settings
    const [isOwner, setIsOwner] = useState(false)


    const [edit, setEdit] = useState(false)
    //edit a food truck, set Edit state to false
    const handleEdit = (event) => {
		event.preventDefault();
        axios.put(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`, foodTruck)
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
            <nav className='flex justify-between items-center h-16 max-w-[1240px] mx-auto px-2 text-black bg-white'>
                <Link to='/foodtrucks'><BiArrowBack className='text-3xl' /></Link>
                <p><BiUserCircle className='text-3xl'/></p>
            </nav>

            <div className='max-w-[800px] w-full h-60 mx-auto text-center flex flex-col justify-center text-black '>
                <img src={pinkfoodtruck} alt='pink food truck' className='w-full h-full md:w-80 mx-auto -z-10' />
            </div>

                <div className='bg-white mt-[-2rem] z-20 rounded-3xl h-full shadow-xl pb-20'>
                
                {!edit && !isOwner ? 
                    <div className='px-4 py-4'>
                        <h1 className='text-3xl font-bold'>{foodTruck.name}</h1>
                        <ul className='text-md'>
                            <li>{foodTruck.location}</li>
                            <li>star rating:</li>
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
                            <li>star rating:</li>
                            <li>hours:</li>
                        </ul>
                        <button>Submit changes</button>
                    </form>

                    }
                    
                <div>

                    {isOwner ?
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
    );
};

export default FoodTruck;