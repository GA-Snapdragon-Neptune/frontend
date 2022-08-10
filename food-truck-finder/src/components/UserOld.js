import { useState, useEffect } from "react";
import axios from "axios";
import AddFoodTruck from "./AddFoodTruck";
import logo from '../assets/Grubtruck.png'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

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
    <>
            <nav className='flex justify-between items-center h-12 w-screen mx-auto px-2 bg-[#7ed957]'>
                <Link to='/foodtrucks'><BiArrowBack className='text-3xl' /></Link>

            </nav>
        <div className='flex justify-center bg-[#7ed957] h-screen overflow-hidden'>
        <div className='shadow-xl rounded-lg bg-white my-20 mx-auto w-3/4 lg:w-1/2 h-5/6 fixed px-10 pb-20 overflow-auto'>
            {deleted ? 
                <p>Account Deleted</p>
                :
                    <>

                <button onClick={checkForUpdate} className='font-bold border-b w-3/4 text-left mt-10'>Edit User Info</button>
                    {checkUpdate ? 
                        <div>
                        {!updated ?
                            <>
                                        
                                    <form className='w-3/4'>
                                        <div class="flex flex-col">
                                    <p className='text-[#7ed957] text-xs italic mb-5'>populate fields you would like to update</p>
                                    <label htmlFor='username' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Username: </label>
                                            <input
                                                className='border'
                                            type='text'
                                            id='username'
                                            autoComplete='off'
                                            onChange={(e) => setUser(e.target.value)}
                                            value={user}
                                            required
                                        />
                                        <br></br>
                                        <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Email: </label>
                                            <input
                                                className='border'
                                            type='text'
                                            id='email'
                                            autoComplete='off'
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                        />
                                        <br></br>
                                        <label htmlFor='password' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Password: </label>
                                            <input
                                                className='border'
                                            type='password'
                                            id='password'
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                        />
                                                <br></br>
                                    </div>
                                    </form>
                                        <div>
                                            <button onClick={handleSubmit} className='flex-shrink-0 bg-[#7ed957] hover:bg-teal-700 text-sm  text-white py-1 px-2 rounded'>Submit</button>
                                            <button onClick={exitUpdate} className='flex-shrink-0 bg-[#7ed957] hover:bg-teal-700 text-sm  text-white py-1 px-2 ml-5 rounded'>Cancel</button>
                                        </div>
                            </>
                        :
                            <p>user updated</p>
                    
                        }
                    </div> 
                    : 
                    null
                }
                <br></br>
                <button onClick={checkForDelete} className='font-bold border-b w-full text-left w-3/4'>Delete User</button>
                {checkDelete ? 
                    <div>
                        <p className='text-[#7ed957] text-md font-bold italic mb-5'>Are you sure you want to delete?</p>
                        <button onClick={handleDelete} className='flex-shrink-0 bg-red-500 hover:bg-red-700 text-sm  text-white py-1 px-2 rounded'>Confirm</button>
                        <button onClick={exitDelete} className='flex-shrink-0 bg-black hover:bg-teal-700 text-sm  text-white py-1 px-2 ml-5 rounded'>Cancel</button>
                    </div> 
                    : 
                    null
                        }
            <AddFoodTruck/>
                </>
            }
            </div>
            <div className='w-3/4 md:w-1/2 h-40 flex justify-center absolute top-0'><img src={logo} alt='logo' className=''/></div>
            </div>
        </>
    );
};

export default User;