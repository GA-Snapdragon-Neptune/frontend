import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"

const EditForm = ({foodTruckId}) => {
    const navigate = useNavigate()
    const handleEdit = async (e) => {
        await axios.put(`https://young-anchorage-22001.herokuapp.com/reviews/editReviews`)
        .then (() => {
            navigate(`/foodtrucks/${foodTruckId}`)
        })
        } 
    return( 
    <form>
        <div className="edit-form">
            <label htmlFor="title">Edit Title</label>
            <input type='text'/>
        </div>
        <div>
            <label htmlFor="body">Edit Body</label>
            <input type='text'></input>
        </div>
            <button type="button" onClick={handleEdit}>Edit Review</button>
    </form>
    )
}

export default EditForm
