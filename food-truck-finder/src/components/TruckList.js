import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import AddFoodTruck from './AddFoodTruck';

const TruckList = () => {
    const [foodTruckList, setFoodTruckList] = useState([])

    useEffect(() => {
		//Write your get/fetch here
		axios.get(`https://young-anchorage-22001.herokuapp.com/foodtrucks/`)
            .then((res) => {
                setFoodTruckList(res.data)
            })
    }, []);

    
    return (
        <div>
            this page will display the map with food truck locations with card components for each food truck
            {foodTruckList.map((foodtruck) => (
                <div key={foodtruck._id}>
                    <Link to={foodtruck._id}>{foodtruck.name}</Link>
                </div>
            ))}
            <AddFoodTruck />
        </div>
    );
};

export default TruckList;