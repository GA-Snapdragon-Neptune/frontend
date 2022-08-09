import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './form.css'


const ReviewForm = () => {
    const navigate = useNavigate()
    // const [myReview, setMyReview] = useState('')
    const [myReview, setMyReview] = useState({
        title: '',
        body: '',
        author: '',
        })

        const { foodTruckId } = useParams() 

        const handleChange = (e) => {
            setMyReview({...myReview, [e.target.id]: e.target.value})
        }

    const AddReview = (e) => {
        e.preventDefault();
		//Write your get/fetch here
		axios.post(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${foodTruckId}`, myReview)
            .then(() => {
                console.log(myReview)
                navigate('/foodtrucks')
            })
	};

    return (
            <form className="sign-up">
            <div>
                <label 
                className="form"
                onChange={handleChange}>Leave a Review</label>
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
                onClick={AddReview}
                onChange={(e) => setMyReview(e.target.value)}
                >Submit Review</button>
            </div>
            </form>
    )
}

export default ReviewForm