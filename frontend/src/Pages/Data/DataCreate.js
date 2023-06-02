import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getIdEmpleado, nuevoEmpleado, nuevoEmpleadoInfo } from "../../api/auth"

function DataCreate(){
    //CONSTANTES PARA AGREGAR A EMPLEADOS_LOGIN
    const[correoEmpleadoNuevo, setCorreoEmpleadoNuevo] = useState({})
    const[usuario,setUsuario] = useState({})

    const handleInput = (e) => {
        e.persist();
        setUsuario({...usuario,[e.target.name]:e.target.value})
    }

    const creaCorreoContraseña = async (e) => {
          e.preventDefault()
        try {
            setCorreoEmpleadoNuevo({"correo": usuario.correo})
            await nuevoEmpleado(usuario);
            alert("Usuario creado")
            
        } catch (error) {
            console.log(error.message)
        }

    }
    //CONSTANTES PARA AGREGAR A EMPLEADOS_INFO
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

    const handleInput2 = (e) => {
        e.persist();
        setUsuarioInfo({...usuarioInfo,[e.target.name]:e.target.value})
    }

    const creaInfoUsuario = async (e) => {
        e.preventDefault()
        try {
            const {data} = await getIdEmpleado(correoEmpleadoNuevo)
            usuarioInfo.idempleado = data.idEmpleado
            await nuevoEmpleadoInfo(usuarioInfo);
            alert("Informacion del nuevo usuario añadida")

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4> Agrega Usuario {' ' + correoEmpleadoNuevo.correo}
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