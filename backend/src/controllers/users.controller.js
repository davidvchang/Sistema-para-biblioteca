import { pool } from "../bd.js";

export const getUsers = async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM usuarios")
        res.status(200).send(users.rows)
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar los usuarios: ' + ex)
    }
}

export const postUser = async (req, res) => {
    const {nombre, apellidos, email, telefono} = req.body
    try {
        await pool.query("INSERT INTO usuarios (nombre, apellidos, email, telefono) VALUES ($1, $2, $3, $4)", [nombre, apellidos, email, telefono])
        res.send("Usuario guardado correctamente")
    } catch (ex) {
        console.log('Ha ocurrido un error al guardar el usuario: ' + ex);
    }
}

export const getOneUser = async (req, res) => {
    const {id_usuario} = req.params

    try {
        const existUser = await pool.query("SELECT COUNT(*)FROM usuarios WHERE id_usuario = $1", [id_usuario])
        if(existUser.rows[0].count > 0) {
            const user = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id_usuario])
            res.status(200).send(user.rows)
        } 
        else {
            res.status(404).send("No se a encontrado ningun usuario")
        }

    } catch (ex) {
        console.log('Ha ocurrido un error al consultar el usuario: ' + ex)
    }
}

export const deleteUser = async (req, res) => {
    const {id_usuario} = req.params

    try {
        const existUser = await pool.query("SELECT COUNT(*)FROM usuarios WHERE id_usuario = $1", [id_usuario])
        if(existUser.rows[0].count > 0) {
            await pool.query("DELETE FROM usuarios WHERE id_usuario = $1", [id_usuario])
            res.status(200).send("Se ha eliminado correctamente el usuario")
        } 
        else {
            res.status(404).send("No se a encontrado ningun usuario")
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar el usuario: ' + ex)
    }
}

export const updateUser = async (req, res) => {
    const {id_usuario} = req.params;
    const {nombre, apellidos, email, telefono} = req.body

    try {
        const existBook = await pool.query("SELECT COUNT(*) FROM usuarios WHERE id_usuario = $1", [id_usuario])
        if(existBook.rows[0].count > 0) {
            await pool.query("UPDATE usuarios SET nombre = $1, apellidos = $2, email = $3, telefono = $4 WHERE id_usuario = $5", [nombre, apellidos, email, telefono, id_usuario])
            res.status(200).send("Se ha actualizado correctamente");
        }
        else{
            res.status(404).send("No se ha encontrado ningun libro");
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al actualizar el usuario: ' + ex)
    }
}

export const updateLibros_prestados = async (req, res) => {
    const {id_usuario} = req.params
    const {libros_prestados} = req.body
    try {
        const existBook = await pool.query("SELECT COUNT(*) FROM usuarios WHERE id_usuario = $1", [id_usuario])
        if(existBook.rows[0].count > 0) {
            const book = await pool.query("UPDATE usuarios SET libros_prestados = $1 WHERE id_usuario = $2", [libros_prestados, id_usuario])
            res.status(200).send("Se ha actualizado correctamente");
        }
        else{
            res.status(404).send("No se ha encontrado ningun libro");
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar el libro: ' + ex)
    }
}