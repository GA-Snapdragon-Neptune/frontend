import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddReview from './AddReview';
import EditReviewForm from './EditReviewForm';
import DeleteReview from './DeleteReview';

const Reviews = () => {
    const { id } = useParams()
    const [reviewList, setReviewList] = useState([])
    const [changeCount, setChangeCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setReviewList(res.data.reviews)
            })
        }
        fetchData()
            .catch(console.error)
    }, [id, changeCount])

   
    return (
        <div className='h-3/5 overflow-auto'>
        {localStorage.getItem('id') ?
                <AddReview 
                    id={id}
                    changeCount={changeCount}
                    setChangeCount={setChangeCount}
                />
            : <Link to="/login" className='text-[#7ed957] font-bold'>Sign In to Leave a Review!</Link>
            }
            {reviewList.map((review) => (
                <div key={review._id} className='mb-10 p-5 border'>
                    <h3 className='font-bold underline py-3'>{review.title}</h3>
                    <p className='text-sm py-3'>{review.body}</p>
                    {review.author.toString() === localStorage.getItem('id') ? 
                        <div className='edit-delete flex flex-col'>
                            <div className="del-review">
                                <DeleteReview 
                                    foodTruckId={id}
                                    review={review}
                                    changeCount={changeCount}
                                    setChangeCount={setChangeCount}
                                />
                            </div>
                            <div className='edit-review'>
                                <EditReviewForm 
                                    review ={review}
                                    changeCount={changeCount}
                                    setChangeCount={setChangeCount}
                                />
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