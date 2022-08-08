import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {

    const initialNewUser = {
        username: '',
        email: '',
        password: '',
        consumer: true,
        business: false,
    }
    const [newUser, setNewUser] = useState(initialNewUser)

    const [success, setSuccess] = useState(false)

    const handleChange = (event) => {
        setNewUser({...newUser, [event.target.id]: event.target.value})
    }
    const handleRole = (event) => {
        if (event.target.value === 'consumer') {
            setNewUser({...newUser, [event.target.value]: true, 'business': false })
        }
        if (event.target.value === 'business') {
            setNewUser({...newUser, [event.target.value]: true, 'consumer': false })
        }
    }
    const handleSubmit = (event) => {
		event.preventDefault();
        // console.log(newUser)
        if (newUser.username !== '' && newUser.email !== '' && newUser.password !== ''){
            axios({
                method: 'post',
                url: 'http://localhost:8000/users/signup',
                data: newUser
            })
            .then((res) => {
                if (res.status === 201) setSuccess(true)
            })
        }
        setNewUser(initialNewUser)
    };

    return (
        <div className='flex flex-col justify-center items-center text-center mt-20'>
            <form onSubmit={handleSubmit}>
                <h1 className='font-bold'>Sign Up</h1>
                <label htmlFor='username'>Username: </label>
                <input
                    type='text'
                    id='username'
                    autoComplete='off'
                    onChange={handleChange}
                    value={newUser.username}
                    required
                    className='border'
                 />
                <br></br>
                <label htmlFor='email'>Email: </label>
                <input
                    type='text'
                    id='email'
                    autoComplete='off'
                    onChange={handleChange}
                    value={newUser.email}
                    required
                    className='border'
                />
                <br></br>
                <label htmlFor='password'>Password: </label>
                <input
                    type='password'
                    id='password'
                    onChange={handleChange}
                    value={newUser.password}
                    required
                    className='border'
                />
                <br></br>
                <select onChange={handleRole}>
                    <option id="consumer" value="consumer">Consumer</option>
                    <option id="business" value="business">Business</option>
                </select>
                <br></br>
                <button className='bg-black text-white px-4'>Sign Up</button>
           </form>
            <div className='mt-20 w-40'>
            {success &&
                <p>Successfully Registered!</p>
           }
           <h1>Returning User?</h1>
           <Link to="/login" className='bg-black text-white px-4'>Log In</Link>
           </div>
        </div>
    );
};

export default Register;