import { Router } from "express";
<<<<<<< Updated upstream
import { getCourses, getUsers, postUser, login, protectedRoute, logout } from "../controllers/controllers.js";
import {loginValidation} from '../validators/auth.js'
=======
import { login, getIdEmpleado, getIdPerfil,
        protectedRoute, logout, getInfo, getCursosEmpleados, getAreas,
        getInfoJuego, updateCursos, updatePuntaje, agregaAvatar,
        postUserLogin, postUserInfo, borrarUsuario, getEmpleadosTodos, getInfoUsuario } from "../controllers/controllers.js";
import { loginValidation } from '../validators/auth.js'
>>>>>>> Stashed changes
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { userAuth } from "../middlewares/auth-middleware.js";
const router = Router();

router.post('/login', loginValidation, validationMiddleware, login)
router.post("/adduser", postUser);
router.get('/cursos', getCourses)
router.get('/users', getUsers)
router.get('/protected',userAuth ,protectedRoute)
router.get('/logout' , logout)
<<<<<<< Updated upstream
=======
router.get('/infoEmpleado', getInfo);
router.get('/cursosEmpleado', getCursosEmpleados);
router.get('/areas', getAreas);
>>>>>>> Stashed changes



export default router