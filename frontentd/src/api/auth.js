import axios from 'axios'
axios.defaults.withCredentials = true

export async function onLogin(loginData) {
    return await axios.post('http://localhost:4000/api/login', loginData)
}

export async function onLogout(){
    return await axios.get('http://localhost:4000/api/logout')
}

export async function getIdEmpleado(correo){
    return await axios.get('http://localhost:4000/api/idEmpleado', {params: correo})
}

export async function getIdPerfil(correo){
    return await axios.get('http://localhost:4000/api/idPerfil',{params: correo})
}

export async function getInfoEmpleado(idEmpleado){
    return await axios.get('http://localhost:4000/api/infoEmpleado', {params: idEmpleado})
}

export async function getEmpleadosTodos()
{
    return await axios.get('http://localhost:4000/api/empleados');
}

export async function postEmpleado(nombre,apellidopaterno,apellidomaterno,genero,fechanacimiento,pais,idempleado,idarea)
{
    return await axios.get('http://localhost:4000/api/adduser',{params: nombre,apellidopaterno,apellidomaterno,genero,fechanacimiento,pais,idempleado,idarea});
}

export async function nuevoEmpleado(correo, contraseña,estado,idperfil)
{
    return await axios.delete('http://localhost:4000/api/adduserInit',{params: correo,contraseña,estado,idperfil});
}

export async function borrarUsuario(idempleadoinfo)
{
    return await axios.delete('http://localhost:4000/api/borrarusuario',{params: idempleadoinfo});
}

export async function getInfoUsuario(idempleadoinfo)
{
    return await axios.get('http://localhost:4000/api/data/{id}/edit',{params: idempleadoinfo});
}