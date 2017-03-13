const express = require('express')
const router = express.Router()

const User = require('../models/user')

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

router.post('/', (req, res) => {
    const user = req.body
    User.createUser(user, (err, data) => {
        if (err) return res.status(400).send(err)
        return res.send(data)
    })
})



module.exports = router
