import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='mt-20 text-2xl font-bold'>App Name</h1>
            <Link to='/register' className='bg-white border-gray shadow-lg mt-10 px-5 py-1 rounded-lg'>Get Started</Link>
            <Link to='/login' className='bg-green-300 shadow-lg mt-5 px-10 py-1 rounded-lg'>Login</Link>
            <Link to='/foodtrucks' className='text-sm mt-5'>continue as a guest</Link>
        </div>
    );
};

export default Welcome;