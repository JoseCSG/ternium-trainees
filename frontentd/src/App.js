import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Profile from '../src/Pages/Profile/Profile'
import Courses from '../src/Pages/Courses/Courses'
import Game from '../src/Pages/Game/Game'
import Login from './Pages/Login/Login';
import NavbarComp from './Components/NavbarComp';
import { useSelector } from 'react-redux';
import Data from './Pages/Data/Data';
//import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const {isAuth} = useSelector((state) => state.auth)
  //const {isAdmin} =  useSelector((state) => state.auth)
  const {isAdmin} = useSelector((state) => state.auth)

  return (
    <>
      <NavbarComp/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element = {isAuth && !isAdmin ? <Profile/> : <Login/>}/>
        <Route path='/courses' element={isAuth && !isAdmin ? <Courses/> : <Login/>}/>
        <Route path='/game' element={isAuth && !isAdmin ? <Game/> : <Login/>}/>
        <Route path='/login' element={!isAuth ? <Login/> : <Home/>}/>
        <Route path='/data' element={isAuth && isAdmin ? <Data/> : <Home/>}/>
      </Routes>
    </>
  );
}

export default App;
