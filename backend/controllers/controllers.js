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

//Inserta en la base de datos un neuvo usuario con contraseña y usuario
//(Creo que esto seria mejor para un sign in, y no tanto para un login)
export const postUser = async (req, res) => {
	const username = req.body["username"]; //expecting a json object
	const password = req.body["password"]; //expecting a json object

	console.log("Username: " + username);
	console.log("Password: " + password);

	//const insert_USPS= 'INSERT INTO accounts (username , password) VALUES ($1,$2)', [username,password];

	client.query("INSERT INTO accounts (username , password) VALUES ($1,$2)", [
			username,
			password,
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