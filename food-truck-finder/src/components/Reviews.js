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
        <div className='h-3/5 overflow-auto'>
            <button className='flex-shrink-0 bg-[#7ed957] hover:bg-teal-700 text-sm  text-white py-1 px-2 rounded'>leave a review</button>
            <ReviewForm />
            {reviewList.map((review) => (
                <div key={review._id} className='w-full grid grid-rows-2 grid-cols-3 gap-x-2'>
                    <h3 className='h-6 text-sm font-bold py-0 col-start-1 pt-3'>{review.title}</h3>
                    <p className='text-md col-start-1 row-start-2 border-b pb-5 pl-3'>{review.body}</p>
                </div>
            ))}
        </div>
    );
};

export default Reviews;