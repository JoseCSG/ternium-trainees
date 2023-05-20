import client from '../database.js'
client.connect()

//Retorna los nombres, y URL de las imagenes de los cursos, en formato JSON
export const getCourses = async (req, res) => {
    try {
        const courses = await client.query('SELECT nombre, img FROM courses')
        res.json(courses.rows)
    }
    catch(err) {
        console.log(err.message);
    };
}

//Inserta en la base de datos un neuvo usuario con contraseña y usuario
//(Creo que esto seria mejor para un sign in, y no tanto para un login)
export const postUser = async (req, res) => {
    const username = req.body["username"]; //expecting a json object
    const password= req.body["password"]; //expecting a json object

    console.log("Username: "+ username );
    console.log("Password: "+ password );

    //const insert_USPS= 'INSERT INTO accounts (username , password) VALUES ($1,$2)', [username,password];

    client.query('INSERT INTO accounts (username , password) VALUES ($1,$2)', [username,password]).then((response) => {
        console.log("Data saved");
        console.log(response);
    })
    .catch((err) =>{
        console.log(err);
    });

    console.log(req.body);
    res.send("Response received: "+req.body);
}