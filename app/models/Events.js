const mongoose = require('mongoose');
const UserSchema = require('User');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {type: String, required: true },
    username: (type: UserSchema.username, required: true),
    minimumExists: (type: Boolean, required: true),
    minimumCap: (type: Number, required: true),
    rsvpStrict: (type: Boolean, required: true)
});

const EventModel = mongoose.model('Event', UserSchema);

EventSchema.index({ username: 1 }, { unique: false });

EventModel.findEventById = (eventId, callback) => {
    EventModel.findById(eventId, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

EventModel.createEvent = (eventData, callback) => {
    const cewEvent = new EventModel(eventData)
    newEvent.save((err, data) => {
        if(err) return callback(err)
        return callback(null, data)
    })
}

EventModel.deleteEvent = (eventId, callback) => {
    const eventToDelete = EventModel.find( {eventId}).remove((err, data) => {
        if (err) return callback(err)
        return callback(null, null)
    });
}
