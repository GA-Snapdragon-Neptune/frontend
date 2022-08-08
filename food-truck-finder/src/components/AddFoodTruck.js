import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addfoodtruck.css'

const AddFoodTruck = () => {
    const navigate = useNavigate();
    const [newFoodTruck, setNewFoodTruck] = useState({
        name: '',
        location: '',
        menu: [
            {
                name: '',
                price: 0,
                description: '',
            }
        ]
    })

    //add functionality to add additional menu items
    // const [menuItem, setMenuItem] = useState(0)

    // const addMenuItem = () => {
    //     setMenuItem(menuItem + 1);
    // }

    const handleChange = (event) => {
		setNewFoodTruck({ ...newFoodTruck, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Write your POST fetch() or axios() request here
		axios.post(`https://young-anchorage-22001.herokuapp.com/foodtrucks`, newFoodTruck)
            .then(() => {
                console.log(newFoodTruck)
				navigate('/foodtrucks')
			
		}
		)
	};


    return (
        <div>
            <h1>add a food truck</h1>
            <form className='add-truck-form' onSubmit={handleSubmit}>
                <label>Food Truck Name</label>
                <input
                    onChange={handleChange}
                    id='name'
                    placeholder='Food Truck Name'
                    value={newFoodTruck.name}
                />
                <label htmlFor='Address'>Location</label>
                <input
                    onChange={handleChange}
                    id='location'
                    placeholder='Enter address'
                    value={newFoodTruck.location}
                />
                <label>Menu Item</label>
                <input
                    onChange={handleChange}
                    id='menu'
                    placeholder='Name'
                    value={newFoodTruck.menu[0].name}
                    />
                <input
                    onChange={handleChange}
                    id='price'
                    placeholder='Price'
                    value={newFoodTruck.menu[0].price}
                    />
                <input
                    onChange={handleChange}
                    id='description'
                    placeholder='Description'
                    value={newFoodTruck.menu[0].description}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default AddFoodTruck;