import { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//username/password regex?

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    // auto focus on username field when page is rendered
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // checks if username typed in is valid whenever user changes
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    // checks if password and confirm password is valid and matched
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const initialNewUser = {
        username: user,
        email: '',
        password: pwd,
        consumer: true,
        business: false,
    }
    const [newUser, setNewUser] = useState(initialNewUser)

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
    const handleSubmit = async (event) => {
		event.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {

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
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    };

    return (
        <div>
            <p id="errMsg" ref={errRef} className={errMsg ? "shown" : "hidden"}>{errMsg}</p>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                 />
                <br></br>
                <p className={userFocus && user && !validName ? "shown" : "hidden"}>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                </p>
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
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <br></br>
                <p className={pwdFocus && !validPwd ? "shown" : "hidden"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: ? ! @ # $ %
                </p>
                <br></br>
                <label htmlFor="confirm_pwd">Confirm Password:</label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <br></br>
                <p className={matchFocus && !validMatch ? "shown" : "hidden"}>
                    Must match the first password input field.
                </p>
                <br></br>
                <select onChange={handleRole}>
                    <option id="consumer" value="consumer">Consumer</option>
                    <option id="business" value="business">Business</option>
                </select>
                <br></br>
                <button>Sign Up</button>
           </form>
           {success &&
                <>
                    <p>Successfully Registered!</p>
                    <Link to="/login">Sign In</Link>
                </>
           }
           <h1>Returning User?</h1>
           <Link to="/login">Sign In</Link>
        </div>
    );
};

export default Register;