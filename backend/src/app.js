import express from "express";
import morgan from "morgan"
import cors from 'cors'
import BooksRoutes from "./routes/books.routes.js" 
import UsersRoutes from "./routes/users.routes.js";


const app = express()

app.set('port', process.env.PORT || 4000)

app.use(morgan("dev"))
app.use(express.json())
app.use(cors());

app.use("/api/libros", BooksRoutes)
app.use("/api/usuarios", UsersRoutes)

export default app