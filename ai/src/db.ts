import { config } from "dotenv"
import postgres from "postgres"

config();
// take the paramaters from env
export const sql = postgres()
