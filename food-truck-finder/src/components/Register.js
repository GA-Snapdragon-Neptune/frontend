import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [newConsumerUser, setNewConsumerUser] = useState({
        username: '',
        email: '',
        password: '',
        consumer: true,
        business: false,
    })

    const handleChange = (event) => {
        setNewConsumerUser({...newConsumerUser, [event.target.id]: event.target.value})
    }

    const handleSubmit = (event) => {
		event.preventDefault();
		axios.post(`https://young-anchorage-22001.herokuapp.com/users/signup`)
            .then((res) => {
                console.log(res, newConsumerUser)
		}
		)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>New User</h1>
                <label>username</label>
                <input
                    type='text'
                    onChange={handleChange}
                    id='username'
                    value={newConsumerUser.username}
                 />
                <label>email</label>
                <input
                    type='text'
                    onChange={handleChange}
                    id='email'
                    value={newConsumerUser.email}
                />
                <label>password</label>
                <input
                    type='text'
                    onChange={handleChange}
                    id='password'
                    value={newConsumerUser.password}
                />

                <button>Sign Up</button>
           </form>

            
                <h1>Returning User</h1>
                <label>username</label>
                <input type='text' />
                <label>password</label>
                <input type='text' />
                <button>login</button>

        </div>
    );
};

export default Register;