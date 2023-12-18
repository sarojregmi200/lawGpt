import express, { Express } from "express";


const app: Express = express()
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`The server is up and running at port ${PORT}`)
})

console.log("It has restarted")
