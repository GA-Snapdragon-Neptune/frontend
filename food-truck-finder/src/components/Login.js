import { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";


//username/password regex?
const Login = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [success, setSuccess] = useState(false)

    const handleChange = (event) => {
        setUser({...user, [event.target.id]: event.target.value})
    }

    const handleSubmit = async (event) => {
		event.preventDefault();
        if (user.username !== '' && user.email !== '' && user.password !== ''){
                const {data, status} = await axios({
                    method: 'post',
                    url: 'https://young-anchorage-22001.herokuapp.com/users/signin',
                    data: user,
                    config: {withCredentials: true}
                })
                axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`
                console.log(data['token'])
                if (status === 200) setSuccess(true)
            }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <label>username</label>
                <input
                    type='text'
                    onChange={handleChange}
                    id='username'
                    value={user.username}
                 />
                <br></br>
                <label>email</label>
                <input
                    type='text'
                    onChange={handleChange}
                    id='email'
                    value={user.email}
                />
                <br></br>
                <label>password</label>
                <input
                    type='password'
                    onChange={handleChange}
                    id='password'
                    value={user.password}
                />
                <br></br>
                <button>Sign In</button>
           </form>
           {success &&
                <Navigate to="/" replace={true} />
            }
        </div>
    );
};

export default Login;