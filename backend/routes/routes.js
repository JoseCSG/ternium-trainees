import { Router } from "express";
import { getCourses, getUsers, postUser, login, protectedRoute, logout, getIdEmpleado, getIdPerfil, getInfo, getCursosEmpleados, borrarUsuario,getEmpleadosTodos,getInfoUsuario } from "../controllers/controllers.js";
import {loginValidation} from '../validators/auth.js'
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { userAuth } from "../middlewares/auth-middleware.js";
const router = Router();

router.post('/login', loginValidation, validationMiddleware, login)
router.get('/idEmpleado', getIdEmpleado);
router.get('/idPerfil', getIdPerfil);
router.post('/adduser', postUser);
router.get('/cursos', getCourses)
router.get('/users', getUsers)
router.get('/protected',userAuth ,protectedRoute)
router.get('/logout' , logout)
router.get('/infoEmpleado', getInfo);
router.get('/cursosEmpleado', getCursosEmpleados);

//JEANNETTE
router.delete('/borrarusuario',borrarUsuario);
router.get('/empleados',getEmpleadosTodos);
router.get('/data/{id}/edit',getInfoUsuario);


export default router