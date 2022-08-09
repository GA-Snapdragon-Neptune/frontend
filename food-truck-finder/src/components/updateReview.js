import React, { useState } from "react";
import axios from "axios";

const UpdateReview = () => {

    const [updateReview, setUpReview] = useState(0)

    const UpdatedReview = (id) => {
        axios.put(`https://young-anchorage-22001.herokuapp.com/reviews/:reviewsId, {id, updateReview}`)
        .then((res) => {
            setUpReview(res.data.reviews)
        })
    }

    return( 
        <div>
            <button onClick={(e) => {UpdatedReview(e.target.value_id)}}>Edit</button>
        </div>
    )
}

export default UpdateReview