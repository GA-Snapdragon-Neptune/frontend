import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './reviews.css'
import AddReview from './addReview';
import DeleteReview from './deleteReview';
import UpdateReview from './updateReview';

const Reviews = () => {

    const { id } = useParams()
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setReviewList(res.data.reviews)
            })
	}, [id]);


    return (
        <div>
            {/* <button>leave a review (kenan)</button> */}
            <AddReview />
            {reviewList.map((review) => (
                <div key={review._id}>
                    <h3>{review.title}</h3>
                    <p>{review.body}</p>
                    <div className='edit-delete'>
                    <DeleteReview />
                    <UpdateReview />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;