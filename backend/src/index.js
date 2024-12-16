import app from "./app.js"
import {openConnection} from "./bd.js"

openConnection();

async function main() {
    await app.listen(app.get("port"))
    console.log(`Server on port: ${app.get("port")}`)
}

main()