import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './form.css'


const AddReview = ({id}) => {
    const navigate = useNavigate()
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
        setMyReview(initialReviewState)
        
	};

    return (
            <form className="sign-up">
            <div>
                <label htmlFor="title">title</label>
                <input 
                    className="title-box" 
                    placeholder="Review Title"
                    id="title"
                    value={myReview.title}
                    onChange={handleChange}>
                </input>
                <label htmlFor="body">body</label>
                <input 
                    className="body-box"
                    placeholder="Review Content"
                    id="body"
                    value={myReview.body}
                    onChange={handleChange}>
                </input>
            </div>
            <div>
                <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    onChange={(e) => setMyReview(e.target.value)}
                >Submit Review</button>
            </div>
            </form>
    )
}

export default AddReview