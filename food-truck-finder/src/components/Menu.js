import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './menu.css'

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

return (
        <div>
            {menuItems.map((item) => (
                <div key={item._id}>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                  </div> 
                   ))}
        </div>
    );
};

export default Menu;