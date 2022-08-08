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
        <div className="login-form">
            {success ?
                    <>
                        <p>Log In Successfully</p>
                        <p>Welcome {user.username}!</p>
                        <Link to="/">Click to return to Home</Link>
                    </>
                :
                    <>
                        {errMsg && <p>{errMsg}</p>}
                        <form onSubmit={handleSubmit}>
                            <h1>Log In</h1>
                            <label htmlFor='username'>Username: </label>
                            <input
                                type='text'
                                id='username'
                                autoComplete='off'
                                onChange={handleChange}
                                value={user.username}
                                required
                            />
                            <br></br>
                            <label htmlFor='email'>Email: </label>
                            <input
                                type='text'
                                id='email'
                                onChange={handleChange}
                                value={user.email}
                                required
                            />
                            <br></br>
                            <label htmlFor='password'>Password: </label>
                            <input
                                type='password'
                                id='password'
                                onChange={handleChange}
                                value={user.password}
                                required
                            />
                            <br></br>
                            <button>Sign In</button>
                        </form>
                        <p>
                                Need an Account? <br></br>
                            <span>
                                <Link to="/register">Sign Up</Link>
                            </span>
                        </p>
                    </>
            }
        </div>
    );
};

export default Login;