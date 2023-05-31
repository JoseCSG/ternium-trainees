import React from 'react'
//import {Route, Routes} from 'react-router-dom'
//import NuevoEmpleado from './NuevoEmpleado';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { getEmpleadosTodos } from '../../api/auth';
import { borrarUsuario } from '../../api/auth';

const Data = () => {

  const[usuarios,setUsuarios]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/empleados')
    .then(res => {
      console.log(res)
      setUsuarios(res.data)
    })
    .catch(error => {
      console.error(error);
    });
  },[]);

  const borrarUsuarioInfo = (e, idEmpleado) => {
    e.preventDefault();
    const thisClicked=e.currentTarget;
    //thisClicked.innerText="Deleting...";

    axios.delete(`http://localhost:4000/api/empleados/delete/${idEmpleado}`)
    .then (res => {
      alert(res.data.message);
      thisClicked.closest('tr').remove();
    })
    .catch (function(error) {
      console.log(error)
    })
  }
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4> Lista de Usuarios
                {/*<Link to="/nuevousuario" className='btn btn-primary float-end'>Agrega Usuario</Link>*/}
                <Link to="/data/create" className='btn btn-primary float-end'>Agrega Usuario</Link>
              </h4>
            </div>

            <div className='card-body'>
              <table className='table table-stripped'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO PATERNO</th>
                    <th>APELLIDO MATERNO</th>
                    <th>GENERO</th>
                    <th>FECHA NAC</th>
                    <th>PAIS</th>
                    <th>ID EMP</th>
                    <th>ID AREA </th>
                    <th>EDITAR</th>
                    <th>BORRAR</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios.map((usuario,index)=> {
                      return (
                        <tr key={index}>
                            <td>{usuario.idempleadoinfo}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidopaterno}</td>
                            <td>{usuario.apellidomaterno}</td>
                            <td>{usuario.genero}</td>
                            <td>{usuario.fechanacimiento}</td>
                            <td>{usuario.pais}</td>
                            <td>{usuario.idempleado}</td>
                            <td>{usuario.idarea}</td>
                            <td>
                              <Link to={`/data/${usuario.idempleado}/edit`} className='btn btn-success'>EDIT</Link>
                            </td>
                            <td>
                              <button type="button" onClick={(e)=>borrarUsuarioInfo(e, usuario.idempleado)}  className='btn btn-danger'>BORRAR</button>
                            </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Data