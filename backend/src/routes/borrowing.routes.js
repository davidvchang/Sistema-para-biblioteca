import { Router } from "express";
import { getBorrowings, postBorrowing, getOneBorrowing, updateBorrowing, getBorrowingsBorrowed } from "../controllers/borrowing.controller.js";

const router = Router();

router.get("/", getBorrowings)
router.post("/", postBorrowing)

router.get("/:id_prestamo", getOneBorrowing)
router.put("/:id_prestamo", updateBorrowing)

router.get("/estado/:estado", getBorrowingsBorrowed)

export default router