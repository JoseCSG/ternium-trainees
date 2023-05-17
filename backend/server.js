const express = require ("express")
const cors = require ("cors")
const pool = require("./database")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/adduser", (req, res) => {
    
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
});


app.listen(4000, () => console.log("Server on localhost: 4000"))