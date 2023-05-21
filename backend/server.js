import routes from './routes/routes.js'
import express from "express"
const app = express()
import cors from "cors"
import {PORT} from './constants/index.js'
import cookieParser from 'cookie-parser'
import './middlewares/passport-middleware.js'
import passport from 'passport'


app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(passport.initialize())


app.use('/api', routes)

app.listen(PORT, () => console.log(`Server on localhost: ${PORT}`))