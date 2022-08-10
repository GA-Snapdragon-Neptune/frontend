import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ReviewFood = () => {

    const { id } = useParams()
    const { reviews } = useParams()
    const [viewFood, setViewFood] = useState({})

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}/${reviews}`)
            .then((res) => {
                setViewFood(res.data)
            })
	}, [reviews]);

    return (
        <div>
            Look at Review
        </div>
    )
}

export default ReviewFood