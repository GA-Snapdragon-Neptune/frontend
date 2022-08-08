import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ReviewForm from "./reviewForm"

const AddReview = () => {

    const { id } = useParams
    const [newReview, setNewReview] = useState({
        name: ' ',
        date: ' ',
    })
    
const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`, newReview)
    .then(() => {
    })
}

return (
    <div>dsa</div>
    )
}

export default AddReview