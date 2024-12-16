import { Router } from "express";
import { getBooks, postBook, getOneBook, deleteBook, updateBook } from "../controllers/books.controller.js";

const router = Router();

router.get("/", getBooks)
router.post("/", postBook)
router.get("/:id_libro", getOneBook)
router.delete("/:id_libro", deleteBook)
router.put("/:id_libro", updateBook)

export default router
