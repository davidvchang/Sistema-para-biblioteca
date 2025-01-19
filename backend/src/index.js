import app from "./app.js"
import {openConnection} from "./bd.js"

openConnection();

//SE QUITA ESTO PARA PODER SUBIRLO A VERCEL

// async function main() {
//     await app.listen(app.get("port"))
//     console.log(`Server on port: ${app.get("port")}`)
// }

// main()

//SE AGREGA ESTO PARA SUBIRLO A VERCEL
export default app;