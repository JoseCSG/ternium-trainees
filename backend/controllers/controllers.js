import client from '../database.js';
import pkg from 'jsonwebtoken'
import {SECRET} from '../constants/index.js'
const {sign} = pkg
client.connect();

export const login = async (req, res) => {
	let user = req.user
	let payload = {
		id: user.id,
		email: user.email,
	}
	try {
		const token = sign(payload, SECRET)
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
		const {rows} = await client.query('SELECT fun_empleado_id($1)', [correo])
		res.json(rows[0].fun_empleado_id)
	} catch (error) {
		return res.status(500).json({
			error: error.error.message,
		})
	}
}

export const getIdPerfil = async (req, res) => {
	try {
		const correo = req.query.correo
		const {rows} = await client.query('SELECT fun_empleado_perfil($1)', [correo])
		res.json(rows[0].fun_empleado_perfil)
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
		const {rows} = await client.query('SELECT fun_empleados_perfil($1)', [idEmpleado])
		//res.json(rows)
		res.json(rows[0].fun_empleados_perfil)
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

	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

export const borrarUsuario=async(req,res) => {
	try {
		const idEmpleado = req.params.id
		await client.query("CALL sp_delete_empado($1)", [idEmpleado])
		res.status(200).json({ message: 'Data deleted' });
	}
	catch(error) 
	{
		console.log(error);
		res.status(500).json({ message: 'Error deleting data' });
	};
}

export const getInfoUsuario = async (req, res) => {
	try {
		const idEmpleado = req.query.idempleado
		const {rows} = await client.query('SELECT * FROM empleados_info WHERE idEmpleado = $1', [idEmpleado])
		res.json(rows)

	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

//Inserta en la base de datos un nuevo usuario em empleados_login
export const postUserLogin = async (req, res) => {
	const nuevoUsuario = req.body.params

	try {
		await client.query("CALL sp_insert_empleado($1, $2, $3)", [
			nuevoUsuario.correo,
			nuevoUsuario.contraseña,
			nuevoUsuario.idperfil
		]);
		return res.status(200).json({
			message: "Data saved",
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		});
	}
};

//Inserta en la base de datos un nuevo usuario em empleados_login
export const postUserInfo = async (req, res) => {
	try {
		const infoNuevoUsuario = req.body.params	
		console.log('Info Nueva' + infoNuevoUsuario)
		await client.query("CALL sp_empleados_info_insert($1, $2, $3, $4, $5, $6, $7, $8)", [
			infoNuevoUsuario.nombre,
			infoNuevoUsuario.apellidopaterno,
			infoNuevoUsuario.apellidomaterno,
			infoNuevoUsuario.genero,
			infoNuevoUsuario.fechanacimiento,
			infoNuevoUsuario.pais,
			infoNuevoUsuario.idarea,
			infoNuevoUsuario.idempleado
		])
		res.send("Response received: " + req.body);
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			error: error.message,
		})
	}
};