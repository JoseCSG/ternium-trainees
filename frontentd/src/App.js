import './App.css';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Profile from '../src/Pages/Profile/Profile'
import Courses from '../src/Pages/Courses/Courses'
import Login from './Pages/Login/Login';
import NavbarComp from './Components/NavbarComp';
//import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const PrivateRoutes = () => {
    const isAuth = false
    return <>(isAuth ? <Outlet/> : <Navigate to= '/login'/>)</>
  }

  const PublicRoute = () => {
    const isAuth = false;
    return <>(!isAuth ? <Outlet/> ? <Navigate to = 'courses'/>)</>
  }

  return (
    <div className='App'>
      <NavbarComp/>
      <Routes>
      <Route path='/' element={<Home/>}/>

      <Route element = {<PrivateRoutes/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/courses' element={<Courses/>}/>
      </Route>
      <Route element = {<PublicRoute/>}>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
