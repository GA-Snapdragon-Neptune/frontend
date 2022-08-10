import './App.css';
import TruckList from './components/TruckList';
import FoodTruck from './components/FoodTruck'
import { Routes, Route } from 'react-router-dom';
import AddFoodTruck from './components/AddFoodTruck';
import AddReview from './components/AddReview';
import DeleteReview from './components/deleteReview';
import UpdateReview from './components/updateReview';
import EditForm from './components/EditForm';

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
				<Route path='/' element={<AddFoodTruck />}/>
        <Route path='/foodtrucks' element={<TruckList />} />
				<Route path='/foodtrucks/:id' element={<FoodTruck />} />
        <Route path='/reviews' element={<AddReview />} />
        <Route path='/reviews/:reviewId/edit' element={<EditForm />} />
        {/* <Route path='/reviews/:id/deleteReview' element={<DeleteReview />} /> */}
        {/* <Route path='/reviews/:id/updateReview' element={<UpdateReview />} /> */}
			</Routes>
    </div>
  );
}

export default App;
