import { useState } from "react";
import axios from "axios";

const DeleteReview = ({foodTruckId, review}) => {
    const handleDelete = (reviewId) => {
        axios({method:'delete',
            url:`http://localhost:8000/reviews/${foodTruckId}/${reviewId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
    }
    const [checkDelete, setCheckDelete] = useState(false)

    const checkForDelete = () => {
        setCheckDelete(true)
    }
    const exitDelete = () => {
        setCheckDelete(false)
    }
    return(
        <div className="del-review">
            <button type="button" onClick={checkForDelete}>Delete Review</button>
            {checkDelete ? 
                <div>
                <p>Are you sure you want to delete ?</p>
                <button onClick={() => handleDelete(review._id)} className='hover:bg-[#7ed957] border rounded-lg px-5'>Confirm</button>
                <button onClick={exitDelete} className='hover:bg-[#7ed957] border rounded-lg px-5'>Cancel</button>
                </div> 
                : 
                null
            }
        </div>
    )
}

export default DeleteReview