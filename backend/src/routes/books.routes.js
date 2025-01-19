import { Router } from "express";
import { getBooks, postBook, getOneBook, deleteBook, updateBook, updateStock } from "../controllers/books.controller.js";


const router = Router();

router.get("/", getBooks)
router.post("/", postBook)
router.get("/:id_libro", getOneBook)
router.delete("/:id_libro", deleteBook)
router.put("/:id_libro", updateBook)
router.put("/stock/:id_libro", updateStock)

router.get('/', (req, res) => {
    res.json([{ id: 1, title: 'Libro de prueba', author: 'Autor' }]);
  });

export default router
