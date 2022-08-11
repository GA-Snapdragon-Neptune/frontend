import { Link } from 'react-router-dom';
import logo from '../assets/Grubtruck.png'

const Welcome = () => {
    const guestMode = () => {
        localStorage.clear()
    }
    return (
        <div className='flex flex-col items-center bg-[#7ed957] h-screen'>
            <img src={logo} alt='grub truck logo' className='w-64 md:w-72 absolute'/>
            <div className='flex flex-col justify-center items-center w-3/4 md:w-1/2 h-3/4 mt-20 shadow-lg rounded-lg bg-white'>
            <Link to='/register' className='shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Get Started</Link>
            <Link to='/login' className='bg-[#7ed957] shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Login</Link>
            <Link to='/foodtrucks' className='text-sm mt-5' onClick={guestMode}>continue as a guest</Link>
            </div>
        </div>
    );
};

export default Welcome;