import React from 'react'
import './Home.css';
import foto from "../../Images/banner.jpg";
import Slider from '../../Components/Slides';
import VMC from './VMC';
import Footer from '../../Components/Footer';
//console.log(foto);

const Home = () => {
  return (
    <div>

      <Slider/>
      {/*SECTION 1 INTRODUCTION*/}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className='col-md-12 text-center'>
              <h3 className='main-heading'>Nuestra compañia</h3>
              <div className='underline mx-auto'></div>
              <p>
              Contrariamente a la creencia popular, Lorem Ipsum no es simplemente un texto aleatorio. Tiene sus raíces en una pieza de la literatura latina clásica del 45 a. C., por lo que tiene más de 2000 años. Richard McClintock, profesor de latín en Hampden-Sydney College en Virginia, buscó una de las palabras latinas más oscuras, consectetur, en un pasaje de Lorem Ipsum, y al revisar las citas de la palabra en la literatura clásica, descubrió la fuente indudable. Lorem Ipsum proviene de las secciones 1.10.32 y 1.10.33 de "de
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 MISION VISION & VALUES*/}
      <VMC/>


      {/*SECTION 3 SERVICES*/}
      <section className="section border-top">
        <div className="container">
          <div className="row">
            <div className='col-md-12 mb-4 text-center'>
              <h3 className='main-heading'>Nuestros servicios</h3>
              <div className='underline mx-auto'></div>
            </div>

            <div className='col-md-4'>
              <div className="card-shadow">
                <img src={foto} className='w-100 border-bottom' alt="Services"/>
                <div className='card-body'>
                  <h6>Servicio 1</h6>
                  <p style={{ textAlign: "justify" }}>
                  Hay variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por humor inyectado o palabras aleatorias que no parecen ni un poco creíbles. Si vas a usar un pasaje de Lorem Ipsum, debes asegurarte de que no haya nada vergonzoso escondido en medio del texto. Todo el saber
                  </p>
                </div>
              </div>
            </div>

            

          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}


export default Home;