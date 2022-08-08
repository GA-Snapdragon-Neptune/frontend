import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import './form.css'

const ReviewForm = () => {
    
    const { id } = useParams()
    const [myForm, setMyForm] = useState(' ')

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setMyForm(res.data.reviews)
            })
	}, [id]);

    return (
        // <div className="review-form" onSubmit={handleSubmit}>
            <form
            className='border'>
            <div>
                <label 
                className="form">
                Leave a Review
                </label>
            </div>
                <input 
                className="border" 
                type="text"
                placeholder="Write your review">
                </input>
            <div>
                <button 
                className='border bg-black text-white' 
                type="submit">
                    Submit Review
                </button>
            </div>
            </form>
        // </div>
    )
}

export default ReviewForm