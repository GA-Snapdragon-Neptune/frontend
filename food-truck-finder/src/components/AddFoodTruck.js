import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './addfoodtruck.css'

const AddFoodTruck = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [newFoodTruck, setNewFoodTruck] = useState({
        name: '',
        location: '',
        menu: [{

        }],
        owner: {
            _id: "62ed65349d3864f3942ad6c6"
        }
    })

    //add functionality to add additional menu items
    // const [menuItem, setMenuItem] = useState(0)

    // const addMenuItem = () => {
    //     setMenuItem(menuItem + 1);
    // }


    const handleChange = (event) => {
		setNewFoodTruck({ ...newFoodTruck, [event.target.id]: event.target.value });
    };
    
    const handleMenuChange = (event) => {
        setNewFoodTruck(current => {
            const menu = { ...current.menu }
            menu.name = event.target.value
            return {...current, menu}
        })
    }

    const handlePrice = (event) => {
        setNewFoodTruck(current => {
            const menu = { ...current.menu }
            menu.price = event.target.value
            return { ...current, menu}
        })
    }
    const handleDescription = (event) => {
        setNewFoodTruck(current => {
            const menu = { ...current.menu }
            menu.description = event.target.value
            return { ...current, menu}
        })
    }

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post(`https://young-anchorage-22001.herokuapp.com/foodtrucks`, newFoodTruck)
            .then(() => {
                console.log(newFoodTruck)
				navigate(`/foodtrucks/`)
			
		}
		)
    };
    


    return (
        <div>
            <h1>add a food truck</h1>
            <form className='add-truck-form' onSubmit={handleSubmit}>
                <label htmlFor='foodtruck-name'>Food Truck Name</label>
                <input
                    onChange={handleChange}
                    id='name'
                    placeholder='Food Truck Name'
                    value={newFoodTruck.name}
                />
                <label htmlFor='address'>Location</label>
                <input
                    onChange={handleChange}
                    id='location'
                    placeholder='Enter address'
                    value={newFoodTruck.location}
                />
                <label>Menu Item</label>
                <input
                    onChange={handleMenuChange}
                    // id='menu.name'
                    placeholder='Name'
                    value={newFoodTruck.menu.name}
                    />
                <input
                    onChange={handlePrice}
                    id='price'
                    placeholder='Price'
                    defaultValue={newFoodTruck.menu.price}
                    />
                <input
                    onChange={handleDescription}
                    id='description'
                    placeholder='Description'
                    defaultValue={newFoodTruck.menu.description}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default AddFoodTruck;