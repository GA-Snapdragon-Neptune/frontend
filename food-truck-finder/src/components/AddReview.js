import React, { useState } from "react";
import axios from "axios";
import './form.css'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const AddReview = ({id}) => {
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
            url:`http://localhost:8000/reviews`, 
            data: myReview,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(() => {
            // navigate(`/foodtrucks/${id}`)
        })
        axios({
            method: 'put',
            url:`http://localhost:8000/foodtrucks/${id}/rating`,
            data: {rating: rating}
        })
        .then((res)=> {
            console.log(res)
        })
            setMyReview(initialReviewState)
	};

    return (
            <form className="flex flex-col">
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="rating-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <label htmlFor="title">Review Title</label>
                <input 
                    className="title-box" 
                    placeholder="Review Title"
                    id="title"
                    value={myReview.title}
                    onChange={handleChange}>
                </input>
                <label htmlFor="body">Body</label>
                <input 
                    className="body-box"
                    placeholder="Review Content"
                    id="body"
                    value={myReview.body}
                    onChange={handleChange}>
                </input>
                <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    onChange={(e) => setMyReview(e.target.value)}
                >Submit Review</button>
        </form>
    )
}

export default AddReview