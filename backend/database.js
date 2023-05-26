import pkg from "pg";
const {Client} = pkg

//Inicializacion de la conexion de la base de datos
//Tienen que poner la contraseña que tienen en su propio postgress
const client = new Client ({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "login_system",
})
export default client;