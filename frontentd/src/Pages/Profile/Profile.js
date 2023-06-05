<<<<<<< Updated upstream:frontentd/src/Pages/Profile/Profile.js
import React from 'react';
import './Profile.css';
import foto from '../../Images/logo.png';

const Profile = () => {
=======
import React, { useState, useEffect } from 'react';
import './Profile.css';
import foto from '../../Images/logo.png';
import { getInfoEmpleado, getAreas } from '../../api/auth';
import Checkbox from '../../Components/Check box/Checkbox';

const Profile = () => {
  const [infoEmpleado, setInfoEmpleado] = useState({})
  const [areas, setAreas] = useState([])

  const loadProfileInfo =  async () => {
    const idJSON = {
      "idempleado": localStorage.getItem('idEmpleado')
    }
    const {data}  = await getInfoEmpleado(idJSON)
    setInfoEmpleado(data)
  }
  loadProfileInfo()

  const loadAreas = async () => {
    const {data} = await getAreas(); 
    console.log(data);
    setAreas(data);
  };

  useEffect(() => {
    loadAreas();
  }, []) 
 
  /*
    Datos guardados en infoEmpleado:
     nombre, apellidopeterno, apellidomaterno, pais, genero,
     fechanacimiento, idempleado, idarea
  */

>>>>>>> Stashed changes:frontend/src/Pages/Profile/Profile.js
  return (
    <div>

      <div className="container">
        <div className="row">
          {/* SECTION 1 PROFILE OPTIONS */}
          <div className="col-3" style={{ backgroundColor: 'rgb(255, 153, 0)' }}>
            <img 
              src={foto} 
              className='logo-image' 
              alt="Logo"
            />

            <br />
            <div className="underline mx-auto"></div>

            <img 
              src="https://jarroba.com/foro/?qa=image&qa_blobid=11099619010778415938&qa_size=200" 
              className="card-img-top profile-image" 
              alt="Foto de perfil"
            />
            <br /> <br />

            nombre de usuario
            <br />
<<<<<<< Updated upstream:frontentd/src/Pages/Profile/Profile.js
            correo@gmail.com

            <br />
            <br />
            <br />
            <br />

            <button type="button" class="btn btn-secondary btn-sm">Editar perfil</button>

            <br />
            <br />
            <br />
            <br />

          </div>

          <div className="col-9">
            <h3 className="px-2 my-3">Profile</h3>
=======
            <p className="px-2 my-3" style={{ textAlign: 'center', margin: 'auto' }}>{infoEmpleado.correo}</p>
          </div>

          <div className="col-9">
            <br />
            <h3 className="px-2" style={{ textAlign: 'center', margin: 'auto' }}>Perfil</h3>
           
>>>>>>> Stashed changes:frontend/src/Pages/Profile/Profile.js
            {/* SECTION 2 PROFILE INFO */}
            <div className="row px-5">
              <div className="column px-4 my-3" style={{ backgroundColor: 'rgb(212, 212, 212)' }}>
                <div className="row my-3">
                  <h5 className="header5 px-3">Información Personal</h5>
                  
                  <div className="col-4">
                    <img 
                      src="https://jarroba.com/foro/?qa=image&qa_blobid=11099619010778415938&qa_size=200" 
                      className="card-img-top profile-image-2" 
                      alt="Foto de perfil 2"
                    />
                  </div>

<<<<<<< Updated upstream:frontentd/src/Pages/Profile/Profile.js
                  <h5 className="header5">Nombre de usuario</h5>
                  <br />
                  <br />
                  <br />
                  <p className="p1">Area de trabajo</p>
                  <br />
                  <br />
                  <br />
                  <h6 className="header5">Datos</h6>
=======
                  <div className="col-4">
                    <p>Encuadre actual:</p>
                    <p>Fecha inicio:</p>
                    <p>Fecha graduación:</p>
                    <p>Dirección:</p>
                    <p>Jefe:</p>
                  </div>

                  <div className="col-4">
                    <p>{infoEmpleado.area}</p>
                    <p>{infoEmpleado.fechaInicio}</p>
                    <p>{infoEmpleado.fechaGraduacion}</p>
                    <p>Direccion</p>
                    <p>{infoEmpleado.jefe}</p>
                  </div>

                </div>
>>>>>>> Stashed changes:frontend/src/Pages/Profile/Profile.js
              </div>
            </div>

            {/* SECTION 3 MEDALS */}
            <div className="row px-5">
<<<<<<< Updated upstream:frontentd/src/Pages/Profile/Profile.js
              <div className="row-content px-4 my-5" style={{ backgroundColor: 'rgb(212, 212, 212)' }}>
              
              <h5 className="header5">Medallas ganadas</h5>
              <br />
                
              <div class="col">
                <div class="card px-4 my-5" style={{width: '15rem', height: '25'}}>
                <img src="https://in-crescendo.org/wp-content/uploads/2017/11/teamwork.png" 
                    class="card-img-top" 
                    alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">Teamwork</h5>
                  <p class="card-text">Al terminar el curso TC10274 te ganaste esta medalla ¡felicidades!</p>
                  <a href="#" class="btn btn-custom">Ir a curso</a>
                </div>
                </div> 
              </div>

=======
              <div className="column px-4 my-4" style={{ backgroundColor: 'rgb(212, 212, 212)' }}>
                <div className="row my-3">
                  <h5 className="header5 px-3">Áreas de Interés</h5>
                  {
                    areas.map((area) => {
                      console.log(area.nombre);
                      return <Checkbox nombre={area.nombre}/>;
                    })
                  }
                </div>
              </div>
            </div>

            {/* SECTION 4 RENUMERACIÓN */}
            <div className="row px-5 my-3">
              <div className="column px-4" style={{ backgroundColor: 'rgb(212, 212, 212)'}}>
                <div className="row my-3 justify-content-center">
                  <h5 className="header5 px-3">Renumeración</h5>
                    <div className="col-3 my-2 px-3" style={{ backgroundColor: 'white' }}>
                      <br />
                      <p className="">Sueldo correspondiente:</p>
                      <p className="">Encuadre actual:</p>
                    </div>
                    
                    <div className="col-2 my-2" style={{ backgroundColor: 'white' }}>
                      <br />
                      <p className="">{infoEmpleado.sueldo}</p>
                      <p className="">{infoEmpleado.area}</p>
                    </div>

                    <div className="col-1 my-2">
                      <div className="vertical-line"></div>
                    </div>

                    <div className="col-3 my-2" style={{ backgroundColor: 'white' }}>
                      <h6 className="my-1">Fechas importantes</h6>
                      <p className="">Próximo adelanto PTU:</p>
                      <p className="">Fondo de ahorro:</p>
                    </div>

                    <div className="col-2 my-2" style={{ backgroundColor: 'white' }}>
                      <h6 className="my-1" style={{ color: 'white' }}> . </h6>
                      <p className="">{infoEmpleado.PTU}</p>
                      <p className="">{infoEmpleado.fondoAhorro}</p>
                    </div>
                </div>
>>>>>>> Stashed changes:frontend/src/Pages/Profile/Profile.js
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;