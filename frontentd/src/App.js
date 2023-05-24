import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Profile from '../src/Pages/Profile/Profile'
import Courses from '../src/Pages/Courses/Courses'
import Login from './Pages/Login/Login';
import NavbarComp from './Components/NavbarComp';
import { useSelector } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const {isAuth} = useSelector((state) => state.auth)

  return (
    <>
      <NavbarComp/>
      <Routes>
        <Route path='/' element={isAuth ? <Home/> : <Login/>}/>
        <Route path='/profile' element = {isAuth ? <Profile/> : <Login/>}/>
        <Route path='/courses' element={isAuth ? <Courses/> : <Login/>}/>
        <Route path='/login' element={!isAuth ? <Login/> : <Home/>}/>   
      </Routes>
    </>
  );
}

export default App;
