import { Router } from "express";
import { getCourses, getUsers, postUserLogin, login, protectedRoute, logout, getIdEmpleado, getIdPerfil, getInfo, getCursosEmpleados, borrarUsuario,getEmpleadosTodos,getInfoUsuario, postUserInfo } from "../controllers/controllers.js";
import {loginValidation} from '../validators/auth.js'
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { userAuth } from "../middlewares/auth-middleware.js";
const router = Router();

router.post('/login', loginValidation, validationMiddleware, login)
router.get('/idEmpleado', getIdEmpleado);
router.get('/idPerfil', getIdPerfil);

router.get('/cursos', getCourses)
router.get('/users', getUsers)
router.get('/protected',userAuth ,protectedRoute)
router.get('/logout' , logout)
router.get('/infoEmpleado', getInfo);
router.get('/cursosEmpleado', getCursosEmpleados);

//JEANNETTE
router.post('/adduser', postUserLogin);  //post para el primer forms
router.post('/adduserInfo', postUserInfo);  //post para el primer forms
router.delete('/empleados/delete/:id',borrarUsuario);
router.get('/empleados',getEmpleadosTodos);
router.put('/data/{id}/edit',getInfoUsuario);


export default router