import axios from "axios"
import { useState } from "react"

const EditReviewForm = ({review, changeCount, setChangeCount}) => {
    const [edit, setEdit] = useState(false)
    const [editedReview, setEditedReview] = useState(review)

    const handleChange = (e) => {
        setEditedReview({...editedReview, [e.target.id]: e.target.value})
    }
    const editReview = () => {
        setEdit(!edit)
    }
    const handleEdit = (id) => {
        setEditedReview({...editedReview, reviewId: id})
        // axios.put(`http://localhost:8000/reviews/${id}`, editedReview)
        axios({
            method: 'put',
            url:`https://young-anchorage-22001.herokuapp.com/reviews/${id}`,
            data:editedReview,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(() => {
            setChangeCount(changeCount + 1)
            editReview()
        })
        .catch(console.error)
    } 
    return( 
        <>
            <button type="button" onClick={editReview} className='bg-black text-sm text-white py-1 px-2 rounded'>Edit Review</button>
            {edit ?
            <form className='flex flex-col'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0' htmlFor="title">Edit Title</label>
                <input
                    className='border'
                    type='text'
                    id='title'
                    value={editedReview.title}
                    onChange={handleChange}>
                </input>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0' htmlFor="body">Edit Body</label>
                <input 
                    className='border'
                    type='text'
                    id='body'
                    value={editedReview.body}
                    onChange={handleChange}
                    >
                </input>
                <button className='bg-black text-sm text-white py-1 px-2 mx-5 rounded ' type="button" onClick={() => handleEdit(review._id)}>Submit Changes</button>
            </form>
            : null
            }
        </>
    )
}

export default EditReviewForm;