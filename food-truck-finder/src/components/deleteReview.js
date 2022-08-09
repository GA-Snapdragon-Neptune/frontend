import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FoodTruck from "./FoodTruck";

const DeleteReview = () => {
    
    const {foodTruckId, reviewId} = useParams()
    const navigate = useNavigate()
    const [deleteReview, setOldReview] = useState(0)

    const DeleteMyReview = (id) => {
        axios.delete(`https://young-anchorage-22001.herokuapp.com/reviews/${foodTruckId}/${reviewId}`)
        .then((res) => {
            setOldReview(res.data.review)
        })
    }

    return(
        <div className="del-review">
            <button onClick={(e) => {DeleteMyReview(e.target.value_id)}}>Delete</button>
        </div>
    )
}

export default DeleteReview