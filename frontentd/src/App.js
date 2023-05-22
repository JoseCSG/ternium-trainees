import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Profile from '../src/Pages/Profile/Profile'
import Courses from '../src/Pages/Courses/Courses'
import Login from './Pages/Login/Login';
import NavbarComp from './Components/NavbarComp';
//import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  const isAuth = true
  return (
    <>
      <NavbarComp/>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/profile' element={<Profile/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
