import './App.css';
import TruckList from './components/TruckList';
import FoodTruck from './components/FoodTruck'
import Map from './components/Map'
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import { Routes, Route } from 'react-router-dom';
import AddFoodTruck from './components/AddFoodTruck';
import Welcome from './components/Welcome';

function App() {

  return (
    <div>
      
      <Routes>
        
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<User />} />
        <Route path='/foodtrucks' element={<TruckList />} />
				<Route path='/foodtrucks/:id' element={<FoodTruck />} />
      </Routes>
       
    </div>
  );
}

export default App;
