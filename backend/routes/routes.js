import { Router } from "express";
import { getCourses, postUser } from "../controllers/controllers.js";
const router = Router();

router.post("/adduser", postUser);
router.get('/cursos', getCourses)

export default router