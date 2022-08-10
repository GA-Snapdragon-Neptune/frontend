import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './reviews.css'
import AddReview from './AddReview';
import EditReviewForm from './EditReviewForm';
import { Link } from 'react-router-dom';

const Reviews = () => {
    const { id } = useParams()
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`http://localhost:8000/foodtrucks/${id}`)
            .then((res) => {
                setReviewList(res.data.reviews)
            })
	}, [id, reviewList]);

    // delete review
    const handleDelete = (reviewId) => {
        // axios.delete(`http://localhost:8000/reviews/${id}/${reviewId}`)
        axios({method:'delete',
            url:`http://localhost:8000/reviews/${id}/${reviewId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then ((res) => {
            console.log(res)
        })
    }
    
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
                                <button type="button" onClick={() => handleDelete(review._id)}>Delete</button>
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