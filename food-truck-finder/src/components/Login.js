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
                axios.post("http://localhost:8000/users/signin", user)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('role', res.data.role)
                    console.log(localStorage.getItem('id'))
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
        <div className='bg-gray-100 h-screen flex flex-col items-center'>
            {success ?
                    <>
                        <p>Log In Successfully!</p>
                        <p>Welcome {user.username}!</p>
                        <Link to="/foodtrucks">Click to Continue</Link>
                    </>
                :
                    <>
                        {errMsg && <p>{errMsg}</p>}
                        <h1>Log In</h1>
                        <form onSubmit={handleSubmit} className='border w-2/4 p-5 bg-white flex flex-col'>
                            <label htmlFor='username'>Username: </label>
                            <input
                                type='text'
                                id='username'
                                autoComplete='off'
                                onChange={handleChange}
                                value={user.username}
                            required
                            className='border'
                            />
                            <label htmlFor='email'>Email: </label>
                            <input
                                type='text'
                                id='email'
                                onChange={handleChange}
                                value={user.email}
                            required
                            className='border'
                            />
                            <label htmlFor='password'>Password: </label>
                            <input
                                type='password'
                                id='password'
                                onChange={handleChange}
                                value={user.password}
                            required
                            className='border'
                            />
                            <br></br>
                            <button className='bg-black text-white px-4'>Sign In</button>
                        </form>
                    <div className='mt-10 text-center'>
                    <p>
                                Need an Account? <br></br>
                            <span>
                                <Link to="/register" className='bg-black text-white px-4'>Sign Up</Link>
                            </span>
                        </p>
                       </div>
                    </>
            }
        </div>
    );
};

export default Login;