require("dotenv").config()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const mailman = require("../service/mailman")

function createMailCode() {
    let string = ""
    for(let i = 0; i < 6; i++){
        let number = Math.round(Math.random()*9)
        string+=number
    }
    return string
}

module.exports.createUser = async(payload) => {
    try {
        const user = await User.create(payload)
        if(user !== undefined){
           
            let token = jwt.sign({email:payload.email}, process.env.JWT_SECRET, {expiresIn:"2h"})
            return {
                status:"created",
                data:{
                    token,
                    user_id:user.id
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            status:"error",
        }
    }
}

module.exports.sendMail = async (to) => {
    try {
        let code = createMailCode()
        let message = await mailman.sendMail({
            from:`alexosmar bonetti <${process.env.MAIL_USER}>`,
            to:to,
            subject:"Código de verificação",
            html:`
                <h2>Seu código de verificação</h2>
                <p>Seu código de verificação foi gerado e é ${code}. Use esse código para confirmar sua conta e acessar o nosso site</p>
            `
        })
        if(message.accepted.length > 0){
            return {
                status:"mail sended",
                data: {
                    mail_code:code
                }
            }
        }else {
            return {
                status:"error"
            }
        }
    } catch (error) {
        console.log(error)
        return {
            status:"error",
        }
    }
}

module.exports.refreshToken = async(token) => {

}