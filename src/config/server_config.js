const express = require("express")
const cors = require("cors")
const connection = require("./db_connection")
const UserRouter = require("../routes/UserRoute")

connection.authenticate()
.catch(err => console.log(err))

module.exports = () => {
    const app = express()
    app.use(express.json())
    app.use(UserRouter)
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    return app
}