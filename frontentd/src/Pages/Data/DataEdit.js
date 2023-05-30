import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import { getInfoEmpleado } from "../../api/auth";

function DataEdit ()
{
    let {id} = useParams();

    const[usuarioInfo,setUsuarioInfo]=useState({})

    useEffect(() => {
        axios.get(`http://localhost:4000/api/data/${id}/edit`)
        .then(res => {
          console.log(res)
          setUsuarioInfo(res.data.usuarioInfo)
        })
        .catch(error => {
          console.error(error);
        });
      },[id]);

    const handleInput2 = (e) => {
        e.persist();
        setUsuarioInfo({...usuarioInfo,[e.target.name]:e.target.value})
    }
    const creaInfoUsuario = (e) => {
        const data = {
            nombre: usuarioInfo.nombre,
            apellidopaterno: usuarioInfo.apellidopaterno,
            apellidomaterno: usuarioInfo.apellidomaterno,
            genero: usuarioInfo.genero,
            fechanacimiento:usuarioInfo.fechanacimiento,
            pais:usuarioInfo.pais,
            idempleado:usuarioInfo.idempleado,
            idarea:usuarioInfo.idarea
        }

        axios.post('http://localhost:4000/api/adduser',data)
        .then (res=> {
            alert(res.data.message)
        })
        .catch (function(error){
            console.error(error)
        })
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Editar Info Usuario
                                    <Link to='/data' className="btn btn-danger float-end">
                                        Back
                                    </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                    <div className="mb-3">
                                        <label>Nombre</label>
                                        <input type="text" name="nombre" value={usuarioInfo.nombre} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Apellido Paterno</label>
                                        <input tEstadoype="text" name="apellidopaterno" value={usuarioInfo.apellidopaterno} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Apellido Materno</label>
                                        <input tEstadoype="text" name="apellidomaterno" value={usuarioInfo.apellidomaterno} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Genero</label>
                                        <input tEstadoype="text" name="genero" value={usuarioInfo.genero} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Fecha Nacimiento</label>
                                        <input type="date" name="fechanacimiento" value={usuarioInfo.fechanacimiento} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Pais</label>
                                        <input tEstadoype="text" name="pais" value={usuarioInfo.pais} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>ID Empleado</label>
                                        <input type="number" name="idempleado" value={usuarioInfo.idempleado} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>ID Area</label>
                                        <input type="number" name="idarea" value={usuarioInfo.idarea} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary"  onClick={creaInfoUsuario}>Agregar Info Usuario</button>
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DataEdit