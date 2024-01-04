import { config } from "dotenv";
import * as fileEntries from "./data/fileEntries.json"
import { PipelineType, pipeline } from "@xenova/transformers";

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

        const text = "some random text"
        const anotherText = "some random text"

        const emb1 = await generateEmbedding(text, {
            pooling: 'mean',
            normalize: true
        })

        const emb2 = await generateEmbedding(anotherText, {
            pooling: 'mean',
            normalize: true
        })
        console.log(emb1, emb2)

        let referenceFile: TfileEntries = fileEntries;
    } catch (error) {
        console.error("unexpected error occured", error)
    }
}

main()
