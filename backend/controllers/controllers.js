import client from '../database.js';
import pkg from 'jsonwebtoken'
import {SECRET} from '../constants/index.js'
const {sign} = pkg
client.connect();


//Retorna los nombres, y URL de las imagenes de los cursos, en formato JSON
export const getCourses = async (req, res) => {
	try {
		const { rows } = await client.query("SELECT nombre FROM cursos");
		res.json(rows);
	} catch (err) {
		console.log(err.message);
	}
};

export const getUsers = async (req, res) => {
	try {
		const { rows } = await client.query("SELECT idEmpleado, idPerfil FROM empleados_login");
		res.json(rows);
	} catch (err) {
		console.log(err.message);
	}
};



export const login = async (req, res) => {
	let user = req.user
	let payload = {
		id: user.id,
		email: user.email,
	}
	try {
		const token = await sign(payload, SECRET)
		return res.status(200).cookie('token', token, {httpOnly: true }).json({
			success: true, 
			message: 'Logged in succesfully'
		})	
	} catch (error) {
		return res.json({
			error: error.message
		})
	}
}

export const protectedRoute = async (req, res) => {
	try {
		return res.status(200).json({
			info: "protected info",
		})
	} catch (err) {
		console.log(err.message);
	}
};

export const logout = async (req, res) => {
	try {
		return res.status(200).clearCookie('token',{httpOnly: true }).json({
			succes: true, 
			message: 'Logged out succesfully'
		})	
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

export const getIdEmpleado = async (req, res) => {
	try {
		const correo = req.query.correo
		const {rows} = await client.query('SELECT idEmpleado FROM empleados_login WHERE correo = $1', [correo])
		res.json(rows)
	} catch (error) {
		return res.status(500).json({
			error: error.error.message,
		})
	}
}

export const getIdPerfil = async (req, res) => {
	try {
		const correo = req.query.correo
		const {rows} = await client.query('SELECT idPerfil FROM empleados_login WHERE correo = $1', [correo])
		res.json(rows)
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

export const getInfo = async (req, res) => {
	try {
		const idEmpleado = req.query.idempleado

		//const {rows} = await client.query('SELECT * FROM empleados_info WHERE idEmpleado = $1', [idEmpleado])
		const {rows} = await client.query('SELECT fun_empleados_login($1)', [idEmpleado])
		//res.json(rows)
		res.json(rows[0].fun_empleados_login)
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

export const getCursosEmpleados = async (req, res) => {
	try {
		const idEmpleado = req.query.idempleado
		const {rows} = await client.query('SELECT fun_cursos($1) ', [idEmpleado])
		res.json(rows[0].fun_cursos)
	} catch (error) {
		return error.status(500).json({
			error: error.message,		
		})
	}
}

//JEANNETTE
export const getEmpleadosTodos = async (req, res) => {
	try {
		const {rows} = await client.query('SELECT * FROM empleados_info ')
		res.json(rows)
		console.log(rows)

	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

//Inserta en la base de datos un nuevo usuario em empleados_login
export const postUserLogin = async (req, res) => {
	const correo = req.body["correo"]; //expecting a json object
	const contraseña = req.body["contraseña"]; //expecting a json object
	const estado = req.body["estado"]; //expecting a json object
	const idperfil = req.body["idperfil"]; //expecting a json object

	console.log("Correo: " + correo);
	console.log("Contraseña: " + contraseña);
	console.log("Estado: " + estado);
	console.log("ID Perfil: " + idperfil);
	


	client.query("INSERT INTO empleados_login (correo , contraseña, estado, idperfil) VALUES ($1,$2,$3,$4)", [
			correo,
			contraseña,
			estado,
			idperfil
		])
		.then((response) => {
			console.log("Data saved");
			console.log(response);
		})
		.catch((err) => {
			console.log(err);
		});

	console.log(req.body);
	res.send("Response received: " + req.body);
};

//Inserta en la base de datos un nuevo usuario em empleados_login
export const postUserInfo = async (req, res) => {
	const nombre = req.body["nombre"]; //expecting a json object
	const apellidopaterno = req.body["apellidopaterno"]; //expecting a json object
	const apellidomaterno = req.body["apellidomaterno"]; //expecting a json object
	const genero = req.body["genero"]; //expecting a json object
	const fechanacimiento = req.body["fechanacimiento"]; //expecting a json object
	const pais = req.body["pais"]; //expecting a json object
	const idempleado = req.body["idempleado"]; //expecting a json object
	const idarea = req.body["idarea"]; //expecting a json object

	console.log("Nombre: " + nombre);
	console.log("Apellido Paterno: " + apellidopaterno);
	console.log("Apellido Materno: " + apellidomaterno);
	console.log("Genero: " + genero);
	console.log("Fecha Nacimiento: " + fechanacimiento);
	console.log("Pais: " + pais);
	console.log("ID empleado: " + idempleado);
	console.log("ID Area: " + idarea);
	


	client.query("INSERT INTO empleados_info (nombre,apellidopaterno,apellidomaterno,genero,fechanacimiento,pais,idempleado,idarea) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)", [
			nombre,
			apellidopaterno,
			apellidomaterno,
			genero,
			fechanacimiento,
			pais,
			idempleado,
			idarea
		])
		.then((response) => {
			console.log("Data saved");
			console.log(response);
		})
		.catch((err) => {
			console.log(err);
		});

	console.log(req.body);
	res.send("Response received: " + req.body);
};

export const borrarUsuario=async(req,res) => {
	try {
		const idEmpleado = req.params.id;
		const response= await client.query("DELETE FROM empleados_info WHERE idempleadoinfo =$1", [idEmpleado])
		console.log("Data deleted");
		console.log(response);
		res.status(200).json({ message: 'Data deleted' });
	}
	catch(error) 
	{
		console.log(error);
		res.status(500).json({ message: 'Error deleting data' });
	};
}

export const actualizarUsuario = async (req, res) => {
	const idEmpleado = req.params.id
	const {
		nombre,
		apellidopaterno,
		apellidomaterno,
		genero,
		fechanacimiento,
		pais,
		idempleado,
		idarea
	  } = req.body; // Datos actualizados del usuario
	try {
		// Buscar el usuario por su ID
		//const usuario = await Usuario.findById(idEmpleado);
		client.query("UPDATE empleados_info SET nombre=$1, apellidopaterno = $2, apellidomaterno = $3, genero = $4, fechanacimiento = $5, pais = $6, idempleado = $7, idarea = $8 WHERE idempleadoinfo=$9", [
			nombre,
			apellidopaterno,
			apellidomaterno,
			genero,
			fechanacimiento,
			pais,
			idempleado,
			idarea,
			idEmpleado
		])

	}
	catch (error) {
		console.error(error);
    	res.status(500).json({ message: 'Error al actualizar el usuario' });
	}
};

export const getInfoSingle = async (req, res) => {
	try {
		const idEmpleado = req.params.id

		//const {rows} = await client.query('SELECT * FROM empleados_info WHERE idEmpleado = $1', [idEmpleado])
		const {rows} = await client.query('SELECT * from empleados_info WHERE idempleado=$1', [idEmpleado])
		//res.json(rows)
		res.json(rows)
		console.log(rows)
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}