import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
        axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
        .then((res) => {
            setReviewList(res.data.reviews)
        })
    }, [id])

    console.log(reviewList)

    return (
        // <div className='h-3/5 overflow-auto'>
        //     <button className='flex-shrink-0 bg-[#7ed957] hover:bg-teal-700 text-sm  text-white py-1 px-2 rounded'>leave a review</button>
        //     <ReviewForm />
        //     {reviewList.map((review) => (
        //         <div key={review._id} className='w-full grid grid-rows-2 grid-cols-3 gap-x-2'>
        //             <h3 className='h-6 text-sm font-bold py-0 col-start-1 pt-3'>{review.title}</h3>
        //             <p className='text-md col-start-1 row-start-2 border-b pb-5 pl-3'>{review.body}</p>
        //         </div>
        //     ))}
        // </div>
        <div className='h-3/5 overflow-auto'>
        {localStorage.getItem('id') ?
                <AddReview id={id}/>
            : <Link to="/login" className='text-[#7ed957] font-bold'>sign in to leave a review!</Link>
            }
            {reviewList.map((review) => (
                <div key={review._id} className='mb-10 p-5 border'>
                    <h3 className='font-bold'>title: {review.title}</h3>
                    <p className='text-sm'>{review.body}</p>
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