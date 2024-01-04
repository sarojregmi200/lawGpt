import { TprocessedFile } from ".";
import fs from "fs/promises"
import pdfParser from 'pdf-parse'

export const convertFileToArray = async (
    { chunkFormat, fileLocation }
        : { chunkFormat: "page" | "line", fileLocation: string }
): Promise<TprocessedFile[] | Error> => {
    try {
        const pdfBuffer = await fs.readFile(fileLocation)

        const pdfData = await pdfParser(pdfBuffer)


        pdfData.text.split('\n')
            .forEach((line, lineNumber) => {
                console.log(lineNumber, line)
            })

        return [{ line: 1, page: 2, text: "testing" }]
    }
    catch (e) {
        return new Error("Some error occured while chunking the file " + fileLocation + "And the error is\n " + e)
    }
}
