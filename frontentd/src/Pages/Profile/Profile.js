import React from 'react';
import './Profile.css';
import foto from '../../Images/logo.png';

const Profile = () => {
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
            <br />
            <br />

            nombre de usuario
            <br />
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
                
              <div class="col">
                <div class="card px-4 my-5" style={{width: '15rem', height: '25'}}>
                <img src="https://in-crescendo.org/wp-content/uploads/2017/11/teamwork.png" 
                    class="card-img-top" 
                    alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">Teamwork</h5>
                  <p class="card-text">Al terminar el curso TC10274 te ganaste esta medalla ¡felicidades!</p>
                  <a href="http://localhost:3000/courses" class="btn btn-custom">Ir a curso</a>
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