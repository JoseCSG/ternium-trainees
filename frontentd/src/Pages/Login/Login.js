import React from "react";
import LoginForm from "./LoginForm";
import './Login.css';

const Login = () => {
  return (
    <>
      <h3 className='text-center my-5'> Welcome </h3>

      {/*FORMATO*/}
      <div className="container">
        <div className="row">
            {/*Sirve para dividir espacio*/}
            <div className="col"></div>

            <div className="col" style={{ backgroundColor: 'rgb(255, 153, 0)' }}>
              <h6 className='text-center my-3'> Log into your account </h6>

              {/*LOGIN*/}
              <LoginForm />

              <br />
              <div className="text-center">
                <a href="/recuperar-contrasena" className="forgot-password-link">
                  Recover password
                </a>
              </div>
              <br />

            </div>

            {/*Sirve para dividir espacio*/}
            <div className="col"></div>

            <div className="text-center my-3">
                <a href="/recuperar-contrasena" className="forgot-password-link">
                  Go back
                </a>
            </div>


        </div>
    </div>

    </>
  );
};

export default Login;