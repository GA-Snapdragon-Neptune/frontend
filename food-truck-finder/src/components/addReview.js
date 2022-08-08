import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './form.css'
import ReviewFood from "./reviewFood";
import Reviews from "./Reviews";

const ReviewForm = () => {
    const navigate = useNavigate()
    const [myReview, setMyReview] = useState('')

    // const handleChange = (event) => {
    //     setMyForm(event.target.value)
    // }

    const addReview = () => {
		//Write your get/fetch here
		axios.post(`https://young-anchorage-22001.herokuapp.com/reviews`, data)
            .then(() => {
                navigate('/reviews')
            })
	};

    return (
            <form className="sign-up">
            <div>
                <label 
                className="form">Leave a Review</label>
            </div>
                <input 
                className="form-box" 
                type="text"
                placeholder="Write your review"
                onChange={(e) => setMyReview(e.target.value)}>
                </input>
            <div>
                <button 
                className="submit-button" 
                onClick={addReview}
                >Submit Review</button>
            </div>
            </form>
    )
}

export default ReviewForm