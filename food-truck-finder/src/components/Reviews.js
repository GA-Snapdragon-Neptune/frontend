import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './reviews.css'
import AddReview from './addReview';
// import DeleteReview from './deleteReview';
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
	}, [id, reviewList]);


    const handleDelete = (reviewId) => {
        axios.delete(`https://young-anchorage-22001.herokuapp.com/reviews/${id}/${reviewId}`)
        .then ((res) => {
            console.log(res)
        })
    }

    return (
        <div>
            <AddReview 
            id={id}
            />
            {reviewList.map((review) => (
                <div key={review._id}>
                    <h3>{review.title}</h3>
                    <p>{review.body}</p>
                    <div className='edit-delete'>
                        <div className="del-review">
                            <button type="button" onClick={() => handleDelete(review._id)}>Delete</button>
                        </div>
                        <UpdateReview />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;