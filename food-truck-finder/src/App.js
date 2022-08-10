import './App.css';
import TruckList from './components/TruckList';
import FoodTruck from './components/FoodTruck'
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';

function App() {
  const userId = localStorage.getItem('id')
  return (
    <div>
      <Routes>
        {console.log(userId)}
        {userId ?
          <Route path='/' element={<TruckList />} />
        :
          <Route path='/' element={<Welcome />} />
        }
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
