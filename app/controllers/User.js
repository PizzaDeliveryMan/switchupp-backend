
const express = require('express')
const router = express.Router()

const User = require('../models/User')

/**
GET /user - gets a user
POST /user - creates a user
*/

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    User.findUserById(userId, (err, user) => {
        if (!user) return res.status(400).send("There's no user here.")
        return res.send(user)
    })
})

router.get('/user/:userEmail', (req, res) => {
    console.log("test")
    const userEmail = req.params.userEmail;
    User.findUser(userEmail, (err, user) => {
        if (!user) return res.status(400).send("There's no user here.")
        return res.send(user)
    })
})

//post should create with upsert
//put should update

router.post('/', (req, res) => {
    const user = req.body
    User.createUser(user, (err, data) => {
        if (err) return res.status(400).send(err)
        return res.send(data)
    })
})



module.exports = router
