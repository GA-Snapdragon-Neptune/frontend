import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteReview = ({foodTruckId, reviewId}) => {
    const navigate = useNavigate()
    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:8000/reviews/${foodTruckId}/${reviewId}`)
        .then (() => {
            navigate(`/foodtrucks/${foodTruckId}`)
        })
        } 

    return(
        <div className="del-review">
        <button type="button" onClick={handleDelete}>Delete Review</button>
        </div>
    )
}

export default DeleteReview