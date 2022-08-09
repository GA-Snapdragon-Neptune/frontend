import './App.css';
import TruckList from './components/TruckList';
import FoodTruck from './components/FoodTruck'
import { Routes, Route } from 'react-router-dom';
import AddFoodTruck from './components/AddFoodTruck';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';

function App() {

  //create nav and links with react router
  //'/' to home/login in page
  //'/signup' for new user
  //'/signin' for existing user
  //'/foodtrucks' to map link with nearest food trucks rendered
  //'/foodtrucks/:id' to individual food truck site


  return (
    <div className="App">
      nav bar
      <Routes>
				<Route path='/' />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<User />} />
        <Route path='/foodtrucks' element={<TruckList />} />
				<Route path='/foodtrucks/:id' element={<FoodTruck />} />
        <Route path='/add' element={<AddFoodTruck />} />
			</Routes>
    </div>
  );
}

export default App;
