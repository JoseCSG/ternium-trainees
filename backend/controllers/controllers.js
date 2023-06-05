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
<<<<<<< Updated upstream
}
=======
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

export const updateCursos = async (req, res) => {
  const cursosCompletados = req.body["cursoscompletados"];
  const idEmpleado = req.body["idempleado"];

  console.log("Cursos Completados: " + cursosCompletados);
	console.log("ID Empleado: " + idEmpleado);

  client.query("CALL sp_empleados_juego_update_cursos($1, $2)", [cursosCompletados, idEmpleado])
  .then((response) => {
    console.log("Data saved");
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
  res.send("Response received: " + req.body);
}

export const updatePuntaje = async (req, res) => {
  const puntajeAlto = req.body["puntajealto"];
  const idEmpleado = req.body["idempleado"];

  console.log("Puntaje Alto: " + puntajeAlto);
	console.log("ID Empleado: " + idEmpleado);

  client.query("CALL sp_empleados_juego_update_puntaje($1, $2)", [puntajeAlto, idEmpleado])
  .then((response) => {
    console.log("Data saved");
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
  res.send("Response received: " + req.body);
}

export const agregaAvatar = async (req, res) => {
  const idEmpleado = req.body["idempleado"];
  const idAvatar = req.body["idavatar"];

  console.log("ID Empleado: " + idEmpleado);
	console.log("ID Avatar: " + idAvatar);

  client.query("CALL sp_empleados_avatars_insert($1, $2)", [idEmpleado, idAvatar])
  .then((response) => {
    console.log("Data saved");
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
  res.send("Response received: " + req.body);
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
		await client.query("DELETE FROM empleados_login WHERE idempleado =$1", [idEmpleado])
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

//Inserta en la base de datos un nuevo usuario en empleados_login
export const postUserLogin = async (req, res) => {
	const correo = req.body["correo"]; //expecting a json object
	const contraseña = req.body["contraseña"]; //expecting a json object
	const estado = req.body["estado"]; //expecting a json object
	const idperfil = req.body["idperfil"]; //expecting a json object

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

	res.send("Response received: " + req.body);
};

//Inserta en la base de datos un nuevo usuario en empleados_login
export const postUserInfo = async (req, res) => {
	try {
		const infoNuevoUsuario = req.body
		await client.query("INSERT INTO empleados_info (nombre,apellidopaterno,apellidomaterno,genero,fechanacimiento,pais,idempleado,idarea, fechainicio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, now())", [
			infoNuevoUsuario["nombre"],
			infoNuevoUsuario["apellidopaterno"],
			infoNuevoUsuario["apellidomaterno"],
			infoNuevoUsuario["genero"],
			infoNuevoUsuario["fechanacimiento"],
			infoNuevoUsuario["pais"],
			infoNuevoUsuario["idempleado"],
			infoNuevoUsuario["idarea"]
		])
		res.send("Response received: " + req.body);
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
};
>>>>>>> Stashed changes
