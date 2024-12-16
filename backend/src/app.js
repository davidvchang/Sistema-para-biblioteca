import express from "express";
import morgan from "morgan"
import BooksRoutes from "./routes/books.routes.js" 


const app = express()

app.set('port', process.env.PORT || 4000)

app.use(morgan("dev"))
app.use(express.json())

app.use("/api/libros", BooksRoutes)
// app.use("/api/usuarios")

export default app