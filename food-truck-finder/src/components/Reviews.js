import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './reviews.css'
import AddReview from './AddReview';
import EditReviewForm from './EditReviewForm';
import DeleteReview from './DeleteReview';

const Reviews = () => {
    const { id } = useParams()
    const [reviewList, setReviewList] = useState([])

    // const getReviews = useCallback(() => {
    //     axios.get(`http://localhost:8000/foodtrucks/${id}`)
    //     .then((res) => {
    //         setReviewList(res.data.reviews)
    //     })
    // }, [reviewList])
    
    // useEffect(() => {
	// 	getReviews()
	// }, [getReviews]);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/foodtrucks/${id}`)
        .then((res) => {
            setReviewList(res.data.reviews)
        })
    }, [id])

    return (
        <div>
            {localStorage.getItem('id') ?
                <AddReview id={id}/>
            : <Link to="/login" className='text-red-300'>sign in to leave a review!</Link>
            }
            {reviewList.map((review) => (
                <div key={review._id}>
                    <h3>{review.title}</h3>
                    <p>{review.body}</p>
                    {review.author.toString() === localStorage.getItem('id') ? 
                        <div className='edit-delete'>
                            <div className="del-review">
                                <DeleteReview foodTruckId={id} review={review}/>
                            </div>
                            <div className='edit-review'>
                                <EditReviewForm review ={review}/>
                            </div>
                        </div>
                        : null
                    }
                </div>
            ))}
        </div>
    );
};

export default Reviews;