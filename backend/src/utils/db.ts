import { createPool } from "mysql2/promise"
import dotenv from "dotenv"

// makes the env variable avaiable
dotenv.config()

const dbConnection = createPool(process.env.DATABASE_URL || "")

export default dbConnection
