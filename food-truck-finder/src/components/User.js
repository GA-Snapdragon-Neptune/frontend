import { useState } from "react";
import axios from "axios";
import AddFoodTruck from "./AddFoodTruck";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi'

const User = () => {
    let navigate = useNavigate()

    // delete
    const handleDelete = () => {
        axios({
            method: 'delete',
            url:`https://young-anchorage-22001.herokuapp.com/users/${localStorage.getItem('id')}`,
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
        if (user) data.username = user
        if (pwd) data.password = pwd
        if (email) data.email = email
        axios({
            method: 'put',
            url:`https://young-anchorage-22001.herokuapp.com/users/${localStorage.getItem('id')}`,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => {
            if (res.status === 200) {
                setUpdated(true)
            }
        })
    }

    const signOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <nav className='flex justify-between items-center h-12 w-screen mx-auto px-2 bg-[#7ed957]'>
                <Link to='/foodtrucks'><BiArrowBack className='text-3xl' /></Link>

            </nav>
            {localStorage.getItem('id') ? 
                <>
                    {deleted ? 
                        <p>Account Deleted</p>
                        :
                        <>
                        <h1 className='font-bold text-3xl mb-10 border-b text-[#7ed957]'>Welcome!</h1>
                        <button onClick={checkForUpdate} className='hover:bg-[#7ed957] rounded-lg px-5 mb-5'>Edit User Info</button>
                        {checkUpdate ? 
                            <div>
                                {!updated ?
                                    <>
                                        <form className='px-5'>
                                            <p className='text-sm'>populate fields you would like to update</p>
                                            <label htmlFor='username'>Username: </label>
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
                                                <label htmlFor='email'>Email: </label>
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
                                                <label htmlFor='password'>Password: </label>
                                                    <input
                                                        className='border'
                                                    type='password'
                                                    id='password'
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    value={pwd}
                                                    required
                                                />
                                                <br></br>
                                                </form>
                                            <div className='mt-5'>
                                            <button onClick={handleSubmit} className='hover:bg-[#7ed957] border rounded-lg px-5'>Submit</button>
                                            <button onClick={exitUpdate} className='hover:bg-[#7ed957] border rounded-lg px-5'>Cancel</button>
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
                        <button onClick={checkForDelete} className='hover:bg-[#7ed957] rounded-lg px-5 mb-5'>Delete User</button>
                        <button onClick={signOut} className='hover:bg-[#7ed957] rounded-lg px-5 mb-5'>Sign Out</button>
                        {checkDelete ? 
                            <div>
                                <p>Are you sure you want to delete ?</p>
                                <button onClick={handleDelete} className='hover:bg-[#7ed957] border rounded-lg px-5'>Confirm</button>
                                <button onClick={exitDelete} className='hover:bg-[#7ed957] border rounded-lg px-5'>Cancel</button>
                            </div> 
                            : 
                            null
                        }
                        </>
                    }
                    {localStorage.getItem('role') === 'business' ?
                        <AddFoodTruck/>
                        :
                        null
                    }
                </>
            :
                <div className='flex flex-col justify-center items-center w-3/4 md:w-1/4 h-3/4 mt-20 shadow-lg rounded-lg bg-white'>
                    <h1 className='font-bold mb-5'>Oops! You're not logged in.</h1>
                    <Link to="/login" className='bg-[#7ed957] shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Please Sign In</Link>
                </div>
            }
        </div>
    );
};

export default User;