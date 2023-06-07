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

export const getAreas = async (req, res) => {
	try {
		const {rows} = await client.query('SELECT fun_areas()')
		res.json(rows[0].fun_areas)

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

//VALE
export const getInfoJuego = async (req, res) => {
	try {
		const idEmpleado = req.query.idempleado
		const {rows} = await client.query('SELECT fun_empleados_juego($1)', [idEmpleado])
		res.json(rows[0].fun_empleados_juego)
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

export const setCursos = async (req, res) => {
  const infoCursos = req.body.params
  const cursosCompletados = infoCursos.cursoscompletados
  const idEmpleado = infoCursos.idempleado

  try {
		await client.query("CALL sp_empleados_juego_update_cursos($1, $2)", [cursosCompletados, idEmpleado])
		res.send("Response received: " + req.body);
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			error: error.message,
		})
	}
}

export const setPuntaje = async (req, res) => {
  const infoPuntaje = req.body.params
  const puntajeAlto = infoPuntaje.puntajealto
  const idEmpleado = infoPuntaje.idempleado

  try {
		await client.query("CALL sp_empleados_juego_update_puntaje($1, $2)", [puntajeAlto, idEmpleado])
		res.send("Response received: " + req.body);
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			error: error.message,
		})
	}
}

export const addAvatar = async (req, res) => {
  const infoAvatar = req.body.params
  const idEmpleado = infoAvatar.idempleado
  const idAvatar = infoAvatar.idavatar

  try {
		await client.query("CALL sp_empleados_avatars_insert($1, $2)", [idEmpleado, idAvatar])
		res.send("Response received: " + req.body);
	} catch (error) {
		console.log(error)
		return res.status(500).json({
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
		await client.query("CALL sp_delete_empleado($1)", [idEmpleado])
		res.status(200).json({ message: 'Data deleted' });
	}
	catch(error) 
	{
		console.log(error);
		res.status(500).json({ message: 'Error deleting data' });
	};
}

export const actualizarUsuario = async (req, res) => {
	const {
		nombre,
		apellidopaterno,
		apellidomaterno,
		genero,
		fechanacimiento,
		pais,
		idarea
	  } = req.body; // Datos actualizados del usuario
	try {
		const idEmpleado = req.params.id

		await client.query("CALL sp_update_empleados_info($1, $2, $3, $4, $5, $6, $7, $8)", 
		[nombre, apellidopaterno, apellidomaterno, genero, fechanacimiento, pais, idarea, idEmpleado])

	}
	catch (error) {
		console.error(error.message);
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
	}
	catch (error) {
		console.error(error.message);
    	res.status(500).json({ message: 'Error al actualizar el usuario' });
	}
};

//Inserta en la base de datos un nuevo usuario en empleados_login
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

//Inserta en la base de datos un nuevo usuario en empleados_login
export const postUserInfo = async (req, res) => {
	try {
		const infoNuevoUsuario = req.body.params	
		await client.query("CALL sp_empleados_info_insert($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [
			infoNuevoUsuario.nombre,
			infoNuevoUsuario.apellidopaterno,
			infoNuevoUsuario.apellidomaterno,
			infoNuevoUsuario.genero,
			infoNuevoUsuario.fechanacimiento,
			infoNuevoUsuario.pais,
			infoNuevoUsuario.idarea,
			infoNuevoUsuario.idempleado,
			infoNuevoUsuario.fechagraduacion,
			infoNuevoUsuario.idJefe
		]);
		res.send("Response received: " + req.body);
	} catch (error) {
		console.log(error.message)
		return res.status(500).json({
			error: error.message,
		})
	}
};

//inserta curso jeannette
export const postCurso = async(req,res) => {
	const nombre = req.body["nombre"]; //expecting a json object
	const idarea = req.body["idarea"]; //expecting a json object
	//const img = req.body["img"]; //expecting a json object

	console.log("Nombre: " + nombre);
	console.log("ID Area: " + idarea);
	//console.log("Img: " + img);

	client.query("INSERT INTO cursos (nombre , idarea) VALUES ($1,$2)", [
		nombre,
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

//get de rotaciones
export const getRotaciones = async (req, res) => {
	try {
		const idEmpleado = req.params.id

		const {rows} = await client.query('SELECT * FROM rotaciones WHERE idempleado=$1', [idEmpleado])
		res.json(rows)
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}