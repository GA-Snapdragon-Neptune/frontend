import { Link } from 'react-router-dom';
import logo from '../assets/Grubtruck.png'

const Welcome = () => {
    const deleteSignedIn = () => {
        localStorage.clear()
    }
    return (
        <div className='flex flex-col items-center'>
            <img src={logo} alt='grub truck logo' className='md:w-96'/>
            <div className='flex flex-col items-center w-40'>
            <Link to='/register' className='bg-white border-gray shadow-lg mt-15 py-1 w-full rounded-lg text-center'>Get Started</Link>
            <Link to='/login' className='bg-[#7ed957] shadow-lg mt-5 py-1 w-full rounded-lg text-center'>Login</Link>
            <Link to='/foodtrucks' className='text-sm mt-5' onClick={deleteSignedIn}>continue as a guest</Link>
            </div>
        </div>
    );
};

export default Welcome;