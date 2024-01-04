import { config } from "dotenv";
import * as fileEntries from "./data/fileEntries.json"
import { pipeline } from "@xenova/transformers";
import { sql } from "./db";

type TfileEntries = {
    fileName: string,
    country: string,
    filePath: string
}[]

async function main() {
    try {
        // configuring the dotenv
        config();

        const generateEmbedding = await pipeline(
            "feature-extraction",
            "xenova/all-MiniLM-L6-v2"
        )

        const test = await sql`select 1 as one, 2 as two where 1=1;`

        console.log(test)

        console.log(generateEmbedding)
        let referenceFile: TfileEntries = fileEntries;

    } catch (error) {
        console.error("unexpected error occured", error)
    }
}

main()
