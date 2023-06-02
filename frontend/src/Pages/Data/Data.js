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

  const borrarUsuarioInfo = (e, idempleadoinfo) => {
    e.preventDefault();

    
    const thisClicked=e.currentTarget;
    //thisClicked.innerText="Deleting...";

    axios.delete(`http://localhost:4000/api/empleados/delete/${idempleadoinfo}`)
    .then (res => {
      alert(res.data.message);
      thisClicked.closest('tr').remove();
    })
    .catch (function(error) {
      console.log(error)
    })
  }

  var detallesUsuarios="";
  detallesUsuarios=usuarios.map((item,index)=> {
    return (
      <tr key={index}>
          <td>{item.idempleadoinfo}</td>
          <td>{item.nombre}</td>
          <td>{item.apellidopaterno}</td>
          <td>{item.apellidomaterno}</td>
          <td>{item.genero}</td>
          <td>{item.fechanacimiento}</td>
          <td>{item.pais}</td>
          <td>{item.idempleado}</td>
          <td>{item.idarea}</td>
          <td>
            <Link to={`/data/edit/${item.idempleadoinfo}`} className='btn btn-success'>EDIT</Link>
          </td>
          <td>
            <button type="button" onClick={(e)=>borrarUsuarioInfo(e, item.idempleadoinfo)}  className='btn btn-danger'>BORRAR</button>
          </td>
      </tr>
    );

  });


  
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
                  {detallesUsuarios}
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