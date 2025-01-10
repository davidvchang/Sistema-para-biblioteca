import { Router } from "express";
import { getUsers, postUser, getOneUser, deleteUser, updateUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers)
router.post("/", postUser)

router.get("/:id_usuario", getOneUser)
router.delete("/:id_usuario", deleteUser)
router.put("/:id_usuario", updateUser)

export default router