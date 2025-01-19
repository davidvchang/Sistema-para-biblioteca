    import pkg from "pg";
    import dotenv from "dotenv"

    dotenv.config()

    const {Pool} = pkg;

    const connectionString = process.env.POSTGRESQL_URI

    export const pool = new Pool({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    })

    export const openConnection = async () => {
        try {
            await pool.connect()
            console.log(`Base de datos conectada`)
        } catch (ex) {
            console.log(`Ha ocurrido un error: ${ex}`)
        }
    }