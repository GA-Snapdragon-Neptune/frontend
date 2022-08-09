import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './form.css'


const ReviewForm = ({id}) => {
    const navigate = useNavigate()
    const initialReviewState = {
        title: '',
        body: '',
        author: '62ed652c9d3864f3942ad6c4',
        foodTruckId: id
    }
    const [myReview, setMyReview] = useState(initialReviewState)
        const handleChange = (e) => {
            setMyReview({...myReview, [e.target.id]: e.target.value})
        }
    const handleSubmit = (e) => {
        e.preventDefault();
		axios.post(`https://young-anchorage-22001.herokuapp.com/reviews`, myReview)
            .then(() => {
                navigate(`/foodtrucks/${id}`)
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

export default ReviewForm