import { useState } from "react";
import axios from "axios";
import AddFoodTruck from "./AddFoodTruck";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi'
import logo from '../assets/Grubtruck.png'

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
        <>
            <nav className='flex justify-between items-center h-12 w-screen mx-auto px-2 bg-[#7ed957]'>
                <Link to='/foodtrucks'><BiArrowBack className='text-3xl' /></Link>
                <Link to='/foodtrucks' className='font-extrabold text-xl z-50'><img src={logo} alt='logo' className='w-28 mt-4'/></Link>

            </nav>
            <div className='flex justify-center bg-[#7ed957] h-screen overflow-hidden'>
        <div className='shadow-xl rounded-lg bg-white my-5 mx-auto w-3/4 lg:w-1/2 h-5/6 fixed px-10 pb-20 overflow-auto'>
            {localStorage.getItem('id') ? 
                <>
                    {deleted ? 
                        <p>Account Deleted</p>
                        :
                        <>
                        <button onClick={signOut} className='font-bold text-xl text-[#7ed957] w-3/4 text-left mt-10'>Sign Out</button>
                        <button onClick={checkForUpdate} className='font-bold border-b w-3/4 text-left mt-10'>Edit User Info</button>
                        {checkUpdate ? 
                            <div>
                                {!updated ?
                                    <>
                                                    <form className='w-3/4'>
                                                    <div className="flex flex-col">
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
                        <button onClick={checkForDelete} className='font-bold border-b text-left w-3/4'>Delete User</button>
                        {checkDelete ? 
                            <div>
                            <p className='text-[#7ed957] text-md font-bold italic mb-5'>Are you sure you want to delete?</p>
                            <button onClick={handleDelete} className='flex-shrink-0 bg-red-500 hover:bg-red-700 text-sm  text-white py-1 px-2 rounded'>Confirm</button>
                            <button onClick={exitDelete} className='flex-shrink-0 bg-black hover:bg-teal-700 text-sm  text-white py-1 px-2 ml-5 rounded'>Cancel</button>
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
                <div className='flex flex-col justify-center items-center h-3/4 mt-20'>
                    <h1 className='font-bold mb-5'>Oops! You're not logged in.</h1>
                    <Link to="/login" className='bg-[#7ed957] shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Please Sign In</Link>
                </div>
                    }
                    </div>
            </div>
        </>
    );
};

export default User;