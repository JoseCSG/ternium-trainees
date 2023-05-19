import client from '../database.js'

client.connect()

export const getCourses = async (req, res) => {
    try {
        const courses = await client.query('SELECT nombre, img FROM courses')
        res.json(courses.rows)
    }
    catch(err) {
        console.log(err.message);
    };
}

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