import React, { useState } from "react";
import axios from "axios";
import Rating from '@mui/material/Rating';


const AddReview = ({id, changeCount, setChangeCount}) => {
    const [rating, setRating] = useState(5);
    const initialReviewState = {
        title: '',
        body: '',
        author: localStorage.getItem('id'),
        foodTruckId: id
    }
    const [myReview, setMyReview] = useState(initialReviewState)
    const handleChange = (e) => {
        setMyReview({...myReview, [e.target.id]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
		axios({
            method: 'post',
            url:`https://young-anchorage-22001.herokuapp.com/reviews`, 
            data: myReview,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(() => {
            setChangeCount(changeCount + 1)
        })
        axios({
            method: 'put',
            url:`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}/rating`,
            data: {rating: rating}
        })
        .catch((err) => {console.log(err)})
        setMyReview(initialReviewState)
	};

    return (
        <form className="flex flex-col border p-5 mb-5">
            <p>leave a review!</p>
                <Rating
                    name="rating-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <label htmlFor="title" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Review Title</label>
                <input 
                    className="border" 
                    id="title"
                    value={myReview.title}
                    onChange={handleChange}>
                </input>
                <label htmlFor="body" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Body</label>
                <textarea
                    type='text'
                    className="border mb-5 h-16"
                    id="body"
                    value={myReview.body}
                    onChange={handleChange}>
                </textarea>
                <button 
                    className="bg-[#7ed957] shadow-lg flex-shrink-0 py-2 px-2 mb-5 border rounded-lg w-1/4" 
                    onClick={handleSubmit}
                    onChange={(e) => setMyReview(e.target.value)}
                >Submit Review</button>
        </form>
    )
}

export default AddReview