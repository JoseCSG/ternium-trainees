import { Router } from "express";
import { login, getIdEmpleado, getIdPerfil,
        protectedRoute, logout, getInfo, getCursosEmpleados,
        getInfoJuego, getAvatars, setCursos, setPuntaje, addAvatar,
        postUserLogin, postUserInfo, borrarUsuario, getEmpleadosTodos,
        getInfoSingle,
        actualizarUsuario, postCurso, getRotaciones, getAreas, getAreasInteres} from "../controllers/controllers.js";
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
router.get('/areas', getAreas);
router.get('/cursosEmpleado', getCursosEmpleados);

//VALE
router.get('/getInfoJuego', getInfoJuego);
router.get('/getAvatars', getAvatars);
router.post('/setCursos', setCursos);
router.post('/setPuntaje', setPuntaje);
router.post('/addAvatar', addAvatar);

//JEANNETTE
router.post('/adduser', postUserLogin);  //post para el primer forms
router.post('/adduserInfo', postUserInfo);  //post para el primer forms
router.delete('/empleados/delete/:id',borrarUsuario);
router.get('/empleados',getEmpleadosTodos);
router.post('/addcurso',postCurso);
router.get('/data/getRotaciones/:id',getRotaciones);
router.get('/data/getAreasInteres/:id',getAreasInteres);
//para el update
router.put('/data/edit/:id',actualizarUsuario);
router.get('/data/get/:id',getInfoSingle);


export default router