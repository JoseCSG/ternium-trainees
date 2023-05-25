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