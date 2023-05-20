import { Router } from "express";
import { getCourses, postUser } from "../controllers/controllers.js";
const router = Router();

//Cuando el servidor accede a estas rutas, se ejecutan los metodos HTTP (post, get, delete, update)
router.post("/adduser", postUser);
router.get('/cursos', getCourses)

export default router