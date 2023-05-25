import { Router } from "express";
import { getCourses, getUsers, postUser, login, protectedRoute, logout } from "../controllers/controllers.js";
import {loginValidation} from '../validators/auth.js'
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { userAuth } from "../middlewares/auth-middleware.js";
const router = Router();

router.post('/login', loginValidation, validationMiddleware, login)
router.post('/adduser', postUser);
router.get('/cursos', getCourses)
router.get('/users', getUsers)
router.get('/protected',userAuth ,protectedRoute)
router.get('/logout' , logout)

export default router