import * as fileEntries from "./data/fileEntries.json"

type TfileEntries = {
    fileName: string,
    country: string,
    filePath: string
}[]

try {
    let referenceFile: TfileEntries = fileEntries;
    console.log(referenceFile[0])

} catch (error) {
    console.error("unexpected error occured", error)
}
