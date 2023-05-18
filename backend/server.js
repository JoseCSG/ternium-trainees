import routes from './routes/routes.js'
import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(4000, () => console.log("Server on localhost: 4000"))