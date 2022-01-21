require("dotenv").config()
const app = require("./src/config/server_config")()

app.listen(process.env.PORT)