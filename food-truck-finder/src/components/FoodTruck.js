import React, { useState, useEffect, useRef } from 'react';
import Reviews from './Reviews';
import Menu from './Menu'
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import pinkfoodtruck from '../assets/pinkfoodtruck.jpg'
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const FoodTruck = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [foodTruck, setFoodTruck] = useState({})


    let avgRating = useRef(null)
    const [rating, setRating] = useState(avgRating.current);


    //get all food truck data, only renders when [id] has changed
    useEffect(() => {
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
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
            url:`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`,
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
            url: `https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`, 
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

    const exitEdit = () => {
        setEdit(!edit)
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
        setCheckDelete(!checkDelete)
    }

    const exitDelete = () => {
        setCheckDelete(!checkDelete)
    }
    

    return (
        <div className='h-full w-full'>
            
            <nav className='bg-[#7ed957] flex justify-between items-center h-12 w-screen mx-auto px-2 text-black shadow-md z-50'>
                <Link to='/foodtrucks'><BiArrowBack className='text-3xl' /></Link>

                <Link to='/foodtrucks' className='font-extrabold text-xl'>GRUBTRUCK</Link>

                <Link to='/user'><BiUserCircle className='text-3xl' /></Link>
            </nav>
        
        <div className='flex flex-col items-center md:flex-row'>
            <div className='max-w-[800px] w-full h-60 mx-auto text-center flex flex-col justify-center text-black '>
                <img src={pinkfoodtruck} alt='pink food truck' className='mx-auto -z-10' />
            </div>

            {/* md:mt-20 mt-[-2rem] max-w-xl md:w-full h-auto  */}
                <div className='bg-white z-20 rounded-3xl shadow-xl pb-20 pt-5 px-3 md:px-5 w-full md:mt-10 h-screen'>
                
                {!edit && !(foodTruck.owner === localStorage.getItem('id')) ? 
                    <div className='px-4 py-4'>
                        <h1 className='text-3xl font-bold text-[#7ed957]'>{foodTruck.name}</h1>
                        <ul className='text-md'>
                                <li>{foodTruck.location}</li>
                                <li>555-555-5555</li>
                            <Typography component="legend"></Typography>
                            <Rating name="read-only" value={rating} readOnly />
                            {/* <li>hours:</li>  */}
                        </ul>
                    </div>
                : 

                    <form onSubmit={handleEdit}>
                            <h1>
                            <label htmlFor='name' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0'>Edit name</label>
                                <input
                            className='border'
                            type='text'
                            id='name'
                            placeholder={foodTruck.name}
                            onChange={handleChange} /></h1>
                        <ul>
                                <li>
                                <label htmlFor='location' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0 mt-2'>Edit Address</label>
                                    <input
                                        className='border'
                                type='text'
                                id='location'
                                placeholder={foodTruck.location}
                                onChange={handleChange} /></li>
                            <li>star rating:</li>
                            {/* <li>hours:</li> */}
                        </ul>
                        <button className='flex-shrink-0 bg-[#7ed957] hover:bg-teal-700 text-sm py-1 px-2 rounded' onClick={() => setEdit(false)}>Submit changes</button>
                    </form>

                    }
                    
                <div>

                    {(foodTruck.owner === localStorage.getItem('id')) ?
                        <div className='my-5'>
                            {/* <button onClick={editFoodTruck} className='flex-shrink-0 bg-black text-sm  text-white py-1 px-2 mx-5 rounded'>edit foodtruck</button> */}
                            <button onClick={checkForDelete} className='flex-shrink-0 bg-black text-sm  text-white py-1 px-2 rounded'>delete foodtruck</button>
                        </div> : null}
                    
                    {checkDelete ? <div>
                        <p className='text-md font-bold italic mt-5 mx-5'>Are you sure you want to delete {foodTruck.name}?</p>
                        <button onClick={handleDelete} className='flex-shrink-0 bg-red-500 hover:bg-red-700 text-sm  text-white py-1 px-2 rounded mx-5'>confirm delete</button>
                        <button onClick={exitDelete} className='flex-shrink-0 bg-black hover:bg-teal-700 text-sm  text-white py-1 px-3 my-5 rounded'>exit</button>
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