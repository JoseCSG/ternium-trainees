import './NuevoEmpleado.css';
import { useState } from 'react';

const NuevoEmpleado = () => {


    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [estado, setEstado] = useState("");
    const [idperfil, setIdPerfil] = useState("");


    const [nombre, setNombre] = useState("");
    const [apellidopaterno, setApellidoPaterno] = useState("");
    const [apellidomaterno, setApellidoMaterno] = useState("");
    const [genero, setGenero] = useState("");
    const [fechanacimiento, setFechaNacimiento] = useState("");
    const [pais, setPais] = useState("");
    const [idempleado, setIdEmpleado] = useState("");
    const [idarea, setIdArea] = useState("");


    const agregaUsuario = () => {
        fetch('http://localhost:4000/api/adduser',{method: "post",body:JSON.stringify({ nombre, apellidopaterno, apellidomaterno, genero, fechanacimiento,pais,idempleado,idarea }),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        //.then(data => {setName(data),setEmail(data)}) //aqui cambie
        .catch(error => {console.error(error)})
      }

    const creaCorreoContraseña = () => {
        fetch('http://localhost:4000/api/adduserInit',{method: "post",body:JSON.stringify({ correo, contraseña, estado, idperfil}),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        //.then(data => {setName(data),setEmail(data)}) //aqui cambie
        .catch(error => {console.error(error)})
      }


      console.log(nombre);
      console.log(apellidopaterno);
      console.log(apellidomaterno);
      console.log(genero);
      console.log(fechanacimiento);
      console.log(pais);
      console.log(idempleado);
      console.log(idarea);

    return (
        <div className="create">
            <h2>Agrega un nuevo empleado</h2>
            <form>

                <form>

                <label>Correo: </label>
                <input type="text" required value={correo} onChange={(e) => setCorreo(e.target.value)}/>

                <label>Contraseña: </label>
                <input type="text" required value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>

                <label>Estado: </label>
                <input type="text" required value={estado} onChange={(e) => setEstado(e.target.value)}/>

                <label>ID Perfil: </label>
                <input type="number" required value={idperfil} onChange={(e) => setIdPerfil(e.target.value)}/>

                <button type='submit' onClick={creaCorreoContraseña}>Crear Usuario</button>

                </form>


                <label>Nombre: </label>
                <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}/>

                <label>Apellido Paterno: </label>
                <input type="text" required value={apellidopaterno} onChange={(e) => setApellidoPaterno(e.target.value)}/>

                <label>Apellido Materno: </label>
                <input type="text" required value={apellidomaterno} onChange={(e) => setApellidoMaterno(e.target.value)}/>

                <label>Genero: </label>
                <select required value={genero} onChange={(e) => setGenero(e.target.value)}>
                    <option value='Masculino'>Masculino</option>
                    <option value='Femenino'>Femenino</option>
                    <option value='Otro'>Femenino</option>
                </select>

                <label>Fecha Nacimiento: </label>
                <input type="date" required value={fechanacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>

                <label>Pais: </label>
                <input type="text" required value={pais} onChange={(e) => setPais(e.target.value)}/>

                <label>ID Empleado: </label>
                <input type="number" required value={idempleado} onChange={(e) => setIdEmpleado(e.target.value)}/>

                <label>ID Area: </label>
                <input type="number" required value={idarea} onChange={(e) => setIdArea(e.target.value)}/>

                <button type='submit' onClick={agregaUsuario}>Agregar Empleado</button>


            </form>

        </div>
    )
}

export default NuevoEmpleado;