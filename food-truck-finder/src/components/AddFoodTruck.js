import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BiArrowBack, BiUserCircle } from 'react-icons/bi'
import axios from 'axios';

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
				// navigate(`/foodtrucks/${id}`)
			
		}
		)
    };
    


    return (
        <div className='border'>
            <h1 className='text-center mb-10'>add a food truck</h1>
            <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <label htmlFor='foodtruck-name'>Food Truck Name</label>
                <input
                    onChange={handleChange}
                    id='name'
                    placeholder='Food Truck Name'
                    value={newFoodTruck.name}
                    className='border'
                />
                <label htmlFor='address'>Location</label>
                <input
                    onChange={handleChange}
                    id='location'
                    placeholder='Enter address'
                    value={newFoodTruck.location}
                    className='border'
                />
                <label>Menu Item</label>
                <input
                    onChange={handleMenuChange}
                    placeholder='Name'
                    value={newFoodTruck.menu.name}
                    className='border'
                    />
                <input
                    onChange={handlePrice}
                    id='price'
                    placeholder='Price'
                    defaultValue={newFoodTruck.menu.price}
                    className='border'
                    />
                <input
                    onChange={handleDescription}
                    id='description'
                    placeholder='Description'
                    defaultValue={newFoodTruck.menu.description}
                    className='border'
                />
                <button type='submit' className='border bg-black text-white px-2'>Submit</button>
            </form>
        </div>
    );
};

export default AddFoodTruck;