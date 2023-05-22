import pool from '../database.js'

export const getCourses = async (req, res) => {
    pool.query('SELECT nombre FROM courses').then((response) => {
        console.log(response);
    })
    .catch((err) =>{
        console.log(err);
    });

    console.log(req.body);
    res.send("Response received: "+req.body);
}

export const postUser = async (req, res) => {
    const username = req.body["username"]; //expecting a json object
    const password= req.body["password"]; //expecting a json object

    console.log("Username: "+ username );
    console.log("Password: "+ password );

    //const insert_USPS= 'INSERT INTO accounts (username , password) VALUES ($1,$2)', [username,password];

    pool.query('INSERT INTO accounts (username , password) VALUES ($1,$2)', [username,password]).then((response) => {
        console.log("Data saved");
        console.log(response);
    })
    .catch((err) =>{
        console.log(err);
    });

    console.log(req.body);
    res.send("Response received: "+req.body);
}