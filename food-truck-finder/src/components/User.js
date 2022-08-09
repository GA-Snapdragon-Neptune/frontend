import { useState, useEffect } from "react";
import axios from "axios";
import AddFoodTruck from "./AddFoodTruck";

const User = () => {
    useEffect(() => {
        console.log(localStorage.getItem('id'))
        axios.get('http://localhost:8000/users')
        .then(res => {
            const found = res.data.find((user) => user._id === localStorage.getItem('id'))
            console.log(found)
        })
    }, [])

    // delete
    const handleDelete = () => {
        axios({
            method: 'delete',
            url:`http://localhost:8000/users/${localStorage.getItem('id')}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                setDeleted(true)
            }
        })
    }

    const [deleted, setDeleted] = useState(false)
    const [checkDelete, setCheckDelete] = useState(false)

    const checkForDelete = () => {
        setCheckDelete(true)
    }
    const exitDelete = () => {
        setCheckDelete(false)
    }
    // update
    const [updated, setUpdated] = useState(false)
    const [checkUpdate, setCheckUpdate] = useState(false)

    const checkForUpdate = () => {
        setCheckUpdate(true)
    }

    const exitUpdate = () => {
        setCheckUpdate(false)
    }

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {}
        console.log(user)
        if (user) data.username = user
        console.log(pwd)
        if (pwd) data.password = pwd
        console.log(email)
        if (email) data.email = email
        console.log(data)
        axios({
            method: 'put',
            url:`http://localhost:8000/users/${localStorage.getItem('id')}`,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                setUpdated(true)
            }
        })
    }
    return (
        <div>
            <AddFoodTruck />
            {deleted ? 
                <p>Account Deleted</p>
                :
                <>
                <h1>Welcome!</h1>
                <button onClick={checkForUpdate}>Edit User Info</button>
                {checkUpdate ? 
                    <div>
                        {!updated ?
                            <>
                                <p>populate fields you would like to update</p>
                                <form>
                                    <label htmlFor='username'>Username: </label>
                                        <input
                                            type='text'
                                            id='username'
                                            autoComplete='off'
                                            onChange={(e) => setUser(e.target.value)}
                                            value={user}
                                            required
                                        />
                                        <br></br>
                                        <label htmlFor='email'>Email: </label>
                                        <input
                                            type='text'
                                            id='email'
                                            autoComplete='off'
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                        />
                                        <br></br>
                                        <label htmlFor='password'>Password: </label>
                                        <input
                                            type='password'
                                            id='password'
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                        />
                                        <br></br>
                                </form>
                                <button onClick={handleSubmit}>Submit</button>
                                <button onClick={exitUpdate}>Cancel</button>
                            </>
                        :
                            <p>user updated</p>
                    
                        }
                    </div> 
                    : 
                    null
                }
                <br></br>
                <button onClick={checkForDelete}>Delete User</button>
                {checkDelete ? 
                    <div>
                        <p>Are you sure you want to delete ?</p>
                        <button onClick={handleDelete}>Confirm</button>
                        <button onClick={exitDelete}>Cancel</button>
                    </div> 
                    : 
                    null
                }
                </>
            }
        </div>
    );
};

export default User;