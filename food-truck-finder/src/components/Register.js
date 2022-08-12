import { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState('');

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
        email: email,
        password: pwd,
        consumer: true,
        business: false,
    }
    const [newUser, setNewUser] = useState(initialNewUser)

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
        const registerUser = {
            username: user,
            email: email,
            password: pwd,
            consumer: newUser.consumer,
            business: newUser.business
        }
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await axios({
                method: 'post',
                url: 'https://young-anchorage-22001.herokuapp.com/users/signup',
                data: registerUser
            })
            .then((res) => {
                if (res.status === 201) setSuccess(true)
            })
            setEmail('')
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    };

    return (
        <div className='flex flex-col items-center bg-[#7ed957] h-screen'>
            <div id="errMsg" ref={errRef} className={errMsg && !success ? "shown text-red-500 text-sm" : 'hidden' }>{errMsg}</div>
            <div className='flex flex-col justify-center items-center w-3/4 md:w-1/4 h-3/4 mt-20 shadow-lg rounded-lg bg-white'>
            <h1 className='font-bold text-2xl mb-20'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='w-3/4 h-1/2 bg-white flex flex-col'>
                <label htmlFor='username' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Username: </label>
                <input
                    className='border'
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
                <p className={userFocus && user && !validName ? "shown text-red-500 text-xs absolute z-50 bg-white mt-14" : "hidden"}>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Only underscores and hyphens allowed.
                </p>
                <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Email: </label>
                <input
                    className='border'
                    type='text'
                    id='email'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor='password' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Password: </label>
                <input
                    className='border'
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p className={pwdFocus && !validPwd ? "shown text-red-500 text-xs absolute z-50 bg-white mt-40" : "hidden"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, <br />
                            a number and a special character.<br />
                            Allowed special characters: ? ! @ # $ %
                </p>
                <label htmlFor="confirm_pwd" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2'>Confirm Password:</label>
                <input
                    className='border'
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p className={matchFocus && !validMatch ? "shown text-red-500 text-xs absolute z-50 bg-white mt-52" : "hidden"}> 
                    Must match the first password input field.
                </p>
                <br></br>
                <select onChange={handleRole} className='border'>
                    <option id="consumer" value="consumer">Consumer</option>
                    <option id="business" value="business">Business</option>
                </select>
                <br></br>
                <button className='bg-[#7ed957] shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Sign Up</button>
                </form>
                <Link to='/foodtrucks' className='text-sm mt-20'>continue as guest</Link>
        </div>
           {success &&
                <div className='absolute top-0 text-center'>
                    <p>Successfully Registered!</p>
                    <Link to="/login" className='flex-shrink-0 bg-black hover:bg-teal-700 text-sm  text-white py-1 px-3 my-5 rounded'>continue to sign in</Link>
                </div>
            }
            <div className='mt-5 text-center'>
                <h1>Returning User?</h1>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
};

export default Register;