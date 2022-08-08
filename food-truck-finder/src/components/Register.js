import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//username/password regex?

const Register = () => {

    // const userRef = useRef()
    // const errRef = useRef()

    // const [user, setUser] = useState('')
    // const [validName, setValidName] = useState(false)
    // const [userFocus, setUserFocus] = useState(false)

    // const [pwd, setPwd] = useState('');
    // const [validPwd, setValidPwd] = useState(false);
    // const [pwdFocus, setPwdFocus] = useState(false);

    // const [matchPwd, setMatchPwd] = useState('');
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);

    // const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])

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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label htmlFor='username'>Username: </label>
                <input
                    type='text'
                    id='username'
                    autoComplete='off'
                    onChange={handleChange}
                    value={newUser.username}
                    required
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
                />
                <br></br>
                <label htmlFor='password'>Password: </label>
                <input
                    type='password'
                    id='password'
                    onChange={handleChange}
                    value={newUser.password}
                    required
                />
                <br></br>
                <select onChange={handleRole}>
                    <option id="consumer" value="consumer">Consumer</option>
                    <option id="business" value="business">Business</option>
                </select>
                <br></br>
                <button>Sign Up</button>
           </form>
           {success &&
                <p>Successfully Registered!</p>
           }
           <h1>Returning User?</h1>
           <Link to="/login">Log In</Link>
        </div>
    );
};

export default Register;