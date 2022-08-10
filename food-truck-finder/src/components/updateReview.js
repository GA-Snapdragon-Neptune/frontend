import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const UpdateReview = () => {
    const navigate = useNavigate()
    const handleEdit = (e) => {
        // navigate(`https://young-anchorage-22001.herokuapp.com/reviews/reviewsEdit`)
    } 
    const [edit, setEdit] = useState(false)
    const [editedReview, setEditedReview] = useState({
        title: '',
        body: '',
        author: '62ed652c9d3864f3942ad6c4',
    })

    const handleChange = (e) => {
        setEditedReview({...editedReview, [e.target.id]: e.target.value})
        console.log(editedReview)
    }
    const editReview = (e) => {
        e.preventDefault()
        setEdit(true)
    }
    return( 
        <div className="edit-button">
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
                        <button type="button" onClick={handleEdit}>submit</button>
                </form>
            : null
            }
        </div>
    )
}

export default UpdateReview