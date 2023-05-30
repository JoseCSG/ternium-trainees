import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function DataCreate()
{
    //CONSTANTES PARA AGREGAR A EMPLEADOS_LOGIN
    const[usuario,setUsuario]=useState({
        correo:'',
        contraseña:'',
        estado:'',
        idperfil:''
    })

    const handleInput = (e) => {
        e.persist();
        setUsuario({...usuario,[e.target.name]:e.target.value})
    }

    const creaCorreoContraseña = (e) => {
        const data = {
            correo: usuario.correo,
            contraseña: usuario.contraseña,
            estado: usuario.estado,
            idperfil: usuario.idperfil
        }

        axios.post('http://localhost:4000/api/adduserInit',data)
        .then (res=> {
            alert(res.data.message)
        })
        .catch (function(error){
            console.error(error)
        })
    }

    //CONSTANTES PARA AGREGAR A EMPLEADOS_INFO
    const[usuarioInfo,setUsuarioInfo]=useState({
        nombre:'',
        apellidopaterno:'',
        apellidomaterno:'',
        genero:'',
        fechanacimiento:'',
        pais:'',
        idempleado:'',
        idarea:''
    })

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
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4> Agrega Usuario
                                        {/*<Link to="/nuevousuario" className='btn btn-primary float-end'>Agrega Usuario</Link>*/}
                                        <Link to="/data" className='btn btn-danger float-end'>Back</Link>
                                    </h4>
                                </div>

                            <div className='card-body'>
                                <form>
                                    <div className="mb-3">
                                        <label>Correo</label>
                                        <input type="text" name="correo" value={usuario.correo} onChange={handleInput} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Contraseña</label>
                                        <input type="text" name="contraseña" value={usuario.contraseña} onChange={handleInput} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Estado</label>
                                        <input type="number" name="estado" value={usuario.estado} onChange={handleInput} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>ID Perfil</label>
                                        <input type="number" name="idperfil" value={usuario.idperfil} onChange={handleInput} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary"  onClick={creaCorreoContraseña}>Agregar Usuario</button>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*SEGUNDA FORMS PARA AGREGAR USUARIO*/}
            <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4> Agrega Informacion Usuario
                                        {/*<Link to="/nuevousuario" className='btn btn-primary float-end'>Agrega Usuario</Link>*/}
                                        <Link to="/data" className='btn btn-danger float-end'>Back</Link>
                                    </h4>
                                </div>

                            <div className='card-body'>
                                <form>
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
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default DataCreate