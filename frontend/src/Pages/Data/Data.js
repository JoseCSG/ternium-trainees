import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //sin esto no me funcionaba el dropdown
import { getAreas } from '../../api/auth';


const Data = () => {

  const[usuarios,setUsuarios]=useState([]);
  const [areas, setAreas] = useState([]);
  
  const loadUsuarios = async () => {
    const { data } = await axios.get('http://localhost:4000/api/empleados');
    setUsuarios(data)
    localStorage.setItem('correo', '');
  }

  const loadAreas = async () => {
    const { data } = await getAreas();
    setAreas(data);
  };

  const borrarUsuarioInfo = (e, idEmpleado) => {
    e.preventDefault();
    const thisClicked=e.currentTarget
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

  loadAreas();
  loadUsuarios();

  let detallesUsuarios = usuarios.map((item,index)=> {
    const areaUsuario = areas.find((area) => area.idArea === item.idarea);
    return (
      <tr key={index}>
          <td>{item.idempleadoinfo}</td>
          <td>{item.nombre}</td>
          <td>{item.apellidopaterno}</td>
          <td>{item.apellidomaterno}</td>
          <td>{item.genero}</td>
          <td>{(item.fechanacimiento).split('T')[0]}</td>
          <td>{item.pais}</td>
          <td>{item.idempleado}</td>
          <td>{areaUsuario.nombre}</td>
          <td>
            <Link to={`/data/edit/${item.idempleado}`} className='btn btn-success'>EDIT</Link>
          </td>
          <td>
            <button type="button" onClick={(e)=>borrarUsuarioInfo(e, item.idempleado)}  className='btn btn-danger'>BORRAR</button>
          </td>
          <td>
            <Link to={`/data/getRotaciones/${item.idempleadoinfo}`} className='btn btn-info'>VER</Link>
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
                {/*<Link to="/data/create/usuario" className='btn btn-primary float-end'>Agrega Usuario</Link>
                <Link to="/data/create/curso" className='btn btn-primary float-end'>Agrega Curso</Link>*/}
                <div className='dropdown mt-3'>
                  <button className='btn btn-primary dropdown-toggle' type='button' id='triggerId' data-bs-toggle="dropdown">
                    Agregar
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="triggerId">
                    <li><Link to="/data/create/usuario" className='dropdown-item'>Agrega Usuario</Link></li>
                    <li><Link to="/data/create/curso" className='dropdown-item'>Agrega Curso</Link></li>
                  </ul>
                </div>
              </h4>
            </div>

            <div className='card-body'>
              <div className='table table-responsive'>
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
                    <th>AREA </th>
                    <th>EDITAR</th>
                    <th>BORRAR</th>
                    <th>VER</th>
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
    </div>
  )
}

export default Data