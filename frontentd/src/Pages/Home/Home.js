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
              <h3 className='main-heading'>Our Company</h3>
              <div className='underline mx-auto'></div>
              <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
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
              <h3 className='main-heading'>Our Services</h3>
              <div className='underline mx-auto'></div>
            </div>

            <div className='col-md-4'>
              <div className="card-shadow">
                <img src={foto} className='w-100 border-bottom' alt="Services"/>
                <div className='card-body'>
                  <h6>Service 1</h6>
                  <p>
                  ny variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lore
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