import { config } from "dotenv";
import * as fileEntries from "./data/fileEntries.json"
import { pipeline } from "@xenova/transformers";
import { sql } from "./db";
import { convertFileToArray } from "./convertFileToArray";

export type TprocessedFile = {
    pageNumber: number,
    pageData: string,
}

async function main() {
    try {
        // configuring the dotenv
        config();

        // setting pipeline for generateEmbedding
        const generateEmbedding = await pipeline(
            "feature-extraction",
            "xenova/all-MiniLM-L6-v2"
        )

        for (let index = 0; index < fileEntries.length; index++) {
            const file = fileEntries[index];

            const fileInArray: TprocessedFile[] | Error = await convertFileToArray({
                fileLocation: __dirname + "/data/" + file.filePath
            })
            // generate chunks in array
            if (fileInArray instanceof Error)
                throw new Error(fileInArray.message)


        }

    } catch (error) {
        console.error("unexpected error occured", error)
    }
}

main()
