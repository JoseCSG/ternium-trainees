import './App.css';
import {Route, BrowserRouter as Router, Routes, UNSAFE_DataRouterStateContext} from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Profile from '../src/Pages/Profile/Profile'
import Courses from '../src/Pages/Courses/Courses'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/courses' element={<Courses/>}/>
    </Routes>
  );
}

export default App;
