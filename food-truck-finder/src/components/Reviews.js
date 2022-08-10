import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm';

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
        <div className='bg-gray-100 w-100 h-100'>
            <button>leave a review (kenan)</button>
            <ReviewForm />
            {reviewList.map((review) => (
                <div key={review._id} className='w-100 h-50 grid grid-rows-2 grid-cols-3 gap-x-2'>
                    <h3 className='h-6 text-sm font-bold py-0 col-start-1'>{review.title}</h3>
                    <p className='text-md border-b col-start-1 row-start-2'>{review.body}</p>
                </div>
            ))}
        </div>
    );
};

export default Reviews;