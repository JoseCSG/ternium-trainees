import pkg from "pg";
const {Pool} = pkg

const pool = new Pool ({
    user: "postgres",
    password: "#Samanta10",
    host: "localhost",
    port: 5432,
    database: "login_system",
})
export default pool;