import axios from "axios"
import { useState } from "react"

const EditReviewForm = ({review}) => {
    console.log(review)
    const [edit, setEdit] = useState(false)
    const [editedReview, setEditedReview] = useState(review)

    const handleChange = (e) => {
        setEditedReview({...editedReview, [e.target.id]: e.target.value})
    }
    const editReview = (e) => {
        e.preventDefault()
        setEdit(!edit)
    }
    const handleEdit = (id) => {
        setEditedReview({...editedReview, reviewId: id})
        axios.put(`http://localhost:8000/reviews/${id}`, editedReview)
    } 
    return( 
        <>
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
        </>
    )
}

export default EditReviewForm;
