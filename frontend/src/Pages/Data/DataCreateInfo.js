import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getIdEmpleado, nuevoEmpleadoInfo } from '../../api/auth'

const DataCreateInfo = () => {
    const navigator = useNavigate()
    const[usuarioInfo,setUsuarioInfo]=useState({
        idempleado: "",
        nombre: "",
        apellidopaterno: "",
        apellidomaterno: "",
        genero: "",
        pais: "",
        fechanacimiento: "",
        idarea: ""
    })

    const handleInput = (e) => {
        e.persist();
        setUsuarioInfo({...usuarioInfo,[e.target.name]:e.target.value})
    }

    const creaInfoUsuario = async (e) => {
        e.preventDefault()
        try {
            const {data} = await getIdEmpleado({"correo": localStorage.getItem("correo")})
            usuarioInfo.idempleado = data.idEmpleado
            await nuevoEmpleadoInfo(usuarioInfo);
            navigator("/data")

        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h4> Agrega Informacion Usuario
                            {/*<Link to="/nuevousuario" className='btn btn-primary float-end'>Agrega Usuario</Link>*/}
                        </h4>
                    </div>

                    <div className='card-body'>
                        <form>
                            <div className="mb-3">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={usuarioInfo.nombre} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>Apellido Paterno</label>
                                <input tEstadoype="text" name="apellidopaterno" value={usuarioInfo.apellidopaterno} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>Apellido Materno</label>
                                <input tEstadoype="text" name="apellidomaterno" value={usuarioInfo.apellidomaterno} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>Genero</label>
                                <select type="text" name="genero" value={usuarioInfo.genero} onChange={handleInput} className="form-control">
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Fecha Nacimiento</label>
                                <input type="date" name="fechanacimiento" value={usuarioInfo.fechanacimiento} onChange={handleInput} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label>Pais</label>
                                <input tEstadoype="text" name="pais" value={usuarioInfo.pais} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>ID Area</label>
                                <select type="number" name="idarea" value={usuarioInfo.idarea} onChange={handleInput} className="form-control">
                                        <option value="1">Recursos Humanos</option>
                                        <option value="2">Mantenimiento</option>
                                        <option value="3">Operaciones</option>
                                        <option value="4">Supply Chain</option>
                                        <option value="5">Ingenieria y Proyectos</option>
                                        <option value="6">Medio Ambiente</option>
                                        <option value="7">Seguridad</option>
                                        <option value="8">Comercial</option>
                                        <option value="9">Administracion y Finanzas</option>
                                        <option value="10">Auditoria y Legal</option>
                                        <option value="11">Comunicaciones</option>
                                </select>
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
  )
}

export default DataCreateInfo