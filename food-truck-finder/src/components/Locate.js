import React from 'react';

const Locate = ({ panTo }) => {
    return (
        <div className='absolute z-10'>
            <button
                className='bg-white text-black shadow-md p-2 mt-2 rounded-lg'
                onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                   })
               }, () => null) 
            }}>
               show food trucks near me
            </button>
        </div>
    );
};

export default Locate;