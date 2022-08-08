import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './form.css'
import ReviewFood from "./reviewFood";
import Reviews from "./Reviews";

const ReviewForm = () => {
    
    const { id } = useParams()
    const [myForm, setMyForm] = useState(' ')

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setMyForm(res.data.review)
            })
	}, [id]);

    const [yourReview, setYourReview] = useState(true)
    const [yourFeed, setYourFeed] = useState(false)
    
    function yourReviews() {
        setYourReview(false)
        setYourFeed(true)
    }
    return (
            <form className="sign-up">
            <div>
                <label 
                className="form">Leave a Review</label>
            </div>
                <input 
                className="form-box" 
                type="text"
                placeholder="Write your review">
                </input>
            <div>
                <button 
                className="submit-button" 
                type="submit"
                onClick={yourReviews}>Submit Review</button>
                <ReviewFood />
                <Reviews />
            </div>
            </form>
    )
}

export default ReviewForm