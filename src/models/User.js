const Sequelize = require("sequelize")
const db_connection = require("../config/db_connection")

const User = db_connection.define("users", {
    name: {
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isVerified:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
})

User.sync({force:false})

module.exports = User