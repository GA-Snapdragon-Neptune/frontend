import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './menu.css'
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
        <div>
            {menuItems.map((item) => (
                <div key={item._id} className='h-50 border-b border-dotted p-4 grid overflow-hidden grid-cols-3 gap-x-2'>
                    <img src={food} alt='food'
                    className='rounded-lg w-26 md:w-30 box row-start-1 row-end-4 col-start-1 my-1'
                    />
                    <h3 className='h-6 text-sm font-bold py-0 col-start-2'>{item.name}</h3>
                    <p className='h-6 text-sm text-right py-0 box col-end-4 font-semibold'>{item.price}</p>
                    <p className='text-xs box row-start-2 row-end-4 col-start-2 col-end-4 '>{item.description}</p>
                  </div> 
                   ))}
        </div>
    );
};

export default Menu;