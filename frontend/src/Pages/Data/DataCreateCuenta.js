import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { nuevoEmpleado } from '../../api/auth'

const DataCreateCuenta = () => {
    const[usuario,setUsuario] = useState({
        correo:"",
        contraseña:"",
        idperfil:1
    })

    const handleInput = (e) => {
        e.persist();
        setUsuario({...usuario,[e.target.name]:e.target.value})
    }

    const handlePerfilInput = (e) => {
        setUsuario({...usuario,idperfil:parseInt(e.target.value)});
    }

    const creaCorreoContraseña = async (e) => {
        try {
            localStorage.setItem("correo", usuario.correo)
            await nuevoEmpleado(usuario);
            
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
                                <label>Perfil</label>
                                {/*<input type="number" name="idperfil" value={usuario.idperfil} onChange={handleInput} className="form-control"/>*/}
                                    <select type="number" name="idperfil" value={usuario.idperfil} onChange={handlePerfilInput} className="form-control">
                                        <option value="1">Admin</option>
                                        <option value="2">Trainee</option>
                                    </select>
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
  )
}

export default DataCreateCuenta