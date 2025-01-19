import express from "express";
import morgan from "morgan"
import cors from 'cors'
import BooksRoutes from "./routes/books.routes.js" 
import UsersRoutes from "./routes/users.routes.js";
import BorrowingRoutes from "./routes/borrowing.routes.js";


const app = express()

app.set('port', process.env.PORT || 4000)

app.use(morgan("dev"))
app.use(express.json())
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/libros", BooksRoutes)
app.use("/api/usuarios", UsersRoutes)
app.use("/api/prestamos", BorrowingRoutes)

export default app