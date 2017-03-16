const express = require('express')
const router = express.Router()

const Event = require('./models/events');


router.get('/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    Event.findEventById(eventId, (err, _event) => {
        if (!_event) return res.status(400).send("There's no user here.");
        return res.send(_event);
    })
})
