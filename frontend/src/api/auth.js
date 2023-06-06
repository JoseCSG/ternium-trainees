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

export async function getCursosEmpleado(idEmpleado){
    return await axios.get('http://localhost:4000/api/cursosEmpleado', {params: idEmpleado})
}

//VALE
export async function getInfoJuego(idEmpleado){
  return await axios.get('http://localhost:4000/api/infoJuego', {params: idEmpleado})
}

//JEANNETTE
export async function getEmpleadosTodos()
{
    return await axios.get('http://localhost:4000/api/empleados');
}

export async function nuevoEmpleadoInfo(infoNuevoEmpleado){
    return await axios.post('http://localhost:4000/api/adduserInfo',{params: infoNuevoEmpleado});
}


export async function nuevoEmpleado(infoEmpleado){
    return await axios.post('http://localhost:4000/api/adduser',{params: infoEmpleado});
}

export async function borrarUsuario(idempleadoinfo){
    return await axios.delete('http://localhost:4000/api/empleados/delete',{params: idempleadoinfo});
}
export async function actualizarUsuario(idempleadoinfo)
{
    return await axios.get('http://localhost:4000/api/data/edit',{params: idempleadoinfo});
}

export async function getSingleUsuario(idempleadoinfo)
{
    return await axios.get('http://localhost:4000/api/data/get', {params: idempleadoinfo});
}
export async function getInfoUsuario(idempleadoinfo){
    return await axios.get('http://localhost:4000/api/data/{id}/edit',{params: idempleadoinfo});
}
export async function nuevoCurso(infoNuevoCurso){
    return await axios.post('http://localhost:4000/api/addcurso',{params: infoNuevoCurso});
}

export async function getRotaciones(idempleado)
{
    return await axios.get(`http://localhost:4000/api/data/getRotaciones/${idempleado}`,{params: idempleado});
}
