import client from '../database.js';
import pkg from 'jsonwebtoken'
import {SECRET} from '../constants/index.js'
const {sign} = pkg
client.connect();


//Retorna los nombres, y URL de las imagenes de los cursos, en formato JSON
export const getCourses = async (req, res) => {
	try {
		const { rows } = await client.query("SELECT nombre, img FROM courses");
		res.json(rows);
	} catch (err) {
		console.log(err.message);
	}
};

export const getUsers = async (req, res) => {
	try {
		const { rows } = await client.query("SELECT nombre, email FROM accounts");
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
			succes: true, 
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