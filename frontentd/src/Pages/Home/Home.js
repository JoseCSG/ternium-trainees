import React from 'react'
import './Home.css';
import Header from '../../Components/Header/Header';
import foto from '../../Images/banner.jpg';
//import fotoback from '../../Images/organgespot.png';


//console.log(foto);

/*const Home = () => {
  return (
    <div>
      <Header/>
      <h1>Home</h1>
      <img src={foto} alt="Logo" />
      <h2>hola</h2>
      <p>texto texto texto</p>
    </div>
  )
}*/

const Home = () => {
  return (
    <div className='home-container'>
      <Header/>
      <h1>Home</h1>
      
      <div className='home-banner1-container'>
        <div className='home-image-banner1-container'>
          <img src={foto} alt="Logo" />

        </div>
        <div className='home-textsection-banner1-container'>
          <h1 className='primary-heading'>
            Bienvenidos a Ternium
          </h1>
          <p className='main-text'>
            text text text
          </p>
        </div>


      </div>
    </div>
  )
}

export default Home;