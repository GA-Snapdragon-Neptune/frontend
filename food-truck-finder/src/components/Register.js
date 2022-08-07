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

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        consumer: true,
        business: false,
    })

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
                url: 'https://young-anchorage-22001.herokuapp.com/users/signup',
                data: newUser
            })
            .then((res) => {
                if (res.status === 201) setSuccess(true)
            })
        }
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
                    value={newUser.username}
                 />
                <br></br>
                <label>email</label>
                <input
                    type='text'
                    onChange={handleChange}
                    id='email'
                    value={newUser.email}
                />
                <br></br>
                <label>password</label>
                <input
                    type='password'
                    onChange={handleChange}
                    id='password'
                    value={newUser.password}
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
                <p>Successfully Registered! username: {newUser.username}</p>
           }
           <h1>Returning User?</h1>
           <Link to="/login">Log In</Link>
        </div>
    );
};

export default Register;