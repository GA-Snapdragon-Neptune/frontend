import React from 'react';

const Locate = ({ panTo }) => {
    return (
        <div className='locate'>
            <button
                className='bg-black text-white p-3'
                onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                   })
               }, () => null) 
            }}>
                Search my location
            </button>
        </div>
    );
};

export default Locate;