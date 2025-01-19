import { Router } from "express";
import multer from "multer";
import { getBooks, postBook, getOneBook, deleteBook, updateBook, updateStock } from "../controllers/books.controller.js";

// Configuración de multer (PARA GUARDAR IMAGENES)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Nombre único para cada archivo
    },
});

const upload = multer({ storage });

const router = Router();

router.get("/", getBooks)
router.post("/", upload.single("imagen"), postBook)
router.get("/:id_libro", getOneBook)
router.delete("/:id_libro", deleteBook)
router.put("/:id_libro", updateBook)
router.put("/stock/:id_libro", updateStock)

export default router
