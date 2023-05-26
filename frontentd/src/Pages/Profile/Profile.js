import React, { useState } from 'react';
import './Profile.css';
import foto from '../../Images/logo.png';
import { getInfoEmpleado } from '../../api/auth';

const Profile = () => {
  
  const [infoEmpleado, setInfoEmpleado] = useState({})
  const infoEmpleadoAux =  async () => {
    const idJSON = {
      "idempleado": localStorage.getItem('idEmpleado')
    }
    const {data}  = await getInfoEmpleado(idJSON)
    setInfoEmpleado(data[0])
  }
  infoEmpleadoAux()
  /*
    Datos guardados en infoEmpleado:
     nombre, apellidopeterno, apellidomaterno, pais, genero,
     fechanacimiento, idempleado, idarea
  */
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

            <div className="underline mx-auto"></div>

            <img 
              src="https://jarroba.com/foro/?qa=image&qa_blobid=11099619010778415938&qa_size=200" 
              className="card-img-top profile-image" 
              alt="Foto de perfil"
            />
            <br />
            <br />

            <p className="px-2 my-3" style={{ textAlign: 'center', margin: 'auto' }}>{infoEmpleado.nombre + ' ' +  infoEmpleado.apellidopaterno}</p>
            <br />
            <p className="px-2 my-3" style={{ textAlign: 'center', margin: 'auto' }}>correo@gmail.com</p>

            <br />
            <br />
            <br />
            <br />

            <button type="button" className="btn btn-secondary btn-sm button-center">Editar perfil</button>

            <br />
            <br />
            <br />
            <br />

          </div>

          <div className="col-9">
          <h3 className="px-2 my-3" style={{ textAlign: 'center', margin: 'auto' }}>Perfil</h3>
            {/* SECTION 2 PROFILE INFO */}
            <div className="row px-5">
              <div className="row-content px-4 my-10" style={{ backgroundColor: 'rgb(212, 212, 212)' }}>
                  <img 
                  src="https://jarroba.com/foro/?qa=image&qa_blobid=11099619010778415938&qa_size=200" 
                  className="card-img-top profile-image-2" 
                  alt="Foto de perfil 2"
                  />

                  <h5 className="header5">Nombre de usuario</h5>
                  <br />
                  <br />
                  <br />
                  <p className="p1">Area de trabajo</p>
                  <br />
                  <br />
                  <br />
                  <h6 className="header5">Datos</h6>
              </div>
            </div>

            {/* SECTION 3 MEDALS */}
            <div className="row px-5">
              <div className="row-content px-4 my-5" style={{ backgroundColor: 'rgb(212, 212, 212)' }}>
              
              <h5 className="header5">Medallas ganadas</h5>
              <br />
                
              <div className="col">
                <div className="card px-4 my-5" style={{ width: '15rem', height: '25' }}>
                  <img src="https://in-crescendo.org/wp-content/uploads/2017/11/teamwork.png" className="card-img-top" alt="..." />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="text-center">
                      <h5 className="card-title">Teamwork</h5>
                    </div>
                    <div>
                      <p className="card-text" style={{ textAlign: 'justify' }}>Al terminar el curso TC10274 te ganaste esta medalla ¡felicidades!</p>
                    </div>
                    <div className="text-center my-4">
                      <a href="http://localhost:3000/courses" className="btn btn-custom">Ir a curso</a>
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;