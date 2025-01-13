import { pool } from "../bd.js";

export const getBorrowings = async (req, res) => {
    try {
        const borrowings = await pool.query("SELECT * FROM prestamos")
        res.status(200).send(borrowings.rows)
    } catch (ex) {
        console.log("Ha ocurrido un error al consultar los prestamos: ", ex)
    }
}

export const postBorrowing = async (req, res) => {
    const {id_libro, id_usuario, fecha_prestamo, estado, cantidad_prestada} = req.body;

    try {
        await pool.query("INSERT INTO prestamos (id_libro, id_usuario, fecha_prestamo, estado, cantidad_prestada) VALUES ($1, $2, $3, $4, $5)", [id_libro, id_usuario, fecha_prestamo, estado, cantidad_prestada]);
        res.send("Prestamo guardado correctamente");
    } catch (ex) {
        console.log("Ha ocurrido un error al guardar el prestamos: ", ex)
    }
}

export const getOneBorrowing = async (req, res) => {
    const {id_prestamo} = req.params;

    try {
        const existBorrowing = await pool.query("SELECT COUNT(*) FROM prestamos WHERE id_prestamo = $1", [id_prestamo])
        if(existBorrowing.rows[0].count > 0){
            const borrowing = await pool.query("SELECT * FROM prestamos WHERE id_prestamo = $1", [id_prestamo])
            res.status(200).send(borrowing.rows)
        }
        else {
            res.status(404).send("No se ha encontrado ningun prestamo")
        }
    } catch (ex) {
        console.log("Ha ocurrido un error al consultar el prestamos: ", ex)
    }
}

export const updateBorrowing = async (req, res) => {
    const {estado} = req.body;
    const {id_prestamo} = req.params;

    try {
        const existBorrowing = await pool.query("SELECT COUNT(*) FROM prestamos WHERE id_prestamo = $1", [id_prestamo])
        if(existBorrowing.rows[0].count > 0) {
            await pool.query("UPDATE prestamos SET estado = $1 WHERE id_prestamo = $2", [estado, id_prestamo])
            res.status(200).send("Se ha actualizado correctamente");
        }
        else {
            res.status(404).send("No se ha encontrado ningun prestamo");
        }
    } catch (ex) {
        console.log("Ha ocurrido un error al actualizar el prestamos: ", ex)
    }
}