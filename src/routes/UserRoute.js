const { createUser, sendMail } = require('../handlers/UserHandler')

const router = require('express').Router()

router.post("/api/v1/users", async (req, res) => {
    try {
        let result = await createUser(req.body)
        if(result.status === "created"){
            res.status(201).send(result.data)
        }
    } catch (error) {
        res.status(500)
    }
})

router.post("/api/v1/send-mail", async (req, res) => {
    try {
        let message = await sendMail(req.body.to)
        console.log(message)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router