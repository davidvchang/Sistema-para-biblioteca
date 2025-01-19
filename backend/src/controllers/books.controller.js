import {pool} from "../bd.js";

export const getBooks = async (req, res) => {
    try {
        const books = await pool.query("SELECT * FROM libros")
        res.status(200).send(books.rows);
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar a los libros: ' + ex)
    }
}

export const postBook = async (req, res) => {
    const {titulo, autor, isbn, genero, precio, stock, fecha_publicacion, estado} = req.body
    try {
        await pool.query("INSERT INTO libros (titulo, autor, isbn, genero, precio, stock, fecha_publicacion, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [titulo, autor, isbn, genero, precio, stock, fecha_publicacion, estado])
        res.send('Libro guardado correctamente');
    } catch (ex) {
        console.log('Ha ocurrido un error al guardar el libro: ' + ex);
    }
}

export const getOneBook = async (req, res) => {
    const {id_libro} = req.params
    try {
        const existBook = await pool.query("SELECT COUNT(*) FROM libros WHERE id_libro = $1", [id_libro])
        if(existBook.rows[0].count > 0) {
            const book = await pool.query("SELECT * FROM libros WHERE id_libro = $1", [id_libro])
            res.status(200).send(book.rows);
        }
        else{
            res.status(404).send("No se ha encontrado ningun libro");
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar a el libro: ' + ex)
    }
}

export const deleteBook = async (req, res) => {
    const {id_libro} = req.params

    try {
        const existBook = await pool.query("SELECT COUNT(*) FROM libros WHERE id_libro = $1", [id_libro])
        if(existBook.rows[0].count > 0) {
            await pool.query("DELETE FROM libros WHERE id_libro = $1", [id_libro])
            res.status(200).send("Se ha eliminado correctamente");
        }
        else{
            res.status(404).send("No se ha encontrado ningun libro");
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar el libro: ' + ex)
    }
}

export const updateBook = async (req, res) => {
    const {titulo, autor, isbn, genero, precio, stock, fecha_publicacion, estado} = req.body
    const {id_libro} = req.params
    try {
        const existBook = await pool.query("SELECT COUNT(*) FROM libros WHERE id_libro = $1", [id_libro])
        if(existBook.rows[0].count > 0) {
            const book = await pool.query("UPDATE libros SET titulo = $1, autor = $2, isbn = $3, genero = $4, precio = $5, stock = $6, fecha_publicacion = $7, estado = $8 WHERE id_libro = $9", [titulo, autor, isbn, genero, precio, stock, fecha_publicacion, estado, id_libro])
            res.status(200).send("Se ha actualizado correctamente");
        }
        else{
            res.status(404).send("No se ha encontrado ningun libro");
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar el libro: ' + ex)
    }
}

export const updateStock = async (req, res) => {
    const {id_libro} = req.params
    const {stock} = req.body
    try {
        const existBook = await pool.query("SELECT COUNT(*) FROM libros WHERE id_libro = $1", [id_libro])
        if(existBook.rows[0].count > 0) {
            const book = await pool.query("UPDATE libros SET stock = $1 WHERE id_libro = $2", [stock, id_libro])
            res.status(200).send("Se ha actualizado correctamente");
        }
        else{
            res.status(404).send("No se ha encontrado ningun libro");
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar el libro: ' + ex)
    }
}