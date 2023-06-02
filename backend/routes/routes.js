import { Router } from "express";
import { login, getIdEmpleado, getIdPerfil,
        protectedRoute, logout, getInfo, getCursosEmpleados,
        getInfoJuego, updateCursos, updatePuntaje, agregaAvatar,
        postUserLogin, postUserInfo, borrarUsuario, getEmpleadosTodos, getInfoUsuario,
        postUserInfo, getInfoSingle} from "../controllers/controllers.js";
import { loginValidation } from '../validators/auth.js'
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { userAuth } from "../middlewares/auth-middleware.js";
const router = Router();

router.post('/login', loginValidation, validationMiddleware, login)
router.get('/idEmpleado', getIdEmpleado);
router.get('/idPerfil', getIdPerfil);

router.get('/protected', userAuth, protectedRoute)
router.get('/logout' , logout)
router.get('/infoEmpleado', getInfo);
router.get('/cursosEmpleado', getCursosEmpleados);

//VALE
router.get('/infoJuego', getInfoJuego);
router.post('/subeCursos', updateCursos);
router.post('/subePuntaje', updatePuntaje);
router.post('/agregaAvatar', agregaAvatar);

//JEANNETTE
router.post('/adduser', postUserLogin);  //post para el primer forms
router.post('/adduserInfo', postUserInfo);  //post para el primer forms
router.delete('/empleados/delete/:id',borrarUsuario);
router.get('/empleados',getEmpleadosTodos);
//para el update
router.put('/data/edit/:id',actualizarUsuario);
router.get('/data/get/:id',getInfoSingle);


export default router