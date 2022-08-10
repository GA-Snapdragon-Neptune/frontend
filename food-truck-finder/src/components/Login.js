import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
                    console.log(res.data.token)
                    if (res.data?.token) {
                        setSuccess(true)
                    } else {
                        setErrMsg(res.data)
                    }
                })
            }

    };

    return (
        <div className='flex flex-col items-center bg-[#7ed957] h-screen'>
            {success ?
                    <>
                        <p>Log In Successfully!</p>
                        <p>Welcome {user.username}!</p>
                        <Link to="/">Click to return to Home</Link>
                    </>
                :
                    <>
                        {errMsg && <p>{errMsg}</p>}
                    <div className='flex flex-col justify-center items-center w-3/4 md:w-1/4 h-3/4 mt-20 shadow-lg rounded-lg bg-white'>
                    <h1 className='font-bold text-2xl mb-20'>Log In</h1>
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
                        <Link to='/foodtrucks' className='text-sm mt-20'>continue as guest</Link>
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