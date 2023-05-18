import pkg from "pg";
const {Client} = pkg

const client = new Client ({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "ternium_database",
})
export default client;