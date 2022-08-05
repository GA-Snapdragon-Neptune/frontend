import './App.css';
import FoodTruckList from './components/FoodTruckList';
import FoodTruck from './components/FoodTruck'
import { Routes, Route } from 'react-router-dom';

function App() {

  //create nav and links with react router
  //'/' to home/login in page
  //'/signup' for new user
  //'/signin' for existing user
  //'/foodtrucks' to map link with nearest food trucks rendered
  //'/foodtrucks/:id' to individual food truck site


  return (
    <div className="App">
      <Routes>
				<Route path='/' />
        <Route path='/foodtrucks' element={<FoodTruckList />} />
				<Route path='/foodtrucks/:id' element={<FoodTruck />} />
			</Routes>
    </div>
  );
}

export default App;
