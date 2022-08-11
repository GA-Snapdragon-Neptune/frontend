import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import logo from '../assets/Grubtruck.png'

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const handleChange = (event) => {
        setUser({...user, [event.target.id]: event.target.value})
    }

    const handleSubmit = async (event) => {
		event.preventDefault();
        if (user.username !== '' && user.email !== '' && user.password !== ''){
                axios.post("https://young-anchorage-22001.herokuapp.com/users/signin", user)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('role', res.data.role)
                    console.log(res.data.token)
                    if (res.data?.token) {
                        setSuccess(true)
                    } else {
                        setErrMsg(res.data)
                    }
                })
            }

    };

    const guestMode = () => {
        localStorage.clear()
    }

    return (
        <div className='flex flex-col items-center bg-[#7ed957] h-screen'>
            {success ?
                    <>
                    <div className='flex flex-col justify-evenly items-center w-3/4 md:w-1/4 h-1/2 mt-20 shadow-lg rounded-lg bg-white'>
                        <p>logged in successfully!</p>
                        <p className='font-bold text-2xl'>welcome <span className='text-[#7ed957]'>{user.username}!</span></p>
                        <Link to="/foodtrucks" className='bg-[#7ed957] shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Enter</Link>
                    </div>
                    <img src={logo} alt='grubtruck logo' className='w-56 mt-10'/>
                    </>
                :
                    <>
                    <div className='flex flex-col justify-center items-center w-3/4 md:w-1/4 h-3/4 mt-20 shadow-lg rounded-lg bg-white'>
                    <h1 className='font-bold text-2xl mb-20'>Log In</h1>
                        {errMsg && <p className='text-red-600 text-sm font-bold lg:text-lg text-center absolute top-0'>{errMsg}</p> }
                        <form onSubmit={handleSubmit} className='w-3/4 h-1/2 bg-white flex flex-col '>
                            <label htmlFor='username' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Username: </label>
                            <input
                                type='text'
                                id='username'
                                autoComplete='off'
                                onChange={handleChange}
                                value={user.username}
                            required
                            className='border'
                            />
                            <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Email: </label>
                            <input
                                type='text'
                                id='email'
                                onChange={handleChange}
                                value={user.email}
                            required
                            className='border'
                            />
                            <label htmlFor='password' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Password: </label>
                            <input
                                type='password'
                                id='password'
                                onChange={handleChange}
                                value={user.password}
                            required
                            className='border'
                            />
                            <br></br>
                            <button className='bg-[#7ed957] shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Sign In</button>
                        </form>
                        <Link to='/foodtrucks' className='text-sm mt-20' onClick={guestMode}>continue as guest</Link>
                        </div>
                    <div className='mt-5 text-center'>
                    <p>
                                Need an Account? <br></br>
                            <span>
                                <Link to="/register" className='flex-shrink-0 bg-black hover:bg-teal-700 text-sm  text-white py-1 px-3 my-5 rounded'>Sign Up</Link>
                            </span>
                        </p>
                       </div>
                    </>
            }
        </div>
    );
};

export default Login;