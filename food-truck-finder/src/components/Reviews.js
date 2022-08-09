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

    // delete review
    const handleDelete = (reviewId) => {
        axios.delete(`https://young-anchorage-22001.herokuapp.com/reviews/${id}/${reviewId}`)
        .then ((res) => {
            console.log(res)
        })
    }

    // update review
    const [edit, setEdit] = useState(false)
    const [editedReview, setEditedReview] = useState({
        title: '',
        body: '',
        author: '62ed652c9d3864f3942ad6c4',
        reviewId: ''
    })

    const handleChange = (e) => {
        setEditedReview({...editedReview, [e.target.id]: e.target.value})
        console.log(editedReview)
    }
    const editReview = (e) => {
        e.preventDefault()
        setEdit(true)
    }
    const handleEdit = (id) => {
        console.log(id)
        setEditedReview({...editedReview, reviewId: id})
        axios.put(`https://young-anchorage-22001.herokuapp.com/reviews/${id}`, editedReview)
        .then(res => console.log(res))
        // navigate(`https://young-anchorage-22001.herokuapp.com/reviews/reviewsEdit`)
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
                        <div className='edit-review'>
                            <button type="button" onClick={editReview}>Edit Review</button>
                            {edit ?
                                <form>
                                    <div className="edit-form">
                                        <label htmlFor="title">Edit Title</label>
                                        <input
                                            type='text'
                                            id='title'
                                            value={editedReview.title}
                                            onChange={handleChange}>
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="body">Edit Body</label>
                                        <input 
                                            type='text'
                                            id='body'
                                            value={editedReview.body}
                                            onChange={handleChange}
                                        >
                                        </input>
                                    </div>
                                        <button type="button" onClick={() => handleEdit(review._id)}>submit</button>
                                </form>
                                : null
                            }
                        </div>
                    </div>
                        {/* <UpdateReview /> */}
                </div>
            ))}
        </div>
    );
};

export default Reviews;