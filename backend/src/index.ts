import express, { Express, Request, Response } from "express";


const app: Express = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The server is up and running at port ${PORT}`)
})

console.log("It has restarted")
