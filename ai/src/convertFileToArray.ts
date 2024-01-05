import { TprocessedFile } from ".";
import fs from "fs/promises"
import pdfParser from 'fork-pdf-parse-with-pagepertext'

export const convertFileToArray = async (
    { chunkFormat, fileLocation }
        : { chunkFormat: "page" | "line", fileLocation: string }
): Promise<TprocessedFile[] | Error> => {
    try {
        const pdfBuffer = await fs.readFile(fileLocation)
        const pdfData = await pdfParser(pdfBuffer)

        const chunkedFile: TprocessedFile[] = [];
        pdfData.textPerPage.map((page:
            { page: number, text: string }) => {
            page.text.split("\n").map((lineData, lineNumber) => {
                chunkedFile.push({
                    line: lineNumber,
                    text: lineData,
                    pageNumber: page.page,
                    pageData: page.text.split("\n").join(" ")
                })
            })
        })

        return chunkedFile
    }
    catch (e) {
        return new Error("Some error occured while chunking the file " + fileLocation + "And the error is\n " + e)
    }
}
