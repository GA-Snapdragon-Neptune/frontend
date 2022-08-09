import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const UpdateReview = () => {
    const navigate = useNavigate()
    const handleEdit = (e) => {
        navigate(`https://young-anchorage-22001.herokuapp.com/reviews/reviewsEdit`)} 
    return( 
        <div className="edit-button">
            <button type="button" onClick={handleEdit}>Edit Review</button>
        </div>
    )
}

export default UpdateReview