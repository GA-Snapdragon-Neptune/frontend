import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './addfoodtruck.css'

const AddFoodTruck = () => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([
        {
            name: '',
            price: 0,
            description: ''
        }
    ])

    const [newFoodTruck, setNewFoodTruck] = useState({
        name: '',
        location: '',
        menu: menus,
        owner: { _id: localStorage.getItem('id') || '' }
    })

    const handleChange = (event) => {
		setNewFoodTruck({ ...newFoodTruck, [event.target.id]: event.target.value });
    };
    
    const handleMenuChange = (event, index) => {
        let data = [...menus]
        data[index][event.target.name] = event.target.value
        setMenus(data)
    };
    const addFields = () => {
        let object = {
            name: '',
            price: 0,
            description: ''
        }
    
        setMenus([...menus, object])
      }
    const removeFields = (index) => {
        let data = [...menus];
        data.splice(index, 1)
        setMenus(data)
    }

	const handleSubmit = (event) => {
		event.preventDefault();
        setNewFoodTruck({ ...newFoodTruck, menu: menus });
		axios({
            method: 'post',
            url:`http://localhost:8000/foodtrucks`,
            data: newFoodTruck,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
            .then((res) => {
                navigate(`/foodtrucks/${res.data._id}`)
		}
		)
    };
    


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1>add a food truck</h1>
            <form className='add-truck-form'>
                <label htmlFor='name'>Food Truck Name</label>
                <input
                    onChange={handleChange}
                    id='name'
                    placeholder='Food Truck Name'
                    value={newFoodTruck.name}
                />
                <label htmlFor='location'>Location</label>
                <input
                    onChange={handleChange}
                    id='location'
                    placeholder='Enter address'
                    value={newFoodTruck.location}
                />
                <label>Menu Item</label>
                {menus.map((menu, index) => {
                    return (
                        <div key={index}>
                            <input
                                name='name'
                                placeholder='Name'
                                value={menu.name}
                                onChange={e => handleMenuChange(e, index)}
                                />
                            <input
                                name='price'
                                placeholder='Price'
                                value={menu.price}
                                onChange={e => handleMenuChange(e, index)}
                                />
                            <input
                                name='description'
                                placeholder='Description'
                                value={menu.description}
                                onChange={e => handleMenuChange(e, index)}
                                />
                            <button onClick={() => removeFields(index)}>Remove</button>
                        </div>
                    )
                })}
            </form>
            <button onClick={addFields}>Add Menu Item</button>
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default AddFoodTruck;