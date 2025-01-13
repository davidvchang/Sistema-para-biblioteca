import { Router } from "express";
import { getUsers, postUser, getOneUser, deleteUser, updateUser, updateLibros_prestados } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers)
router.post("/", postUser)

router.get("/:id_usuario", getOneUser)
router.delete("/:id_usuario", deleteUser)
router.put("/:id_usuario", updateUser)

router.put("/libros_prestados/:id_usuario", updateLibros_prestados)

export default router