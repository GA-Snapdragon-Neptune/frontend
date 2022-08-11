import { useState } from "react";
import axios from "axios";

const DeleteReview = ({foodTruckId, review, changeCount, setChangeCount}) => {
    const handleDelete = (reviewId) => {
        axios({method:'delete',
            url:`https://young-anchorage-22001.herokuapp.com/reviews/${foodTruckId}/${reviewId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(() => {setChangeCount(changeCount + 1)})
    }
    const [checkDelete, setCheckDelete] = useState(false)

    const checkForDelete = () => {
        setCheckDelete(!checkDelete)
    }
    const exitDelete = () => {
        setCheckDelete(false)
    }
    return(
        <div className="del-review">
            <button type="button" onClick={checkForDelete} className='bg-black text-sm text-white py-1 px-2 my-2 rounded'>Delete Review</button>
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