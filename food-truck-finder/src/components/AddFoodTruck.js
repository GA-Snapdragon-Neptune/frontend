import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

//   getGeocode(coordinates)
      
//   .then((results) => {
//     const { lat, lng } = getLatLng(results[0]);
//       setMarkers(current => [...current, { name: foodtruck.name, address: foodtruck.location, id: foodtruck._id, ratings: foodtruck.ratings, lat, lng }])
      
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
        setNewFoodTruck({ ...newFoodTruck, menu: menus });
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

    let newObj = newFoodTruck
    
	const handleSubmit = (event) => {
        event.preventDefault();


        const location = {
            address: newFoodTruck.location
        }

        getGeocode(location)
            .then((res) => {
                const { lat, lng } = getLatLng(res[0]);
                
                console.log({ lat, lng })
                newObj.coordinate = ({ lat: lat, lng: lng })
                console.log(newObj)
                axios({
                    method: 'post',
                    url:`https://young-anchorage-22001.herokuapp.com/foodtrucks`,
                    data: newObj,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                    }
                })
                    .then((res) => {
                        navigate(`/foodtrucks/${res.data._id}`)
                        console.log(res)
                }
                )
        })


		// axios({
        //     method: 'post',
        //     url:`https://young-anchorage-22001.herokuapp.com/foodtrucks`,
        //     data: newObj,
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}` 
        //     }
        // })
        //     .then((res) => {
        //         navigate(`/foodtrucks/${res.data._id}`)
        //         console.log(res)
		// }
		// )
    };
    
    const [visible, setIsVisible] = useState(false)


    return (
        <div>
            <h1 onClick={() => setIsVisible(!visible)} className='cursor-pointer font-bold text-left my-5 border-b w-3/4'>Add a Food Truck</h1>
            {visible ? 
            <>
            <form>
                <label htmlFor='name' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Food Truck Name</label>
                <input
                    className='border mb-5'
                    onChange={handleChange}
                    id='name'
                    // placeholder='Food Truck Name'
                    value={newFoodTruck.name}
                />
                <label htmlFor='location' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Location</label>
                        <input
                            className='border'
                    onChange={handleChange}
                    id='location'
                    placeholder='Enter valid address'
                    value={newFoodTruck.location}
                />

                {menus.map((menu, index) => {
                    return (
                        <div key={index}>
                            <label className='mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Item Name</label>
                            <input
                                className='border'
                                name='name'
                                placeholder='Name'
                                value={menu.name}
                                onChange={e => handleMenuChange(e, index)}
                                />
                                <label className='mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Item Price</label>
                            <input
                                type='number'
                                className='border'
                                name='price'
                                placeholder='Price'
                                value={menu.price}
                                onChange={e => handleMenuChange(e, index)}
                                />
                                <label className='mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Description</label>
                            <textarea
                                className='border'
                                name='description'
                                placeholder='Description'
                                value={menu.description}
                                onChange={e => handleMenuChange(e, index)}
                                />
                            <button onClick={() => removeFields(index)} className='mx-5 flex-shrink-0 bg-red-500 hover:bg-red-700 text-sm  text-white py-1 px-2 rounded sm:mt-5 '>- Remove Menu Item</button>
                        </div>
                    )
                })}
            </form>
            <button onClick={addFields} className='mt-5 flex-shrink-0 bg-white border text-sm py-1 px-2 rounded'> + Add Menu Item</button>
            <div className='mt-5'>
                    <button type='submit' onClick={handleSubmit} className='flex-shrink-0 bg-[#7ed957] hover:bg-teal-700 text-sm  text-white py-1 px-2 rounded'>Submit New Food Truck</button>
                    <br></br>
                        <button type='submit' onClick={() => setIsVisible(!visible)} className='mt-3 flex-shrink-0 bg-black hover:bg-teal-700 text-sm text-white py-1 px-2 rounded'>Cancel</button>
            </div>
                
            </>
        : null }
        </div>
    );
};

export default AddFoodTruck;