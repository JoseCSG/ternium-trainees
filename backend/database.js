import pkg from "pg";
const {Client} = pkg

const client = new Client ({
    user: "postgres",
    password: "#Samanta10",
    host: "localhost",
    port: 5432,
    database: "login_system",
})
export default client;