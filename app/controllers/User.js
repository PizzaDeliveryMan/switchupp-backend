const google = require('googleapis')
const express = require('express')
const router = express.Router()

const User = require('../models/user')

const OAuth2 = google.auth.OAuth2;
const OAuth2Client = new OAuth2(
    "786899167756-knis85q2jar9f8lekhedlfcm7epge6hg.apps.googleusercontent.com",
    "nBE9gT2vZpyyGSAIH3YgVm0D",
    "http://localhost:3001/user/auth/"
)

google.options({auth: OAuth2Client});

/**
GET /user - gets a user
POST /user - creates a user
*/
/*
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    User.findUserById(userId, (err, user) => {
        if (!user) return res.status(400).send("There's no user here.")
        return res.send(user)
    })
})*/

router.get('/auth', (req, res) => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
    const url = OAuth2Client.generateAuthUrl ({
        access_type: 'offline',
        scope: scopes
    })

    const code = req.query.code;
    if (!code) return res.status(400).send("Theres no user here xddxdxdx");
    OAuth2Client.getToken(code, (err, tokens) => {
        if (err) return  res.status(400);
        OAuth2Client.setCredentials(tokens);
        google.oauth2('v2').userinfo.v2.me.get({auth: OAuth2Client}, (err, profile) => {
            return res.status(200)
        })
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

router.put('/:user', (req, res) => {
    
})



/*router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = User.findUserById(userId, callback);
    User.deleteUser(userId, (err, user) => {
        if (err) return res.status(400).send(err)
        return res.send(user)
    })
})*/



module.exports = router
