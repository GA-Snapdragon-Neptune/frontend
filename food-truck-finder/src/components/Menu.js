import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import food from '../assets/food.jpg'

const Menu = () => {
    const { id } = useParams()
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/${id}`)
            .then((res) => {
                setMenuItems(res.data.menu)
            })
	}, [id]);
//row-start-1 col-start-2  name

    return (
        <div className='h-3/5 overflow-auto'>
            {menuItems.map((item) => (
                <div key={item._id} className='border h-50 p-4 grid grid-cols-3 gap-x-3'>
                    <img src={food} alt='food'
                    className='rounded-lg w-26 md:w-30 box row-start-1 row-end-4 col-start-1 my-1'
                    />
                    <div className='col-span-2 flex justify-between'><h3 className='h-6 text-sm font-bold py-0 col-start-2 col-span-2'>{item.name}</h3>
                        <p className='text-sm font-bold'>{`$${item.price}`}</p></div>

                    <p className='text-xs box row-start-2 row-end-4 col-start-2 col-end-4 '>{item.description}</p>
                  </div> 
                   ))}
        </div>
    );
};

export default Menu;